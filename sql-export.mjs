import {clean,LANGS,same} from './core.mjs';
const quote=v=>{const s=String(v??'');if(s.includes('\0'))throw new Error('Texto contém caractere nulo.');return "E'"+s.replaceAll("\\","\\\\").replaceAll("'","''")+"'";};
const triple=r=>r.approval?r.current:r.analysis?.suggested;
export function sqlPlan(records,kind,{includeContext=false}={}){
 if(!['process','form'].includes(kind))throw new Error('SQL disponível somente para processos e formulários.');
 const groups=new Map(),skipped=[];
 for(const r of records.filter(x=>x.kind===kind)){const values=triple(r);if([values,r.source].filter(Boolean).some(t=>LANGS.some(l=>String(t[l]??'').includes('\0'))))throw new Error('Texto contém caractere nulo.');let reason='';if(!r.id)reason='ID ausente';else if(kind==='process'&&!/^\d+$/.test(r.cd))reason='CD Processo inválido';else if(!values||!LANGS.every(l=>clean(values[l])))reason='Sugestão incompleta';else if(r.analysis?.needsContext&&!r.approval?.contextConfirmed&&!includeContext)reason='Contexto ainda não confirmado';if(reason){skipped.push({id:r.id,line:r.line,reason});continue;}const id=kind==='process'?r.cd:r.id,g=groups.get(id)||[];g.push({r,values});groups.set(id,g);}
 const entries=[];for(const [key,group]of groups){const values=group[0].values;if(group.some(x=>!same(x.values,values))){skipped.push({id:key,reason:'Sugestões conflitantes para o mesmo destino'});continue;}entries.push({id:group[0].r.id,cd:group[0].r.cd,names:values,expected:[...new Map(group.flatMap(x=>[x.r.source,...(x.r.variants??[])]).map(s=>[JSON.stringify(s),s])).values()]});}
 return {kind,entries,skipped,sourceRows:records.filter(r=>r.kind===kind).length};
}
const commonChecks=`
-- Não criar IDs de tradução por MAX()+1. O banco deve fornecer os demais valores obrigatórios.
-- Campos adicionais NOT NULL sem default fazem o bloco abortar antes de qualquer alteração.
CREATE TEMP TABLE _lf_input(payload jsonb) ON COMMIT DROP;
`;
const guardTranslation=(table,key,name)=>`
      SELECT count(*) INTO n FROM ${table} WHERE ${key}=target_key AND FGLANGUAGE=lang;
      IF n>1 THEN RAISE EXCEPTION 'Traduções duplicadas em ${table}: %, idioma %', target_key,lang; END IF;
      IF n=1 AND NOT EXISTS(SELECT 1 FROM ${table} t WHERE t.${key}=target_key AND t.FGLANGUAGE=lang AND (coalesce(t.${name},'')=desired OR EXISTS(SELECT 1 FROM jsonb_array_elements(x->'expected') e WHERE coalesce(t.${name},'')=coalesce(e->>CASE WHEN lang=2 THEN 'pt' ELSE 'es' END,'')))) THEN
        RAISE EXCEPTION 'Tradução alterada desde a exportação: %, idioma %',target_key,lang;
      END IF;
      UPDATE ${table} SET ${name}=desired WHERE ${key}=target_key AND FGLANGUAGE=lang;
      IF n=0 THEN INSERT INTO ${table}(${key},FGLANGUAGE,${name}) VALUES(target_key,lang,desired); END IF;`;
export function generateSQL(records,kind,options={}){
 const plan=sqlPlan(records,kind,options);const label=kind==='process'?'processos':'formularios';
 const translations=kind==='process'?{table:'pmprocesslanguage',key:'cdprocess',name:'nmprocess',cols:['cdprocess','cdrevision','fglanguage','nmprocess']}:{table:'gntranslationlanguage',key:'cdtranslation',name:'nmtranslation',cols:['cdtranslation','fglanguage','nmtranslation']};
 const missing=kind==='process'?`EXISTS(SELECT 1 FROM _lf_input i JOIN PMACTREVISION p ON p.CDACTIVITY=(i.payload->>'cd')::numeric AND p.FGCURRENT=1 CROSS JOIN generate_series(2,3) l(lang) WHERE NOT EXISTS(SELECT 1 FROM PMPROCESSLANGUAGE t WHERE t.CDPROCESS=p.CDACTIVITY AND t.CDREVISION=p.CDREVISION AND t.FGLANGUAGE=l.lang))`:`EXISTS(SELECT 1 FROM _lf_input i JOIN EFREVISIONFORM f ON f.IDFORM=i.payload->>'id' AND f.FGCURRENT=1 CROSS JOIN generate_series(2,3) l(lang) WHERE NOT EXISTS(SELECT 1 FROM GNTRANSLATIONLANGUAGE t WHERE t.CDTRANSLATION=f.CDTRANSLATION AND t.FGLANGUAGE=l.lang))`;
 const preflight=`
LOCK TABLE ${kind==='process'?'PMACTIVITY, PMACTREVISION, PMPROCESSLANGUAGE':'EFREVISIONFORM, GNTRANSLATION, GNTRANSLATIONLANGUAGE'} IN SHARE ROW EXCLUSIVE MODE;
DO $lf_check$
DECLARE extra text;
BEGIN
  SELECT string_agg(a.attname,', ') INTO extra FROM pg_attribute a
  JOIN pg_class c ON c.oid=a.attrelid
  WHERE a.attrelid='${translations.table}'::regclass AND a.attnum>0 AND NOT a.attisdropped AND a.attnotnull
  AND a.attidentity='' AND a.attgenerated='' AND NOT a.atthasdef
  AND NOT (a.attname=ANY(ARRAY[${translations.cols.map(quote).join(',')}]));
  IF extra IS NOT NULL AND ${missing} THEN RAISE EXCEPTION 'Inserção de idiomas exige mapeamento de colunas obrigatórias de ${translations.table}: %. Nenhuma alteração aplicada.',extra; END IF;
END $lf_check$;
`;
 let body;
 if(kind==='process')body=`
DO $lf_update$
DECLARE x jsonb; lang integer; n integer; rev pmactrevision.cdrevision%TYPE; target_key pmactivity.cdactivity%TYPE; desired text;
BEGIN
 FOR x IN SELECT payload FROM _lf_input LOOP
  target_key=(x->>'cd')::numeric;
  SELECT count(*) INTO n FROM PMACTIVITY a JOIN PMACTREVISION p ON p.CDACTIVITY=a.CDACTIVITY AND p.FGCURRENT=1 WHERE a.CDACTIVITY=target_key AND a.IDACTIVITY=x->>'id';
  IF n<>1 THEN RAISE EXCEPTION 'Processo/revisão atual não é único: %',x->>'id'; END IF;
  PERFORM 1 FROM PMACTIVITY WHERE CDACTIVITY=target_key FOR UPDATE;
  SELECT CDREVISION INTO STRICT rev FROM PMACTREVISION WHERE CDACTIVITY=target_key AND FGCURRENT=1 FOR UPDATE;
  IF NOT EXISTS(SELECT 1 FROM PMACTIVITY a WHERE a.CDACTIVITY=target_key AND (coalesce(a.NMACTIVITY,'')=x->'names'->>'original' OR EXISTS(SELECT 1 FROM jsonb_array_elements(x->'expected') e WHERE coalesce(a.NMACTIVITY,'')=coalesce(e->>'original','')))) THEN RAISE EXCEPTION 'Nome original alterado desde a exportação: %',x->>'id'; END IF;
  UPDATE PMACTIVITY SET NMACTIVITY=x->'names'->>'original' WHERE CDACTIVITY=target_key;
  FOR lang IN 2..3 LOOP
   desired=x->'names'->>CASE WHEN lang=2 THEN 'pt' ELSE 'es' END;
   SELECT count(*) INTO n FROM PMPROCESSLANGUAGE WHERE CDPROCESS=target_key AND CDREVISION=rev AND FGLANGUAGE=lang;
   IF n>1 THEN RAISE EXCEPTION 'Traduções duplicadas do processo %',x->>'id'; END IF;
   IF n=1 AND NOT EXISTS(SELECT 1 FROM PMPROCESSLANGUAGE t WHERE t.CDPROCESS=target_key AND t.CDREVISION=rev AND t.FGLANGUAGE=lang AND (coalesce(t.NMPROCESS,'')=desired OR EXISTS(SELECT 1 FROM jsonb_array_elements(x->'expected') e WHERE coalesce(t.NMPROCESS,'')=coalesce(e->>CASE WHEN lang=2 THEN 'pt' ELSE 'es' END,'')))) THEN RAISE EXCEPTION 'Tradução alterada desde a exportação: %',x->>'id'; END IF;
   UPDATE PMPROCESSLANGUAGE SET NMPROCESS=desired WHERE CDPROCESS=target_key AND CDREVISION=rev AND FGLANGUAGE=lang;
   IF n=0 THEN INSERT INTO PMPROCESSLANGUAGE(CDPROCESS,CDREVISION,FGLANGUAGE,NMPROCESS) VALUES(target_key,rev,lang,desired); END IF;
  END LOOP;
 END LOOP;
END $lf_update$;
`;
 else body=`
DO $lf_update$
DECLARE x jsonb; lang integer; n integer; target_key efrevisionform.cdtranslation%TYPE; desired text;
BEGIN
 -- Um CDTRANSLATION compartilhado por formulários diferentes exige conciliação explícita.
 IF EXISTS(SELECT 1 FROM EFREVISIONFORM f JOIN EFREVISIONFORM g ON g.CDTRANSLATION=f.CDTRANSLATION AND g.OID<>f.OID WHERE f.FGCURRENT=1 AND EXISTS(SELECT 1 FROM _lf_input i WHERE i.payload->>'id'=f.IDFORM)) THEN RAISE EXCEPTION 'CDTRANSLATION compartilhado por formulários ou revisões diferentes; conciliar antes da atualização.'; END IF;
 FOR x IN SELECT payload FROM _lf_input LOOP
  SELECT count(*) INTO n FROM EFREVISIONFORM WHERE IDFORM=x->>'id' AND FGCURRENT=1;
  IF n<>1 THEN RAISE EXCEPTION 'Formulário/revisão atual não é único: %',x->>'id'; END IF;
  SELECT CDTRANSLATION INTO STRICT target_key FROM EFREVISIONFORM WHERE IDFORM=x->>'id' AND FGCURRENT=1 FOR UPDATE;
  IF target_key IS NULL OR NOT EXISTS(SELECT 1 FROM GNTRANSLATION WHERE CDTRANSLATION=target_key) THEN RAISE EXCEPTION 'CDTRANSLATION ausente/inválido no formulário %',x->>'id'; END IF;
  IF NOT EXISTS(SELECT 1 FROM EFREVISIONFORM f WHERE f.IDFORM=x->>'id' AND f.FGCURRENT=1 AND (coalesce(f.NMFORM,'')=x->'names'->>'original' OR EXISTS(SELECT 1 FROM jsonb_array_elements(x->'expected') e WHERE coalesce(f.NMFORM,'')=coalesce(e->>'original','')))) THEN RAISE EXCEPTION 'Nome do formulário alterado desde a exportação: %',x->>'id'; END IF;
  UPDATE EFREVISIONFORM SET NMFORM=x->'names'->>'original' WHERE IDFORM=x->>'id' AND FGCURRENT=1;
  FOR lang IN 2..3 LOOP
   desired=x->'names'->>CASE WHEN lang=2 THEN 'pt' ELSE 'es' END;
${guardTranslation('GNTRANSLATIONLANGUAGE','CDTRANSLATION','NMTRANSLATION')}
  END LOOP;
 END LOOP;
END $lf_update$;
`;
 const excluded=plan.skipped.map(x=>'-- Excluído: '+JSON.stringify(x).replace(/[\r\n]/g,' ')).join('\n');
 const sql=`-- LexiFlow | Atualização de ${label} | PostgreSQL\n-- Destinos únicos: ${plan.entries.length}; linhas na seleção: ${plan.sourceRows}; exclusões: ${plan.skipped.length}.\n-- EN = nome original; PT = FGLANGUAGE 2; ES = FGLANGUAGE 3.\n-- Baseado nas tabelas da consulta fornecida. Validar em homologação com o DBA.\n-- A consulta não informa todas as colunas obrigatórias/PKs. A checagem abaixo bloqueia inserções incompatíveis.\n-- Atualiza somente nomes e traduções na revisão atual. Não altera IDs, vínculos, campos, permissões ou revisões históricas.\n${excluded}\nBEGIN;\nSET LOCAL standard_conforming_strings=on;\nSET LOCAL lock_timeout='5s';\nSET LOCAL statement_timeout='120s';\n${commonChecks}\nINSERT INTO _lf_input SELECT value FROM jsonb_array_elements(${quote(JSON.stringify(plan.entries))}::jsonb);\n${preflight}${body}\n-- Conferência do plano aplicado dentro desta transação:\nSELECT payload->>'id' AS id, payload->'names' AS nomes_sugeridos FROM _lf_input;\nCOMMIT;\n`;
 return {...plan,sql};
}

export const LANGS = ['original','pt','es'];
export const KINDS = { process:'Processos', form:'Formulários', field:'Campos' };
export const REAL_FIELD_HEADERS=['idprocess','nmprocess_es','nmprocess_pt','nmprocess','idform','nmform','nmform_pt','nmform_es','id_elemento','tipo_elemento','titulo_original','nm_es','nm_pt','titulo_original_lg','nm_pt_lg','nm_es_lg','cdprocess','fgtype'];
export const STATUS = { pending:'Não analisado', adjust:'Precisa de ajuste', context:'Revisar contexto', ok:'Correto' };
export const clean = v => String(v ?? '').normalize('NFC').trim();
export const fold = v => clean(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export const same = (a,b) => LANGS.every(k => (a?.[k] ?? '') === (b?.[k] ?? ''));
export const splitIds = v => [...new Set(clean(v).split(/[;|\n]/).map(clean).filter(Boolean))];
const textColumns=['original','pt','es','listOriginal','listPt','listEs'];
export function detectTextLimit(rows,map){let max=0;for(const row of rows)for(const key of textColumns)if(map[key]!==''&&map[key]!==undefined)max=Math.max(max,Array.from(String(row[Number(map[key])]??'')).length);return [30,150].includes(max)?max:null;}
export function possibleTextCut(r){const limit=r.sourceTextLimit;if(r.kind!=='field'||!limit)return null;return [...Object.values(r.source??r.current??{}),...Object.values(r.sourceList??r.list??{})].some(v=>Array.from(String(v??'')).length===limit)?limit:null;}
export function fieldTextAudit(records){const fields=records.filter(r=>r.kind==='field'),out={maxOriginal:0,originalOver30:0,originalAt150:0,anyAt150:0,possibleCuts:0};for(const r of fields){const len=Array.from(r.source?.original??r.current?.original??'').length;out.maxOriginal=Math.max(out.maxOriginal,len);out.originalOver30+=len>30?1:0;out.originalAt150+=len===150?1:0;out.anyAt150+=[...Object.values(r.source??r.current??{}),...Object.values(r.sourceList??r.list??{})].some(v=>Array.from(String(v??'')).length===150)?1:0;out.possibleCuts+=possibleTextCut(r)?1:0;}return out;}
export function hash(v) { let h=2166136261; for(const c of String(v)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);} return (h>>>0).toString(36); }
export const snapshot = r => JSON.stringify([r.current,r.list,r.processIds,r.formIds,r.type]);
const indexes=new WeakMap();
export function buildIndex(records) {
 const idx={byKey:new Map(),byKind:{process:[],form:[],field:[]},processes:new Map(),forms:new Map(),formsByProcess:new Map(),formPairs:new Set(),fieldsByProcess:new Map(),conflictKeys:new Set(),conflictFormIds:new Set(),repeatedKeys:new Set(),missingIds:0,orphanKeys:new Set(),limitedTitleKeys:new Set()};
 const groups=new Map();
 for(const r of records){idx.byKey.set(r.key,r);idx.byKind[r.kind].push(r);if(!r.id)idx.missingIds++;if(r.kind==='process')idx.processes.set(r.id,r);if(r.kind==='form'){const a=idx.forms.get(r.id)||[];a.push(r);idx.forms.set(r.id,a);for(const p of r.processIds){idx.formPairs.add(JSON.stringify([p,r.id]));const a=idx.formsByProcess.get(p)||[];a.push(r);idx.formsByProcess.set(p,a);}}
  if(possibleTextCut(r))idx.limitedTitleKeys.add(r.key);
  if(r.kind==='form'||(r.kind==='field'&&r.id)){const identity=r.kind==='form'?JSON.stringify(['form',r.id]):JSON.stringify(['field',r.processIds,r.formIds,r.id,r.type,r.sourceList?.original??r.list?.original]);const a=groups.get(identity)||[];a.push(r);groups.set(identity,a);}
 }
 for(const group of groups.values()){if(group.length<2)continue;for(const r of group)idx.repeatedKeys.add(r.key);const variants=new Set(group.map(r=>JSON.stringify([r.current,r.list])));if(variants.size>1){for(const r of group){idx.conflictKeys.add(r.key);if(r.kind==='form')idx.conflictFormIds.add(r.id);}}}
 for(const r of idx.byKind.form)if(r.variants?.length>1){idx.conflictKeys.add(r.key);idx.conflictFormIds.add(r.id);}
 for(const r of idx.byKind.form)if(!r.processIds.length||r.processIds.some(p=>!idx.processes.has(p)))idx.orphanKeys.add(r.key);
 for(const r of idx.byKind.field){const pids=r.processIds.length?r.processIds:[...new Set(r.formIds.flatMap(f=>(idx.forms.get(f)||[]).flatMap(x=>x.processIds)))];for(const p of pids){const a=idx.fieldsByProcess.get(p)||[];a.push(r);idx.fieldsByProcess.set(p,a);}if(!r.formIds.length||!pids.length||pids.some(p=>!idx.processes.has(p))||r.formIds.some(f=>!idx.forms.has(f))||r.processIds.some(p=>!r.formIds.some(f=>idx.formPairs.has(JSON.stringify([p,f])))))idx.orphanKeys.add(r.key);}
 indexes.set(records,idx);return idx;
}
export const indexFor=records=>indexes.get(records)??buildIndex(records);
const indexFrom=value=>Array.isArray(value)?indexFor(value):value;
export function translationGaps(r){return LANGS.some(k=>!clean(r.current[k]))||(LANGS.some(k=>clean(r.list[k]))&&LANGS.some(k=>!clean(r.list[k])));}
export function issues(r, records) {
  const out=[];
  if(!r.id) out.push('Identificador ausente na planilha; a linha foi preservada.');
  for(const k of LANGS) if(!clean(r.current[k])) out.push(`${k==='original'?'Nome original (EN)':k==='pt'?'Nome PT':'Nome ES'} não preenchido.`);
  if(r.kind==='form' && !r.processIds.length) out.push('Formulário sem vínculo com processo.');
  if(r.kind==='field' && !r.formIds.length) out.push('Campo sem vínculo com formulário.');
  if(LANGS.some(k=>clean(r.list[k])) && LANGS.some(k=>!clean(r.list[k])))out.push('Há traduções ausentes nos termos da lista/grid.');
  const idx=records?indexFrom(records):null;
  if(idx?.conflictKeys.has(r.key)||(!idx&&r.duplicate))out.push('Há versões divergentes para o mesmo identificador. Confira as traduções e o contexto.');
  if(records){
    if(r.kind!=='process' && r.processIds.some(id=>!idx.processes.has(id)))out.push('Há vínculo com processo que ainda não foi importado.');
    if(r.kind==='field' && r.formIds.some(id=>!idx.forms.has(id)))out.push('Há vínculo com formulário que ainda não foi importado.');
    if(r.kind==='field'&&r.processIds.some(p=>!r.formIds.some(f=>idx.formPairs.has(JSON.stringify([p,f])))))out.push('O par processo/formulário do campo não consta na base de formulários.');
    if(idx.limitedTitleKeys.has(r.key))out.push(`Texto com ${possibleTextCut(r)} caracteres, no limite observado nesta exportação: confira se foi truncado na origem.`);
  }
  return out;
}
export function status(r, records) {
  const idx=records?indexFrom(records):null;
  if(idx?.conflictKeys.has(r.key)&&!r.approval?.contextConfirmed)return 'context';
  if(!r.analysis) return translationGaps(r)?'adjust':'pending';
  if(r.rejected) return 'adjust';
  if(LANGS.some(k=>!clean(r.analysis.suggested?.[k])))return 'context';
  if(r.duplicate&&!idx)return 'context';
  if(r.analysis.needsContext && !r.approval?.contextConfirmed) return 'context';
  if(!same(r.current,r.analysis.suggested)) return 'adjust';
  if(LANGS.some(k=>clean(r.list[k])) && (!r.analysis.listSuggested || !same(r.list,r.analysis.listSuggested)))return 'adjust';
  if(LANGS.some(k=>!clean(r.current[k])))return 'adjust';
  return 'ok';
}
export function inProcess(r,id,records) {
  if(!id) return true;
  if(r.kind==='process') return r.id===id;
  if(r.processIds.length) return r.processIds.includes(id);
  if(r.kind==='field')return records.some(f=>f.kind==='form'&&r.formIds.includes(f.id)&&f.processIds.includes(id));
  return false;
}
export function filtered(records, {kind='process',process='',form='',q='',state='all',problem='all',elementType=''}={}) {
  const term=fold(q);
  const idx=indexFor(records);
  const candidates=process?(kind==='process'?(idx.processes.has(process)?[idx.processes.get(process)]:[]):kind==='form'?(idx.formsByProcess.get(process)||[]):(idx.fieldsByProcess.get(process)||[])):idx.byKind[kind];
  return candidates.filter(r=>{
    if(form && !(r.kind==='form'?r.id===form:r.formIds.includes(form)))return false;
    if(term&&!fold([r.id,r.cd,r.type,...Object.values(r.current),...Object.values(r.list),...Object.values(r.analysis?.suggested??{})].join(' ')).includes(term))return false;
    if(elementType&&r.type!==elementType)return false;
    if(state!=='all'&&status(r,idx)!==state)return false;
    if(problem==='missing'&&!translationGaps(r))return false;
    if(problem==='missing-id'&&r.id)return false;
    if(problem==='conflicts'&&!idx.conflictKeys.has(r.key))return false;
    if(problem==='list'&&!LANGS.some(k=>clean(r.list[k])))return false;
    if(problem==='limited'&&!idx.limitedTitleKeys.has(r.key))return false;
    if(problem==='english'&&(!['PT','ES'].includes(r.analysis?.originalLanguage)||r.current.original!==r.analysis.snapshot?.original))return false;
    if(problem==='approved'&&!r.approval)return false;
    return true;
  });
}
export function totals(records, index) {const out={total:records.length,pending:0,adjust:0,context:0,ok:0,approved:0,ptMissing:0,esMissing:0,originalMissing:0,missingIds:0,listRows:0,listGaps:0,unanalyzed:0}; for(const r of records){out[status(r,index)]++;out.approved+=r.approval?1:0;out.ptMissing+=!clean(r.current.pt)?1:0;out.esMissing+=!clean(r.current.es)?1:0;out.originalMissing+=!clean(r.current.original)?1:0;out.missingIds+=!r.id?1:0;out.unanalyzed+=!r.analysis||!!r.analysis.method?1:0;const hasList=LANGS.some(k=>clean(r.list[k]));out.listRows+=hasList?1:0;out.listGaps+=hasList&&LANGS.some(k=>!clean(r.list[k]))?1:0;} return out;}
export function approve(r, suggested, listSuggested, {contextConfirmed=false,note=''}={}) {
  if(!suggested || LANGS.some(k=>!clean(suggested[k])))throw new Error('Preencha os três nomes antes de aprovar.');
  if(r.analysis?.needsContext && !contextConfirmed)throw new Error('Confirme o contexto antes de aprovar esta sugestão.');
  if(r.analysis?.needsContext && !clean(note))throw new Error('Registre uma observação para confirmar o contexto.');
  if(LANGS.some(k=>clean(r.list[k])) && (!listSuggested||LANGS.some(k=>!clean(listSuggested[k]))))throw new Error('Revise também os três termos da lista/grid.');
  const before=structuredClone({current:r.current,list:r.list,approval:r.approval,analysis:r.analysis,rejected:r.rejected??false});
  r.current=Object.fromEntries(LANGS.map(k=>[k,clean(suggested[k])]));
  if(listSuggested)r.list=Object.fromEntries(LANGS.map(k=>[k,clean(listSuggested[k])]));
  if(!r.analysis)r.analysis={reason:'Nomes informados pelo revisor.',needsContext:false,provenance:'Revisão manual'};
  r.analysis.suggested=structuredClone(r.current);r.analysis.listSuggested=structuredClone(listSuggested??null);
  r.approval={at:new Date().toISOString(),contextConfirmed,note:clean(note)};r.rejected=false;r.revision++;
  return {key:crypto.randomUUID(),recordKey:r.key,id:r.id,kind:r.kind,action:'Aprovação',before,after:structuredClone({current:r.current,list:r.list}),at:r.approval.at,note:clean(note)};
}
const aliases={
  id:{process:['id processo','id','cd processo','codigo'],form:['id formulario','id form','id','cd formulario'],field:['id elemento','id campo','id','cd campo','id_elemento']},
  cd:['cd processo','cd formulario','cd elemento','codigo','cdprocess'],
  original:['nome original','nm original','termo original','texto ingles','nome en','nome ingles','name','nome','titulo_original'],
  pt:['nome pt','nm pt','termo pt','texto portugues','nome portugues','pt','nm_pt'],
  es:['nome es','nm es','termo es','texto espanhol','nome espanhol','es','nm_es'],
  process:['id processo','process id','processo','cd processo','idprocess'],form:['id formulario','form id','formulario','cd formulario','idform'],type:['elemento','tipo elemento','tipo de elemento','tipo','tipo_elemento'],
  listOriginal:['termo original (lista/grid)','nome original (lista/grid)','termo original lista/grid','titulo_original_lg'],listPt:['termo pt (lista/grid)','nome pt (lista/grid)','termo pt lista/grid','nm_pt_lg'],listEs:['termo es (lista/grid)','nome es (lista/grid)','termo es lista/grid','nm_es_lg']
};
export function mappingFor(headers,kind) {const h=headers.map(fold),out={}; for(const [k,values] of Object.entries(aliases)){let found=-1;for(const a of (k==='id'?values[kind]:values)){found=h.indexOf(a);if(found>=0)break;}out[k]=found<0?'':String(found);}return out;}
export function normalizeRows(rows,map,kind,file,sheet,batchId,rowOffset=0,headers=[],options={}) {
  const read=(row,k)=>map[k]===''||map[k]===undefined?'':String(row[Number(map[k])]??'');
  const out=[],keys=new Map(),realSchema=kind==='field'&&JSON.stringify(headers)===JSON.stringify(REAL_FIELD_HEADERS),sourceTextLimit=kind==='field'?(Object.hasOwn(options,'textLimit')?options.textLimit:detectTextLimit(rows,map)):null;
  rows.forEach((row,i)=>{if(!row.some(v=>clean(v)))return;
    const current={original:read(row,'original'),pt:read(row,'pt'),es:read(row,'es')},list={original:read(row,'listOriginal'),pt:read(row,'listPt'),es:read(row,'listEs')};
    const id=clean(read(row,'id')),processIds=kind==='process'?[id].filter(Boolean):splitIds(read(row,'process')),formIds=kind==='field'?splitIds(read(row,'form')):[];
    const line=i+2+rowOffset;
    const r={key:`${batchId}-${kind}-${line}`,kind,id,cd:clean(read(row,'cd')),current,source:structuredClone(current),list,sourceList:structuredClone(list),processIds,formIds,type:clean(read(row,'type'))||(kind==='process'?'Processo':kind==='form'?'Formulário':'Campo'),line,file,sheet,revision:0,analysis:null,approval:null};
    if(kind==='field')r.sourceTextLimit=sourceTextLimit;
    if(headers.length){r.raw=[...row];if(realSchema)r.rawSchema='fields-v1';else r.rawHeaders=headers;}
    // Keep every row, including repeated grid identifiers and missing IDs.
    const identity=JSON.stringify([id,processIds,formIds,r.type,list.original]);if(id){const group=keys.get(identity)||[];if(group.length){r.repeated=true;for(const old of group)old.repeated=true;if(group.some(old=>!same(old.current,current)||!same(old.list,list))){r.duplicate=true;for(const old of group)old.duplicate=true;}}group.push(r);keys.set(identity,group);}out.push(r);
  });return kind==='form'?mergeForms(out):out;
}
// Um formulário pode estar em vários processos: mantém uma linha por ID de formulário com todos os processos ligados.
export function mergeForms(records){
  const byId=new Map(),out=[];
  for(const r of records){
    if(r.kind!=='form'||!r.id){out.push(r);continue;}
    const first=byId.get(r.id);
    if(!first){byId.set(r.id,r);out.push(r);continue;}
    for(const p of r.processIds)if(!first.processIds.includes(p))first.processIds.push(p);
    (first.lines??=[first.line]).push(r.line);
    const variants=first.variants??=[structuredClone(first.source)];
    if(!variants.some(v=>same(v,r.source)))variants.push(structuredClone(r.source));
    if(variants.length>1)first.duplicate=true;
    if(!first.analysis&&r.analysis)first.analysis=r.analysis;
  }
  return out;
}
export function exportRows(records,{suggestions=false,sourceLayout=false}={}) {
 return records.map(r=>{
  let out;const headers=r.rawSchema==='fields-v1'?REAL_FIELD_HEADERS:r.rawHeaders;
  if(sourceLayout&&r.raw&&headers){out=Object.fromEntries(headers.map((h,i)=>[h,r.raw[i]??'']));const map=mappingFor(headers,r.kind);for(const k of LANGS)if(map[k]!=='')out[headers[Number(map[k])]]=r.current[k];for(const [key,k] of [['listOriginal','original'],['listPt','pt'],['listEs','es']])if(map[key]!=='')out[headers[Number(map[key])]]=r.list[k];}
  else{out={'ID Processo':r.kind==='process'?r.id:r.processIds.join(';'),'ID Formulário':r.kind==='form'?r.id:r.formIds.join(';'),'ID Elemento':r.kind==='field'?r.id:'','CD':r.cd,'Elemento':r.type,'Nome original':r.current.original,'Nome PT':r.current.pt,'Nome ES':r.current.es};if(r.kind==='field')Object.assign(out,{'Termo original (Lista/Grid)':r.list.original,'Termo PT (Lista/Grid)':r.list.pt,'Termo ES (Lista/Grid)':r.list.es});}
  if(suggestions)Object.assign(out,{'Sugestão EN':r.analysis?.suggested?.original??'','Sugestão PT':r.analysis?.suggested?.pt??'','Sugestão ES':r.analysis?.suggested?.es??'','Sugestão EN (Lista/Grid)':r.analysis?.listSuggested?.original??'','Sugestão PT (Lista/Grid)':r.analysis?.listSuggested?.pt??'','Sugestão ES (Lista/Grid)':r.analysis?.listSuggested?.es??'','Status':STATUS[r.validationStatus??status(r)],'Aprovado':r.approval?'Sim':'Não','Motivo':r.validationReason??r.analysis?.reason??'Sem revisão semântica','Texto importado (original)':r.source.original,'Texto importado (PT)':r.source.pt,'Texto importado (ES)':r.source.es,'Linha de origem':r.line});return out;
 });
}
export function canBulkApprove(r,records) {
 return !!r.analysis&&!r.analysis.needsContext&&!issues(r,records).some(x=>/Identificador|vínculo|divergentes|par processo/.test(x))&&LANGS.every(k=>clean(r.analysis.suggested?.[k]))&&(!LANGS.some(k=>clean(r.list[k]))||LANGS.every(k=>clean(r.analysis.listSuggested?.[k])))&&!r.approval;
}
export function validAnalysis(result,expected) {
  if(!result || !Array.isArray(result.records)||result.records.length!==expected.length)throw new Error('A IA não retornou uma revisão para cada registro.');
  const ids=new Set(expected.map(r=>r.key)),seen=new Set();
  for(const r of result.records){if(!ids.has(r.key)||seen.has(r.key))throw new Error('A resposta da IA contém identificadores inesperados ou repetidos.');seen.add(r.key);if(!r.suggested||LANGS.some(k=>typeof r.suggested[k]!=='string'||!clean(r.suggested[k])))throw new Error('A IA retornou uma tradução incompleta.');if(typeof r.needsContext!=='boolean'||typeof r.reason!=='string')throw new Error('A resposta da IA está incompleta.');const src=expected.find(x=>x.key===r.key);if(LANGS.some(k=>clean(src.list?.[k])) && (!r.listSuggested||LANGS.some(k=>!clean(r.listSuggested[k])))&&!r.needsContext)throw new Error('A IA não revisou todos os termos de lista/grid.');}
  return result.records;
}

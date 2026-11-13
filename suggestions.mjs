import {LANGS,clean,fold,same,possibleTextCut} from './core.mjs';
const technical=/^(?:[A-Z][A-Z0-9_.\/-]{1,24}|(?:id|cd|oid|nm|fg|aux|bt)[A-Z_\s][\w\s-]*|[a-z][a-z0-9]*[A-Z][A-Za-z0-9]*|[a-z]+_[a-z0-9_]+)$/;
const english=/\b(the|of|and|request|select|customer|contract|payment|field|name|amount|date|new|current|total|service|invoice|user|company|email|phone|sales|project|training|description|cancel|supplier|currency|cost|summary|approval|add|order|data|grid|input|table|button|leader|country|birth|business|position|others|environment|role|usage|comments)\b/i;
const spanish=/\b(solicitud|fecha|nombre|correo|datos|importe|proveedor|equipo|capacitación|factura|cancelación|contraseña|costos|cuenta|negocio|plazo)\b/i;
export function makeSuggester(catalog){
 const terms=new Map();for(const row of catalog.terms){const triple=row.slice(0,3);for(const text of [...triple,...(row[3]?.split('|')||[])]){const key=fold(text);if(!terms.has(key))terms.set(key,[]);terms.get(key).push(triple);}}
 const exact=(text)=>{const hits=terms.get(fold(text))||[];const unique=[...new Map(hits.map(x=>[JSON.stringify(x),x])).values()];return unique.length===1?unique[0]:null;};
 return r=>{
  if(r.analysis&&!r.analysis.method&&same(r.analysis.snapshot,r.current))return r.analysis;
  const current=r.current,src=clean(current.original),explicit=r.kind==='form'?catalog.forms[r.id]:r.kind==='process'?catalog.processes[r.id]:null;
  let triple=explicit||exact(src),method=explicit?'curated':'glossary',reason=explicit?'Sugestão contextual preparada para este registro. Preserva siglas e a finalidade do processo/formulário.':'Sugestão baseada em glossário trilíngue de rótulos.',needsContext=false;
  if(!triple){const refs=catalog.references?.[JSON.stringify([r.formIds,fold(src)])];if(refs?.length===1){triple=refs[0];method='reference';reason='Sugestão reaproveitada de uma linha com o mesmo rótulo no mesmo formulário. Confirmar os idiomas e o sentido antes de aplicar.';needsContext=true;}}
  if(!triple){const prefix=src.match(/^(\d+\s*[-.)]\s*)(.+)$/);const tail=prefix&&exact(prefix[2]);if(tail){triple=tail.map(x=>prefix[1]+x);method='glossary';}}
  if(!triple&&(technical.test(src)||/^(?:id|cd|oid|nm|fg|aux|bt|mf)[a-z0-9_\s-]+$/i.test(src)||/^[_ .-]+$/.test(src))&&!english.test(src)){triple=[src,src,src];method='technical';reason='Identificador técnico preservado nos três idiomas. Confirme se aparece como código ou rótulo de exibição.';needsContext=true;}
  if(!triple){
   method='source';needsContext=true;
   const en=english.test(src)&&!/[ãõç]/i.test(src)?src:'';
   const pt=clean(current.pt)||(!en&&!spanish.test(src)?src:'');
   const es=clean(current.es)&&fold(current.es)!==fold(pt)?clean(current.es):'';
   triple=[en,pt,es];reason='Proposta parcial com os textos disponíveis. Falta tradução contextual confiável para os idiomas em branco; use a revisão manual ou a IA ao vivo. Preenchimento não comprova idioma correto.';
  }
  if(fold(src)==='data'&&r.kind==='field'){needsContext=true;reason+=' Confirmar se Data significa data de calendário ou conjunto de dados.';}
  const boundary=possibleTextCut(r);if(boundary){needsContext=true;reason+=` O texto atinge ${boundary} caracteres, limite observado nesta exportação: confirmar o texto integral antes de aplicar.`;}
  if(r.kind==='form'&&['budget01','budget02','STR','gp002','RFDMAINRESP','RFDORDGRAND','encerrarwf01','frmkanbanauto','frmmagenis','PE020MF'].includes(r.id)){needsContext=true;reason+=' Confirmar a finalidade: existem nomes técnicos ou divergências de ação/significado na origem.';}
  if(r.kind==='process'&&['FRM-0004','FRM-0005'].includes(r.id)){needsContext=true;reason+=' Nome técnico de agente preservado; confirmar se representa uma ação de processo.';}
  const listSuggested=LANGS.some(k=>clean(r.list[k]))?(()=>{const t=exact(r.list.original);if(t)return {original:t[0],pt:t[1],es:t[2]};needsContext=true;return {...r.list};})():null;
  if(listSuggested&&LANGS.some(k=>!clean(listSuggested[k])))reason+=' Termos internos de lista/grid também exigem confirmação; referências de colunas não são traduzidas por aproximação.';
  return {snapshot:{...current},suggested:{original:triple[0],pt:triple[1],es:triple[2]},listSuggested,needsContext,reason,method,technical:method==='technical',originalLanguage:english.test(src)?'EN':spanish.test(src)?'ES':'PT',provenance:explicit?'Sugestão contextual preparada':'Sugestão preliminar · glossário e dados de origem',at:catalog.at,scope:'Rótulo no contexto dos vínculos de processo e formulário. Sem aprovação automática.'};
 };
}

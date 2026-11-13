import {makeSuggester} from './suggestions.mjs';
import {normalizeRows,LANGS,mergeForms} from './core.mjs';
let suggest,manifest,position=0,done=0,origin;
self.onmessage=async event=>{try{const m=event.data;
 if(m.action==='load'){
  const url=new URL(m.url);origin=url.origin;const res=await fetch(url,{cache:'no-cache'});if(!res.ok)throw new Error('Não foi possível abrir a base completa.');manifest=await res.json();manifest.records=mergeForms(manifest.records);const cr=await fetch(new URL('./suggestion-catalog.json',url),{cache:'no-cache'});if(!cr.ok)throw new Error('Não foi possível carregar as sugestões.');suggest=makeSuggester(await cr.json());position=0;done=manifest.records.length;
  self.postMessage({type:'chunk',records:manifest.records,total:manifest.imports.reduce((s,i)=>s+i.count,0),done,manifest:{datasetId:manifest.datasetId,sourceId:manifest.sourceId,imports:manifest.imports,audit:manifest.audit}});
 }else if(m.action==='next'){
  if(position>=manifest.chunks.length){self.postMessage({type:'complete',datasetId:manifest.datasetId,imports:manifest.imports,audit:manifest.audit});return;}
  const chunk=manifest.chunks[position++],url=new URL(chunk.url,m.url);if(url.origin!==origin)throw new Error('Origem de dados não autorizada.');
  const response=await fetch(url,{cache:'no-cache'});if(!response.ok)throw new Error('Não foi possível carregar '+chunk.file);const data=await response.json();
  const records=normalizeRows(data.rows,chunk.map,chunk.kind,chunk.file,chunk.sheet,chunk.sourceId,chunk.offset,chunk.headers,{textLimit:chunk.textLimit??null});
  for(const r of records){r.datasetRef=chunk.sourceId+':'+r.kind+':'+r.line;
   if(r.processIds.includes('CL002')&&r.formIds.includes('dbademandas')){const match=manifest.pilotReviews.find(x=>x[0]===r.source.original);if(match){const [original,en,pt,es,needsContext,reason]=match;r.analysis={snapshot:structuredClone(r.current),suggested:{original:en,pt,es},listSuggested:LANGS.some(k=>r.list[k])?structuredClone(r.list):null,reason,needsContext,technical:['idProcess','FGLANGUAGE','ID WF'].includes(original),originalLanguage:original==='Data'?'EN':['idProcess','FGLANGUAGE','ID WF'].includes(original)?'Técnico':'PT',provenance:'Revisão inicial por IA · piloto CL002',at:'2026-10-07T14:43:00.000Z',scope:'Campo e termos de lista/grid no contexto de CL002 / dbademandas. Sem aprovação automática.'};}}
  }
  for(const r of records)r.analysis=suggest(r);
  done+=records.length;self.postMessage({type:'chunk',records,total:manifest.imports.reduce((s,i)=>s+i.count,0),done});
 }
 }catch(e){self.postMessage({type:'error',message:e.message});}};

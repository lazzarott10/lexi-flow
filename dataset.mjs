import {same} from './core.mjs';
export const isEmbedded=r=>!!r.datasetRef?.startsWith('complete-')||/^(complete-|seed-process-)/.test(r.key);
const identity=r=>JSON.stringify([r.kind,r.id,r.kind==='process'?[]:r.processIds,r.formIds,r.type,...(r.kind==='field'?[r.source,r.sourceList??r.list]:[])]);
export function migrationIndex(existing){const byIdentity=new Map();for(const r of existing.filter(isEmbedded)){const key=identity(r),a=byIdentity.get(key)||[];a.push(r);byIdentity.set(key,a);}return {byKey:new Map(existing.map(r=>[r.key,r])),byRef:new Map(existing.filter(r=>r.datasetRef).map(r=>[r.datasetRef,r])),oldProcesses:new Map(existing.filter(r=>r.kind==='process'&&isEmbedded(r)).map(r=>[r.id,r])),byIdentity,used:new Set()};}
export function mergeIncoming(incoming,index){return incoming.map(r=>{
 const candidates=index.byIdentity.get(identity(r))||[];
 const old=[index.byRef.get(r.datasetRef),index.byKey.get(r.key),r.kind==='process'?index.oldProcesses.get(r.id):null,...candidates.filter(x=>same(x.source,r.source)),...candidates].find(x=>x&&!index.used.has(x.key));if(!old)return r;index.used.add(old.key);
 if(old.id!==r.id||!same(old.source,r.source)||!same(old.sourceList??old.list,r.sourceList??r.list))return {...r,key:old.key};
 const next={...r,key:old.key,revision:old.revision??0,approval:old.approval??null,rejected:old.rejected??false};
 if(old.approval||old.revision||old.rejected){next.current=structuredClone(old.current);next.list=structuredClone(old.list);next.analysis=structuredClone(old.analysis);}
 return next;
});}

import * as XLSX from './vendor/xlsx.mjs';
import {normalizeRows,exportRows,mappingFor} from './core.mjs';
let sheets;
self.onmessage=event=>{const m=event.data;try{
 if(m.action==='read'){
  const wb=XLSX.read(m.buffer,{type:'array',cellDates:false,raw:true});sheets=wb;
  self.postMessage({type:'sheets',sheets:wb.SheetNames});
  preview(wb.SheetNames[0],m.kind);
 } else if(m.action==='preview')preview(m.sheet,m.kind);
 else if(m.action==='normalize'){
  const rows=XLSX.utils.sheet_to_json(sheets.Sheets[m.sheet],{header:1,defval:'',raw:false});
  const records=normalizeRows(rows.slice(1),m.map,m.kind,m.file,m.sheet,m.batchId,0,rows[0].map(String));
  self.postMessage({type:'records',records});
 } else if(m.action==='export'){
  const wb=XLSX.utils.book_new();
  for(const kind of ['process','form','field']){
   const records=m.records.filter(r=>r.kind===kind);if(!records.length)continue;
   const sheet=XLSX.utils.json_to_sheet(exportRows(records,{suggestions:m.suggestions,sourceLayout:m.sourceLayout}));
   sheet['!cols']=Object.keys(exportRows(records.slice(0,1),{suggestions:m.suggestions,sourceLayout:m.sourceLayout})[0]).map(k=>({wch:/Nome|Sugest|Termo|Texto|Motivo|titulo|nm_/.test(k)?45:22}));
   XLSX.utils.book_append_sheet(wb,sheet,{process:'Processos',form:'Formulários',field:'Campos'}[kind]);
  }
  if(!wb.SheetNames.length)throw new Error('Não há registros para exportar.');
  const output=XLSX.write(wb,{bookType:'xlsx',type:'array'});
  self.postMessage({type:'exported',buffer:output},[output]);
 }
 }catch(e){self.postMessage({type:'error',message:e.message});}};
function preview(sheet,kind){const rows=XLSX.utils.sheet_to_json(sheets.Sheets[sheet],{header:1,defval:'',raw:false});const headers=(rows[0]??[]).map(String);self.postMessage({type:'preview',sheet,headers,count:rows.slice(1).filter(r=>r.some(x=>String(x??'').trim())).length,sample:rows.slice(1,4),map:mappingFor(headers,kind)});}

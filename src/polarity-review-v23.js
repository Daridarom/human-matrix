/* Human Matrix 0.23 — attach edited polarity explanations to existing
   384-line reference, without changing historic up/down texts. */
(function applyPolarityReviewV23(){
  'use strict';
  const data=window.HM_POLARITY_EXPLAIN_V23||{};
  const lines=window.HM_LINES||{};
  let revised=0,missingOriginal=0;
  for(const [gate,items] of Object.entries(data)){
    if(!/^(?:[1-9]|[1-5][0-9]|6[0-4])$/.test(gate))throw new Error('Invalid reviewed gate '+gate);
    for(const [line,pair] of Object.entries(items)){
      const item=lines[gate]?.[line];
      if(!item||!Array.isArray(pair)||pair.length!==2)throw new Error('Missing reviewed line '+gate+'.'+line);
      for(const [i,field] of ['up','down'].entries()){
        if(!item[field]){missingOriginal++;if(pair[i])throw new Error('Editorial text exists without source for '+gate+'.'+line+' '+field);continue;}
        const text=pair[i]?.trim();
        if(!text||text.length<55)throw new Error('Short editorial polarity for '+gate+'.'+line+' '+field);
        if(text===item[field])throw new Error('Unedited original polarity '+gate+'.'+line+' '+field);
        item['reader_'+field]=text;
        revised++;
      }
    }
  }
  const total=Object.values(lines).reduce((sum,g)=>sum+Object.values(g).reduce((n,line)=>n+Number(!!line.up)+Number(!!line.down),0),0);
  if(total!==760)throw new Error('Original reference set changed: '+total);
  if(Object.keys(data).length!==16)throw new Error('Expected 16 individually reviewed gates');
  const read=Object.values(lines).reduce((sum,g)=>sum+Object.values(g).reduce((n,line)=>n+Number(!!line.reader_up)+Number(!!line.reader_down),0),0);
  if(read!==revised||read!==192)throw new Error('Coverage conflict: '+read+' vs '+revised);
  window.HM_POLARITY_REVIEW={version:'0.23.0',gates:16,lines:96,revised:read,total,pending:total-read,skipped_missing:missingOriginal};
  renderContent();
})();

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
  if(Object.keys(data).length!==32)throw new Error('Expected 32 individually reviewed gates');
  const read=Object.values(lines).reduce((sum,g)=>sum+Object.values(g).reduce((n,line)=>n+Number(!!line.reader_up)+Number(!!line.reader_down),0),0);
  if(read!==revised||read!==383)throw new Error('Coverage conflict: '+read+' vs '+revised);
  window.HM_POLARITY_REVIEW={version:'0.24.0',gates:32,lines:192,revised:read,total,pending:total-read,skipped_missing:missingOriginal};
  const olderDetail=detailHtml;
  detailHtml=function(h,defaultTitle){
    const html=olderDetail(h,defaultTitle);
    const gate=state.detail?.match(/^gate:(\d+)$/)?.[1];
    if(!gate||!lines[gate])return html;
    const gateLines=Object.values(lines[gate]);
    const count=gateLines.reduce((n,l)=>n+Number(!!l.reader_up)+Number(!!l.reader_down),0);
    const possible=gateLines.reduce((n,l)=>n+Number(!!l.up)+Number(!!l.down),0);
    const intro=`<aside class="hm23-help"><p><strong>Как понимать ▲ и ▽?</strong> Это две стороны одной символической темы в классической традиции, а не «хороший» и «плохой» человек. Знак совпадения планеты — часть правил этой системы, не доказательство поведения.</p><p><strong>Проверено редакцией:</strong> ${count} из ${possible} текстов полярностей этих ворот. ${count===possible?'Сначала показана новая понятная редакция, первоисточник можно раскрыть.':'Непереработанные классические описания обозначены отдельно.'}</p></aside>`;
    return html.replace('<div class="activation-detail-list">',intro+'<div class="activation-detail-list">');
  };

  renderContent();
})();

/* Human Matrix 0.21 — applies the completed 384-line reader-first edition.
   Runs after all five line-text data files, at the end of the reading stack.
   Preserves the earlier interpretation and both classical planetary polarities.
 */
(function applyLineTextsV21(){
  'use strict';
  const entries=window.HM_LINE_EDITORIAL_V21||{};
  const book=window.HM_LINES||{};
  const seen=new Set();
  let changed=0;
  for(let gate=1;gate<=64;gate++){
    const pack=entries[gate];
    if(!pack)throw new Error('Human Matrix v0.21: пропущены ворота '+gate);
    for(let line=1;line<=6;line++){
      const fresh=pack[line],record=book[gate]?.[line];
      if(!record||!Array.isArray(fresh)||fresh.length!==2||
         typeof fresh[0]!=='string'||fresh[0].trim().length<35||
         typeof fresh[1]!=='string'||fresh[1].trim().length<35){
        throw new Error('Human Matrix v0.21: отсутствует полный текст линии '+gate+'.'+line);
      }
      const key=gate+'.'+line;
      if(seen.has(key))throw new Error('Human Matrix v0.21: повтор линии '+key);
      seen.add(key);
      record.pre_v21_plain=record.plain;
      record.plain=fresh[0];
      record.example=fresh[1];
      record.editorial_status='индивидуальная редактура 0.21';
      changed++;
    }
  }
  if(changed!==384)throw new Error('Human Matrix v0.21: ожидается 384 расшифровки, получено '+changed);
  window.HM_LINES_EDITED={version:'0.21.0',gates:64,lines:changed,classic_polarities_preserved:true};
  renderContent();
})();

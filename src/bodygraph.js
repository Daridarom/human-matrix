/* Human Matrix 0.14 — canonical bodygraph geometry.
 * Gates sit on the edge of their center that faces the partner gate, so every
 * channel is a short straight "pipe" between two centers, the way classic
 * Rave charts are drawn. Only two channels need a bend to avoid crossing an
 * unrelated center: 20-34 runs in its own lane left of the G center, and
 * 26-44 passes under the G center. Long channels from Spleen and Solar Plexus
 * run as parallel straight lines instead of large arcs.
 * Each channel half takes the activation of its own gate and stops at the
 * path's true midpoint: a hanging gate never reaches the far center. */
const GRAPH = {
 centers:{
  head:{shape:'220,14 178,90 262,90',color:'#ecd782'},
  ajna:{shape:'178,120 262,120 220,202',color:'#90b6a1'},
  throat:{shape:'180,232 260,232 260,312 180,312',color:'#c9a785'},
  g:{shape:'220,328 250,386 220,444 190,386',color:'#e8d17a'},
  heart:{shape:'306,352 284,414 332,414',color:'#d9898b'},
  sacral:{shape:'180,480 260,480 260,560 180,560',color:'#d9898b'},
  spleen:{shape:'28,438 28,562 128,500',color:'#c5af8f'},
  solarplexus:{shape:'412,438 412,562 312,500',color:'#c5af8f'},
  root:{shape:'180,600 260,600 260,682 180,682',color:'#c5af8f'}
 },
 gates:{
  64:[197,90],61:[220,90],63:[243,90],
  47:[197,120],24:[220,120],4:[243,120],17:[197,154],11:[243,154],43:[220,190],
  62:[197,232],23:[220,232],56:[243,232],16:[180,251],20:[180,276],35:[260,251],12:[260,271],45:[260,293],31:[198,312],8:[220,312],33:[242,312],
  1:[220,334],7:[208,351],13:[232,351],10:[194,386],25:[246,386],15:[208,421],46:[232,421],2:[220,438],
  21:[306,369],51:[292,392],26:[297,414],40:[321,414],
  48:[34,442],57:[55,454],44:[85,473],50:[109,488],32:[106,513],28:[82,528],18:[57,544],
  36:[406,442],22:[385,454],37:[355,473],6:[331,488],49:[334,513],55:[358,528],30:[383,544],
  5:[197,480],14:[220,480],29:[243,480],34:[180,505],27:[180,536],59:[260,526],42:[197,560],3:[220,560],9:[243,560],
  53:[197,600],60:[220,600],52:[243,600],54:[180,624],38:[180,646],58:[180,668],19:[260,624],39:[260,646],41:[260,668]
 }
};
/* Intermediate points for the only two bent channels. */
const CHANNEL_ROUTES = {
 '20-34':[[166,300],[166,482]],
 '26-44':[[240,456]]
};
let graphSequence=0;
function channelPoints(ch){
 const p=GRAPH.gates[ch.gates[0]],q=GRAPH.gates[ch.gates[1]],via=CHANNEL_ROUTES[ch.key]||[];
 const key=ch.key.split('-').map(Number);
 // routes are written from the smaller gate number to the larger one
 const forward=ch.gates[0]===key[0];
 const mids=forward?via:[...via].reverse();
 return [p,...mids,q];
}
function splitAtMiddle(pts){
 const seg=[];let total=0;
 for(let i=1;i<pts.length;i++){const l=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);seg.push(l);total+=l;}
 let half=total/2,acc=0;
 for(let i=0;i<seg.length;i++){
  if(acc+seg[i]>=half){const t=(half-acc)/(seg[i]||1),a=pts[i],b=pts[i+1],m=[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
   return [[...pts.slice(0,i+1),m],[...pts.slice(i+1).reverse(),m]];}
  acc+=seg[i];
 }
 return [pts,[pts[pts.length-1]]];
}
const pathD=pts=>'M'+pts.map(p=>p.map(n=>Math.round(n*10)/10).join(',')).join(' L');
function bodygraph(hd,{other=null,names=['Личность','Дизайн'],id='chart',selection=null}={}){
 const uid='bg'+(++graphSequence), dual=!!other;
 const a=new Set(dual?hd.gates:hd.activations.filter(x=>x.side==='personality').map(x=>x.gate));
 const b=new Set(dual?other.gates:hd.activations.filter(x=>x.side==='design').map(x=>x.gate));
 const merged=dual?HumanMatrixHD.fromGates([...a,...b]):hd;
 const colorA=dual?'#2764bd':'#263345',colorB=dual?'#138275':'#d95760';
 const ink=g=>a.has(g)&&b.has(g)?`url(#${uid}-both)`:a.has(g)?colorA:b.has(g)?colorB:'#e2e7ea';
 const defined=new Set(merged.definedCenters);
 const off=[],on=[];
 const focusGate=selection&&selection.startsWith('gate:')?+selection.slice(5):null,focusCenter=selection&&selection.startsWith('center:')?selection.slice(7):null;
 const inFocus=ch=>focusGate!==null?ch.gates.includes(focusGate):focusCenter?ch.centers.includes(focusCenter):false;
 for(const ch of HumanMatrixHD.CHANNELS){
  const halves=splitAtMiddle(channelPoints(ch));
  const gateOn=ch.gates.map(g=>a.has(g)||b.has(g)),full=gateOn[0]&&gateOn[1];
  const cls=(full?'channel-full':gateOn[0]||gateOn[1]?'channel-half':'channel-off')+(inFocus(ch)?' focus':'');
  // quiet skeleton for every channel
  off.push(`<path data-key="${ch.key}" class="${inFocus(ch)?'focus':''}" d="${pathD(channelPoints(ch))}" fill="none" stroke="${inFocus(ch)?'#9fb3c4':'#e6eaed'}" stroke-width="${inFocus(ch)?5:4.2}" stroke-linecap="round" stroke-linejoin="round"/>`);
  if(!gateOn[0]&&!gateOn[1])continue;
  const w=full?7:5.2;
  const segs=halves.map((pts,i)=>gateOn[i]?`<path d="${pathD(pts)}" fill="none" stroke="#fff" stroke-width="${w+3.4}" stroke-linecap="round" stroke-linejoin="round"/><path d="${pathD(pts)}" fill="none" stroke="${ink(ch.gates[i])}" stroke-width="${w}" stroke-linecap="${full?'butt':'round'}" stroke-linejoin="round"/>`:'').join('');
  on.push({full,html:`<g data-channel="${ch.key}" class="${cls}"><title>${ch.gates.join('–')} · ${esc(ch.name)}${full?' — полный канал':' — половина канала'}</title>${segs}</g>`});
 }
 // half channels first, full channels on top so a complete channel reads as one object
 const lines=`<g class="channel-skeleton">${off.join('')}</g>`+on.filter(x=>!x.full).map(x=>x.html).join('')+on.filter(x=>x.full).map(x=>x.html).join('');
 const centers=Object.entries(GRAPH.centers).map(([k,c])=>{
  const isOn=defined.has(k);
  return `<g class="map-target" role="button" tabindex="0" data-detail="center:${k}" aria-label="Центр ${esc(HumanMatrixHD.CENTER_LABELS[k])}"><title>${esc(HumanMatrixHD.CENTER_LABELS[k])}: ${isOn?'определён':'не определён'}</title><polygon points="${c.shape}" fill="${isOn?c.color:'#fff'}" stroke="${selection==='center:'+k?'#224f90':isOn?'#7f8b96':'#c3cbd1'}" stroke-width="${selection==='center:'+k?3:isOn?2:1.4}" stroke-linejoin="round"/></g>`;
 }).join('');
 const gates=Object.entries(GRAPH.gates).map(([g,[x,y]])=>{const isOn=a.has(+g)||b.has(+g);return `<g class="map-target" role="button" tabindex="0" data-detail="gate:${g}" aria-label="Ворота ${g}: ${esc(HD_TEXT.gates[g][0])}"><title>${g} · ${esc(HD_TEXT.gates[g][0])}${isOn?' — активированы':''}</title><circle cx="${x}" cy="${y}" r="${selection==='gate:'+g?10.4:8.4}" fill="${isOn?ink(+g):'#fff'}" stroke="${selection==='gate:'+g?'#224f90':isOn?'#fff':'#aeb8c0'}" stroke-width="${selection==='gate:'+g?2.2:isOn?1.5:1}"/><text x="${x}" y="${y+3.6}" fill="${isOn?'#fff':'#55646f'}" font-size="9.6" font-family="system-ui,sans-serif" text-anchor="middle" font-weight="700">${g}</text></g>`}).join('');
 const legend=`<div class="legend"><span><i style="background:${colorA}"></i>${esc(names[0])}</span><span><i style="background:${colorB}"></i>${esc(names[1])}</span><span><i class="mixed" style="--one:${colorA};--two:${colorB}"></i>Оба слоя</span><span><i class="legend-half"></i>Половина канала</span></div>`;
 return `<div class="bodygraph geometric v14${focusGate!==null||focusCenter?' has-focus':''}" id="${id}"><svg viewBox="18 6 404 684" role="group" aria-label="Бодиграф: девять центров, 64 ворот и 36 каналов"><defs><pattern id="${uid}-both" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="6" height="6" fill="${colorA}"/><rect width="3" height="6" fill="${colorB}"/></pattern></defs>${lines}${centers}${gates}</svg>${legend}<p class="map-hint">Толстая линия от центра до центра — полный канал. Линия до середины — только одни ворота канала. Нажмите на центр или номер ворот, чтобы открыть пояснение.</p></div>`;
}

/* Own vector geometry. One node per gate, one path per canonical channel.
 * Each channel half takes the activation of its own gate and stops at the
 * curve's true midpoint (a hanging gate never reaches the far center).
 * Routes for channels whose straight line would cross an unrelated center
 * or graze an unrelated gate are pre-computed and checked against the
 * chart geometry (see tools notes in CLAUDE_HANDOFF.md); the rest use a
 * plain, direct line — the canonical, predictable route for a short hop
 * between neighbouring centers. */
const GRAPH = {
 centers:{
  head:{shape:'220,20 178,98 262,98',color:'#ecd782'},
  ajna:{shape:'169,122 271,122 220,212',color:'#90b6a1'},
  throat:{shape:'178,242 262,242 262,326 178,326',color:'#c9a785'},
  g:{shape:'220,345 273,401 220,457 167,401',color:'#e8d17a'},
  heart:{shape:'311,342 280,398 344,398',color:'#d9898b'},
  sacral:{shape:'178,482 262,482 262,565 178,565',color:'#d9898b'},
  spleen:{shape:'37,412 37,548 137,480',color:'#c5af8f'},
  solarplexus:{shape:'403,412 403,548 303,480',color:'#c5af8f'},
  root:{shape:'178,592 262,592 262,669 178,669',color:'#c5af8f'}
 },
 gates:{64:[196,87],61:[220,87],63:[244,87],47:[193,134],24:[220,134],4:[247,134],17:[195,160],11:[245,160],43:[220,193],62:[191,254],23:[220,254],56:[249,254],16:[189,279],20:[189,303],31:[195,315],8:[214,315],33:[233,315],35:[251,279],12:[251,299],45:[251,316],7:[200,381],1:[220,363],13:[241,382],10:[183,402],25:[257,402],15:[200,424],2:[220,442],46:[241,424],21:[311,362],51:[298,383],26:[315,387],40:[332,387],48:[51,433],57:[74,450],44:[98,467],50:[120,481],32:[97,499],28:[74,517],18:[50,534],36:[389,433],22:[365,450],37:[342,467],6:[320,481],49:[342,499],55:[365,517],30:[389,534],34:[189,512],27:[189,537],5:[193,494],14:[220,494],29:[247,494],59:[251,524],42:[193,554],3:[220,554],9:[247,554],53:[193,604],60:[220,604],52:[247,604],54:[189,621],38:[189,639],58:[189,657],19:[251,621],39:[251,639],41:[251,657]}
};
/* Explicit routes for the channels whose direct line would otherwise cut
 * through an unrelated center (20-34 through G, 26-44 through G, 12-22 and
 * 35-36 through Heart) or read as a flat diagonal slash across open space.
 * x/y = single lane the curve is pulled toward; u/v = two explicit control
 * points; bow = perpendicular offset from the straight line (outward, away
 * from the chart's centerline, for a gentle canonical arc). */
const CHANNEL_ROUTES = {
 '10-20':{bow:-14},
 '10-34':{bow:16},
 '20-34':{x:140},
 '26-44':{y:475},
 '12-22':{u:[300,285],v:[355,340]},
 '35-36':{u:[350,265],v:[395,350]},
 '16-48':{bow:26},
 '18-58':{bow:26},
 '19-49':{bow:26},
 '20-57':{bow:26},
 '28-38':{bow:26},
 '30-41':{bow:-26},
 '32-54':{bow:26},
 '34-57':{bow:-32},
 '39-55':{bow:26}
};
let graphSequence=0;
function controlPoints(p,q,spec){
 if(!spec)return [[p[0]+(q[0]-p[0])/3,p[1]+(q[1]-p[1])/3],[p[0]+2*(q[0]-p[0])/3,p[1]+2*(q[1]-p[1])/3]];
 if(spec.x!==undefined)return [[spec.x,p[1]],[spec.x,q[1]]];
 if(spec.y!==undefined)return [[p[0],spec.y],[q[0],spec.y]];
 if(spec.u&&spec.v)return [spec.u,spec.v];
 const dx=q[0]-p[0],dy=q[1]-p[1],len=Math.hypot(dx,dy)||1,nx=-dy/len,ny=dx/len,o=spec.bow;
 return [[p[0]+dx/3+nx*o,p[1]+dy/3+ny*o],[p[0]+2*dx/3+nx*o,p[1]+2*dy/3+ny*o]];
}
function bodygraph(hd,{other=null,names=['Личность','Дизайн'],id='chart',selection=null}={}){
 const uid='bg'+(++graphSequence), dual=!!other;
 const a=new Set(dual?hd.gates:hd.activations.filter(x=>x.side==='personality').map(x=>x.gate));
 const b=new Set(dual?other.gates:hd.activations.filter(x=>x.side==='design').map(x=>x.gate));
 const merged=dual?HumanMatrixHD.fromGates([...a,...b]):hd;
 const colorA=dual?'#2764bd':'#263345',colorB=dual?'#138275':'#d95760';
 const ink=g=>a.has(g)&&b.has(g)?`url(#${uid}-both)`:a.has(g)?colorA:b.has(g)?colorB:'#e2e7ea';
 const defined=new Set(merged.definedCenters);
 const curve=ch=>{
  const p=GRAPH.gates[ch.gates[0]],q=GRAPH.gates[ch.gates[1]];
  const [u,v]=controlPoints(p,q,CHANNEL_ROUTES[ch.key]);
  const mid=(x,y)=>[(x[0]+y[0])/2,(x[1]+y[1])/2],pu=mid(p,u),uv=mid(u,v),vq=mid(v,q),s=mid(pu,uv),t=mid(uv,vq),m=mid(s,t);
  return [`M${p} C${pu} ${s} ${m}`,`M${q} C${vq} ${t} ${m}`];
 };
 const lines=HumanMatrixHD.CHANNELS.map(ch=>{
  const paths=curve(ch);
  const gateOn=ch.gates.map(g=>a.has(g)||b.has(g));
  const full=gateOn[0]&&gateOn[1];
  const segs=paths.map((d,i)=>{
   const on=gateOn[i],w=full?7.6:on?5:1.5,haloW=on?w+4.4:0;
   return `${haloW?`<path d="${d}" fill="none" stroke="#eef1f4" stroke-width="${haloW}" stroke-linecap="round"/>`:''}<path d="${d}" fill="none" stroke="${ink(ch.gates[i])}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  }).join('');
  return `<g data-channel="${ch.key}" class="${full?'channel-full':gateOn[0]||gateOn[1]?'channel-half':'channel-off'}"><title>${ch.gates.join('–')} · ${esc(ch.name)}${full?' — полный канал':''}</title>${segs}</g>`;
 }).join('');
 const centers=Object.entries(GRAPH.centers).map(([k,c])=>{
  const on=defined.has(k);
  return `<g class="map-target" role="button" tabindex="0" data-detail="center:${k}" aria-label="Центр ${esc(HumanMatrixHD.CENTER_LABELS[k])}"><title>${esc(HumanMatrixHD.CENTER_LABELS[k])}: ${on?'определён':'не определён'}</title><polygon points="${c.shape}" fill="${on?c.color:'#fff'}" stroke="${selection==='center:'+k?'#224f90':on?'#8a95a1':'#c7ced4'}" stroke-width="${selection==='center:'+k?3:on?2:1.3}"/></g>`;
 }).join('');
 const gates=Object.entries(GRAPH.gates).map(([g,[x,y]])=>{const on=a.has(+g)||b.has(+g);return `<g class="map-target" role="button" tabindex="0" data-detail="gate:${g}" aria-label="Ворота ${g}: ${esc(HD_TEXT.gates[g][0])}"><title>${g} · ${esc(HD_TEXT.gates[g][0])}${on?' — активированы':''}</title><circle cx="${x}" cy="${y}" r="${selection==='gate:'+g?10.6:on?8.6:7.6}" fill="${on?ink(+g):'#fff'}" stroke="${selection==='gate:'+g?'#224f90':on?'#fff':'#b7c0c7'}" stroke-width="${selection==='gate:'+g?2.2:on?1.6:0.9}"/><text x="${x}" y="${y+3.8}" fill="${on?'#fff':'#5b6b78'}" font-size="10.3" font-family="system-ui,sans-serif" text-anchor="middle" font-weight="700">${g}</text></g>`}).join('');
 const legend=`<div class="legend"><span><i style="background:${colorA}"></i>${esc(names[0])}</span><span><i style="background:${colorB}"></i>${esc(names[1])}</span><span><i class="mixed" style="--one:${colorA};--two:${colorB}"></i>Оба слоя</span></div>`;
 return `<div class="bodygraph geometric" id="${id}"><svg viewBox="0 0 440 682" role="group" aria-label="Бодиграф: девять центров, 64 ворот и 36 каналов"><defs><pattern id="${uid}-both" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="6" height="6" fill="${colorA}"/><rect width="3" height="6" fill="${colorB}"/></pattern></defs>${lines}${centers}${gates}</svg>${legend}<p class="map-hint">Нажмите на центр или номер ворот, чтобы открыть пояснение.</p></div>`;
}

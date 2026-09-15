/* Human Matrix 0.7 — feedback pass: clearer bodygraph, visible activations and beginner-first reading. */
(() => {
  const BODY_ORDER=['sun','earth','north_node','south_node','moon','mercury','venus','mars','jupiter','saturn','uranus','neptune','pluto'];
  const BODY_SYMBOLS={sun:'☉',earth:'⊕',north_node:'☊',south_node:'☋',moon:'☽',mercury:'☿',venus:'♀',mars:'♂',jupiter:'♃',saturn:'♄',uranus:'♅',neptune:'♆',pluto:'♇'};
  const SIMPLE_TYPE={
    'Manifestor':'Ваш тип в Human Design связывают с самостоятельным началом действий. Практический ориентир: если ваше решение затронет других, заранее сообщите, что собираетесь делать. Это снижает лишнее сопротивление и не означает, что нужно просить разрешения на каждый шаг.',
    'Generator':'Ваш тип в Human Design связывают с откликом на конкретные возможности. Вместо того чтобы заставлять себя решить всё заранее, полезно заметить реакцию на реальное предложение, задачу или вариант и только потом брать обязательство.',
    'Manifesting Generator':'Ваш тип в Human Design сочетает отклик и быстрый переход к действию. Сначала проверьте, есть ли живой отклик на конкретную возможность, затем двигайтесь. Менять маршрут по ходу нормально; важно сообщать людям, если изменение затрагивает общие договорённости.',
    'Projector':'Ваш тип в Human Design связывают с умением видеть людей и устройство процессов. Для значимых ролей и отношений особенно важно замечать, где ваш взгляд действительно востребован. Это не запрещает проявлять инициативу в обычной жизни.',
    'Reflector':'Ваш тип в Human Design описывают как особенно чувствительный к среде и контексту. Для крупных решений система предлагает не спешить и сравнивать своё восприятие в разные дни и обстоятельства.'
  };
  const SIMPLE_AUTH={
    Emotional:'Не принимайте важное решение на пике эмоции. Дайте вопросу время и вернитесь к нему в другом состоянии. Смотрите, остаётся ли ответ устойчивым.',
    Sacral:'Сведите решение к конкретному варианту: «да или нет», «это или это». Заметьте первую телесную реакцию, а затем проверьте её фактами, ресурсами и последствиями.',
    Splenic:'Обратите внимание на первое тихое ощущение уместности или неуместности. Не путайте его с нарастающей тревогой и всё равно учитывайте реальные обстоятельства.',
    Ego:'Перед обещанием проверьте две вещи: действительно ли вы этого хотите и готовы ли вложить в это свои силы и ресурсы.',
    'Self-Projected':'Проговорите решение вслух рядом с человеком, который не будет выбирать за вас. Слушайте не его совет, а собственные слова и направление, которое в них появляется.',
    'Mental / Environmental':'Для важных решений полезно проговорить варианты в спокойной подходящей среде и сравнить, как они ощущаются в разных обстоятельствах.',
    Lunar:'Для крупных решений традиция Human Design предлагает длительное наблюдение. Не торопите окончательный ответ и смотрите, что остаётся устойчивым со временем.'
  };

  function activationRail(h,side,title){
    const map=new Map(h.activations.filter(x=>x.side===side).map(x=>[x.body,x]));
    const design=side==='design';
    return `<aside class="activation-rail ${design?'design':'personality'}" aria-label="${title}"><div class="rail-title"><strong>${title}</strong><span>${design?'красный · до рождения':'чёрный · момент рождения'}</span></div><div class="rail-rows">${BODY_ORDER.map(key=>{const a=map.get(key);return `<div class="rail-row"><span class="planet-symbol" aria-hidden="true">${BODY_SYMBOLS[key]||'•'}</span><span class="planet-name">${esc(bodyNames[key]||key)}</span><strong>${a?`${a.gate}.${a.line}`:'—'}</strong></div>`}).join('')}</div></aside>`;
  }

  function channelSegments(ch){
    const p=GRAPH.gates[ch.gates[0]],q=GRAPH.gates[ch.gates[1]];
    const routed={'16-48':14,'20-57':105,'20-34':142,'10-34':153,'10-57':119,'12-22':352,'35-36':427,'21-45':310,'37-40':356,'26-44':135};
    if(routed[ch.key]!==undefined){
      const x=routed[ch.key],midY=(p[1]+q[1])/2;
      return [`M ${p[0]} ${p[1]} L ${x} ${p[1]} L ${x} ${midY}`,`M ${q[0]} ${q[1]} L ${x} ${q[1]} L ${x} ${midY}`];
    }
    const mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2;
    return [`M ${p[0]} ${p[1]} L ${mx} ${my}`,`M ${q[0]} ${q[1]} L ${mx} ${my}`];
  }

  bodygraph = function(h,{other=null,names=['Личность','Дизайн'],id='chart',selection=null}={}){
    const uid='bg'+(++graphSequence),dual=!!other;
    const a=new Set(dual?h.gates:h.activations.filter(x=>x.side==='personality').map(x=>x.gate));
    const b=new Set(dual?other.gates:h.activations.filter(x=>x.side==='design').map(x=>x.gate));
    const merged=dual?HumanMatrixHD.fromGates([...a,...b]):h;
    const colorA=dual?'#2764bd':'#263345',colorB=dual?'#138275':'#d95760';
    const ink=g=>a.has(g)&&b.has(g)?`url(#${uid}-both)`:a.has(g)?colorA:b.has(g)?colorB:'#dce1e7';
    const defined=new Set(merged.definedCenters);
    const lines=HumanMatrixHD.CHANNELS.map(ch=>{const paths=channelSegments(ch),act=ch.gates.every(g=>a.has(g)||b.has(g));return `<g data-channel="${ch.key}"><title>${ch.gates.join('–')} · ${esc(ch.name)}</title>${paths.map((d,i)=>`<path d="${d}" fill="none" stroke="#eef1f4" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${ink(ch.gates[i])}" stroke-width="${act?5.8:4.8}" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}</g>`}).join('');
    const centers=Object.entries(GRAPH.centers).map(([k,c])=>`<g class="map-target" role="button" tabindex="0" data-detail="center:${k}" aria-label="Центр ${esc(HumanMatrixHD.CENTER_LABELS[k])}"><title>${esc(HumanMatrixHD.CENTER_LABELS[k])}: ${defined.has(k)?'определён':'не определён'}</title><polygon points="${c.shape}" fill="${defined.has(k)?c.color:'#fff'}" stroke="${selection==='center:'+k?'#224f90':'#95a2ad'}" stroke-width="${selection==='center:'+k?3:1.5}"/></g>`).join('');
    const gates=Object.entries(GRAPH.gates).map(([g,[x,y]])=>{const on=a.has(+g)||b.has(+g);return `<g class="map-target" role="button" tabindex="0" data-detail="gate:${g}" aria-label="Ворота ${g}: ${esc(HD_TEXT.gates[g][0])}"><title>${g} · ${esc(HD_TEXT.gates[g][0])}${on?' — активированы':''}</title><circle cx="${x}" cy="${y}" r="${selection==='gate:'+g?10.4:8.3}" fill="${on?ink(+g):'#fff'}" stroke="${selection==='gate:'+g?'#224f90':on?'#fff':'#a3acb4'}" stroke-width="${selection==='gate:'+g?2:0.65}"/><text x="${x}" y="${y+3.8}" fill="${on?'#fff':'#4b5c6c'}" font-size="10.5" font-family="system-ui,sans-serif" text-anchor="middle" font-weight="650">${g}</text></g>`}).join('');
    const legend=`<div class="legend"><span><i style="background:${colorA}"></i>${esc(names[0])}</span><span><i style="background:${colorB}"></i>${esc(names[1])}</span><span><i class="mixed" style="--one:${colorA};--two:${colorB}"></i>Оба слоя</span></div>`;
    return `<div class="bodygraph geometric" id="${id}"><svg viewBox="0 0 440 682" role="group" aria-label="Бодиграф: девять центров, 64 ворот и 36 каналов"><defs><pattern id="${uid}-both" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="6" height="6" fill="${colorA}"/><rect width="3" height="6" fill="${colorB}"/></pattern></defs>${lines}${centers}${gates}</svg>${legend}<p class="map-hint">Нажмите на центр или номер ворот, чтобы открыть пояснение.</p></div>`;
  };

  chartCard = function(h,options={}){
    const personal=!options.other&&!options.title;
    const chart=bodygraph(h,options);
    const body=personal?`<div class="bodygraph-with-activations">${activationRail(h,'design','Дизайн')}<div class="bodygraph-center">${chart}</div>${activationRail(h,'personality','Личность')}</div>`:chart;
    return `<div class="chart-card ${personal?'has-activations':''}"><div class="chart-card-heading">${esc(options.title||'Личная карта')}<span>9 центров · 64 ворот</span></div>${body}</div>`;
  };

  function quickStartHtml(h){
    const type=SIMPLE_TYPE[h.type]||HD_TEXT.types[h.type]?.[2]||'';
    const authority=SIMPLE_AUTH[h.authority]||HD_TEXT.authority[h.authority]?.[1]||'';
    return `<section id="quick-start" class="reading-section quick-start"><div class="section-head"><div><div class="eyebrow">Начните отсюда</div><h2>Два главных ориентира</h2></div><div class="depth-switch" role="group" aria-label="Глубина расшифровки"><button type="button" data-depth="simple">Понятно</button><button type="button" data-depth="full">Подробно</button></div></div><p class="section-intro">Если Human Design вам незнаком, сначала разберитесь только с типом и способом принятия решений. Остальные детали можно открыть позже.</p><div class="read-grid"><article class="reading-card beginner-card"><div class="eyebrow">1 · Как входить в действие</div><h3>${esc(typeName(h))}</h3><p>${esc(type)}</p></article><article class="reading-card beginner-card"><div class="eyebrow">2 · Как принимать решения</div><h3>${esc(authorityName(h))}</h3><p>${esc(authority)}</p></article></div><div class="beginner-note"><strong>Мини-эксперимент:</strong> не пытайтесь «соответствовать карте». Возьмите одно реальное решение или ситуацию на ближайшие дни и проверьте, помогает ли этот способ действовать яснее.</div></section>`;
  }

  function applyDepth(){
    const ws=document.querySelector('.workspace');
    if(!ws)return;
    const depth=localStorage.getItem('human-matrix.depth.v1')||'simple';
    ws.classList.toggle('depth-simple',depth==='simple');
    ws.classList.toggle('depth-full',depth==='full');
    document.querySelectorAll('[data-depth]').forEach(b=>b.classList.toggle('active',b.dataset.depth===depth));
  }

  function enhancePersonView(){
    if(state.mode!=='person')return;
    const p=active(),c=calcFor(p);
    if(!p||!c.ready)return;
    const layout=document.querySelector('#content .chart-layout');
    if(layout&&!document.getElementById('quick-start'))layout.insertAdjacentHTML('afterend',quickStartHtml(c.hd));
    document.querySelectorAll('.fact').forEach(f=>{
      const label=f.querySelector('span'),value=f.querySelector('strong');
      if(!label||!value)return;
      if(label.textContent.trim()==='Авторитет'){label.textContent='Как принимать решения';value.textContent=authorityName(c.hd)+' авторитет';}
      if(label.textContent.trim()==='Стратегия')label.textContent='Как входить в действие';
    });
    applyDepth();
  }

  function installUtilityLinks(){
    const foot=document.querySelector('.side-foot');
    if(!foot||foot.querySelector('.utility-nav'))return;
    const existing=foot.querySelector('a[href="#systems"]');
    if(existing)existing.remove();
    foot.insertAdjacentHTML('beforeend','<nav class="utility-nav" aria-label="Дополнительные инструменты"><a href="#observations">Наблюдения</a><a href="#systems">О приложении и методе</a></nav>');
  }

  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-depth]');
    if(!b)return;
    localStorage.setItem('human-matrix.depth.v1',b.dataset.depth);
    applyDepth();
  });

  installUtilityLinks();
  renderContent();
  enhancePersonView();
  const content=document.getElementById('content');
  if(content)new MutationObserver(()=>{enhancePersonView();applyDepth();}).observe(content,{childList:true});
})();

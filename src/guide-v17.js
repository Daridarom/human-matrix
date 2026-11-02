(function humanGuide(){
'use strict';
const TYPES={
Manifestor:{title:'Манифестор — тот, кто начинает',what:'В Дизайне человека Манифестором называют тип, который связывают с самостоятельным запуском процессов. В классической механике у него нет определённого Сакрального центра, но есть связь моторного центра с Горлом.',scene:'Например, вы придумали новое дело и готовы начать. Остальные ещё не понимают план и пытаются остановить вас вопросами.',try:'Проверьте на реальном случае: заранее расскажите затронутым людям, что собираетесь делать, зачем и какие последствия для них возможны.',watch:'Замечайте, когда самостоятельность помогает, а когда окружающим не хватает информации. Покой и гнев в этой системе — темы наблюдения, а не предсказание ваших эмоций.'},
Generator:{title:'Генератор — включается, когда есть отклик',what:'В этой системе Генератор связан с определённым Сакральным центром и откликом на то, что встречается в жизни. Это не оценка работоспособности человека.',scene:'Например, вас просят заняться проектом. Одна задача вызывает живой интерес, а на другую вы соглашаетесь только из вежливости.',try:'Прежде чем взять обязательство, сформулируйте конкретное предложение и сравните интерес, время и реальные ресурсы.',watch:'Замечайте, в каких делах интерес остаётся и после первых трудностей, а где согласие было формальным.'},
'Manifesting Generator':{title:'Манифестирующий генератор — отклик и быстрый темп',what:'В классическом Дизайне человека это разновидность Генератора, которая сочетает сакральный отклик с механикой проявления через Горло.',scene:'Например, вы начали собирать мероприятие и быстро нашли путь проще, но не предупредили команду об изменении плана.',try:'Замечайте интерес к задаче, а при смене курса сообщайте людям, от которых зависят следующие шаги.',watch:'Скорость полезна, если не теряются важные проверки и договорённости.'},
Projector:{title:'Проектор — замечает, как устроен процесс',what:'Проектора в этой системе связывают с распознаванием людей и процессов и со значимостью признания и приглашения для крупных ролей и отношений.',scene:'Например, на совещании вы видите причину сбоя, но ваш непрошеный совет воспринимают как критику.',try:'Проверьте разницу между моментом, когда у вас попросили обратную связь, и моментом, когда вы решили дать её самостоятельно.',watch:'Приглашение в традиции не означает запрет спрашивать, действовать или отстаивать свои интересы.'},
Reflector:{title:'Рефлектор — исследует влияние окружения',what:'В карте Рефлектора нет определённых центров. Система трактует это как особую восприимчивость к условиям и людям, но это не измерение психологической чувствительности.',scene:'Например, после двух встреч с разными группами остаются очень разные впечатления об одной и той же задаче.',try:'Для большого решения сравните впечатления в разное время, с разными людьми и в разных обстоятельствах.',watch:'Лунный цикл — ориентир традиции. Реальные сроки, безопасность и обязательства также имеют значение.'}
};
const AUTHS={
Emotional:'Здесь традиция предлагает не принимать важное решение на вершине сильной эмоции, а вернуться к нему позже. Например, сравнить сегодняшнее «да» с ответом после спокойной ночи.',
Sacral:'Здесь внимание уделяют непосредственной реакции на конкретный вопрос. Например: «Хочу ли я взяться именно за эту задачу?» Затем всё равно проверяют сроки, ресурсы и последствия.',
Splenic:'Здесь говорят о быстром, тихом ощущении момента. Это не означает, что первая тревога всегда верна; факты и безопасность важнее эзотерической уверенности.',
Ego:'Здесь акцент на собственном желании и готовности выполнить обещание. Перед согласием полезно спросить: «Я действительно этого хочу и располагаю силами?»',
'Self-Projected':'Здесь направление предлагается исследовать через собственную речь: проговорить варианты вслух и заметить, какой смысл вы им придаёте.',
'Mental / Environmental':'Здесь значимы условия и диалог. Можно обсудить выбор в спокойной обстановке, не передавая другим право решать за вас.',
Lunar:'Для крупных решений традиция предлагает длительное наблюдение, условно лунный цикл. Фиксируйте, что сохраняется в разных обстоятельствах.'
};
const E=(v)=>esc(String(v==null?'':v));
const step=(num,title,body,opened=false)=>`<details class="hm17-step" ${opened?'open':''}><summary><span class="hm17-number">${num}</span><span>${title}</span><span class="hm17-arrow" aria-hidden="true">⌄</span></summary><div class="hm17-body">${body}</div></details>`;
const q=(text)=>`<p class="hm17-question"><strong>Вопрос для себя:</strong> ${E(text)}</p>`;
const link=(id,label)=>`<a class="hm17-link" href="#${id}">${label} ↓</a>`;
const tip=(title,body)=>`<p><strong>${title}</strong> ${E(body)}</p>`;
function personalGuide(h){
const type=TYPES[h.type]||{title:'Ваш тип — '+typeName(h),what:HD_TEXT.types[h.type]?.[2]||'',scene:'Вспомните реальный случай, когда вы включались в новое дело.',try:'Сравните подсказки системы с собственными решениями.',watch:'Наблюдайте, что совпадает, а что нет.'};
const auth=AUTHS[h.authority]||HD_TEXT.authority[h.authority]?.[1]||'Для этой темы посмотрите развёрнутую трактовку ниже.';
const authLabel=authorityName(h);
const channels=h.channels||[];
const gates=window.HumanMatrixBook?.GATE_BOOK||{};
const books=window.HumanMatrixBook?.CHANNEL_BOOK||{};
const lineIds=String(h.profile||'').split('/').map(Number);
const la=HD_TEXT.lines[lineIds[0]],lb=HD_TEXT.lines[lineIds[1]];
const typeHtml=`<h3>${E(type.title)}</h3>${tip('Что это означает в системе.',type.what)}${tip('Пример из жизни.',type.scene)}${tip('Что попробовать.',type.try)}${q(type.watch)}<p class="hm17-note">Тип не определяет профессию, характер и ценность человека.</p>`;
const strategyHtml=`<h3>Как взаимодействовать с событиями и людьми</h3><p><strong>Стратегия вашей карты:</strong> ${E(h.strategy||'смотрите подробное описание типа')}.</p>${tip('Смысл на практике.',HD_TEXT.types[h.type]?.[3]||type.try)}<p><strong>Пример.</strong> ${E(type.scene)}</p>${q('В каких случаях такое поведение помогало, а в каких нет?')}`;
const authorityHtml=`<h3>Как в системе описано принятие решений</h3><p><strong>Ваш авторитет:</strong> ${E(authLabel)}.</p><p>${E(auth)}</p>${q('Какие мои реальные решения подтверждают эту трактовку, а какие ей противоречат?')}<p class="hm17-note">Не заменяйте этим медицинские, юридические, финансовые и другие ответственные проверки.</p>`;
const channelCards=channels.length?channels.map((ch,i)=>{
const b=books[ch.key]||{};
const n=b.name||('Канал '+ch.key);
const gateNames=(ch.gates||[]).map(id=>`${id} — ${HD_TEXT.gates[id]?.[0]||'ворота'}`).join(' + ');
const plain=b.plain||HD_TEXT.channels[ch.key]||'Это связь двух ворот, которая объединяет две темы карты.';
const practice=Array.isArray(b.practice)?b.practice[0]:b.practice;
return `<details class="hm17-channel"><summary><strong>${E(ch.key)} · ${E(n)}</strong><span>Раскрыть смысл</span></summary><div class="hm17-channel-body"><p><strong>Из чего состоит:</strong> ${E(gateNames)}.</p><p><strong>Простыми словами:</strong> ${E(plain)}</p>${practice?q(practice):''}<p class="hm17-note">Это тема канала в трактовке системы, а не установленная черта личности.</p></div></details>`;
}).join(''):'<p>В этой карте нет полных каналов. В терминологии системы это характерно для Рефлектора.</p>';
const channelsHtml=`<h3>Каналы — связи, которые действительно есть в вашей карте</h3><p>Канал соединяет двое ворот и два центра. Когда в карте активны оба его конца, он считается определённым. Каналы помогают перейти от общего типа к конкретной конфигурации вашей карты.</p><p><strong>У вас ${channels.length} ${channels.length===1?'полный канал':channels.length>=2&&channels.length<=4?'полных канала':'полных каналов'}.</strong> Ни один канал нельзя назвать «главным» только потому, что он показан первым.</p>${channelCards}${link('channels','Все каналы и классические подробности')}`;
const defined=h.definedCenters||[];
const centersHtml=`<h3>Центры — девять тем на схеме</h3><p>Центры условно описывают разные области опыта: мысли, выражение, эмоции, волю и другие. Внутри системы цветной центр означает связь через полный канал, а белый — отсутствие такой связи. Белый не означает плохой или «пустой».</p><div class="hm17-centers">${HumanMatrixHD.CENTERS.map(k=>{const label=HumanMatrixHD.CENTER_LABELS[k];const txt=HD_TEXT.centers[k]?.[0]||'';return `<div><strong>${E(label)}</strong><span>${defined.includes(k)?'В карте определён':'В карте не определён'} · ${E(txt)}</span></div>`}).join('')}</div>${link('centers','Расшифровка каждого центра')}`;
const profileHtml=`<h3>Профиль ${E(h.profile)} — две линии вместе</h3><p>Профиль в традиции читают как сочетание двух линий, а не как два отдельных ярлыка.</p><p><strong>Первая линия — ${E(la?.[0]||lineIds[0])}:</strong> ${E(la?.[1]||'сознательная тема')}</p><p><strong>Вторая линия — ${E(lb?.[0]||lineIds[1])}:</strong> ${E(lb?.[1]||'бессознательная тема')}</p>${q('Как эти два подхода проявлялись вместе в конкретной ситуации?')}${link('profile-deep','Глубокое описание профиля')}`;
const activated=h.gates||[];
const examples=activated.slice(0,5).map(id=>`<li><strong>${E(id)} — ${E(HD_TEXT.gates[id]?.[0]||'ворота')}</strong>. ${E(HD_TEXT.gates[id]?.[1]||'')}</li>`).join('');
const gatesHtml=`<h3>Ворота и линии — тонкие детали карты</h3><p><strong>Ворота</strong> — одна из 64 тем системы. <strong>Линия</strong> — один из шести вариантов прочтения ворот. Запись «21.3» означает ворота 21, линия 3.</p><p>В вашей карте ${activated.length} активированных ворот. Вот несколько примеров:</p><ul>${examples}</ul><p>Важно: одни ворота нельзя считать готовым портретом человека. Их рассматривают вместе с линией, планетой, центром и полными каналами.</p>${link('gates','Все ворота и линии')}`;
return `<section id="hm17-person" class="hm17-guide" aria-labelledby="hm17-title"><div class="hm17-intro"><span class="hm17-eyebrow">Human Matrix 0.17 · Понятно каждому</span><h2 id="hm17-title">С чего начать изучать свою карту</h2><p>Начните с первого шага. Остальные раскрывайте по порядку, когда захочется разобраться глубже. Здесь объясняются именно элементы <strong>вашей</strong> карты, а не общая энциклопедия.</p><div class="hm17-flow">Тип <span>→</span> Стратегия <span>→</span> Авторитет <span>→</span> Каналы <span>→</span> Центры <span>→</span> Профиль <span>→</span> Ворота и линии</div></div><div class="hm17-steps">${step(1,'Кто я? '+E(typeName(h)),typeHtml,true)}${step(2,'Как мне действовать? Стратегия',strategyHtml)}${step(3,'Как принимать решения? '+E(authLabel),authorityHtml)}${step(4,'Какие каналы есть именно у меня?',channelsHtml)}${step(5,'Что означают цветные и белые центры?',centersHtml)}${step(6,'Как понимать профиль '+E(h.profile)+'?',profileHtml)}${step(7,'Что скрывается за номерами ворот и линий?',gatesHtml)}</div><div class="hm17-footer"><strong>Как читать честно.</strong> Рассчитанные номера и связи — результат алгоритма по введённым данным. Их смысл — традиционная интерпретация Human Design, не научный тест личности. Проверяйте наблюдения на реальном опыте, включая несовпадения. ${link('type-deep','Открыть подробные трактовки')}</div></section>`;
}
const oldPerson=personView;
personView=function(){
let html=oldPerson(),p=active();if(!p)return html;
const c=calcFor(p);if(!c.ready)return html;
const guide=personalGuide(c.hd);
html=html.replace('<div class="chart-layout">',guide+'<div class="chart-layout">');
return html;
};
function pairIntro(a,b,ca,cb){
const comparison=HumanMatrixHD.compare(ca.hd,cb.hd);
const combined=HumanMatrixHD.fromGates([...ca.hd.gates,...cb.hd.gates]);
const newCenters=combined.definedCenters.filter(k=>!ca.hd.definedCenters.includes(k)&&!cb.hd.definedCenters.includes(k));
return `<section class="hm17-guide hm17-rel" id="hm17-pair"><div class="hm17-intro"><span class="hm17-eyebrow">Понятно каждому · Отношения</span><h2>Сначала понять каждого, затем — вашу связь</h2><p>Схема пары не говорит, подходите ли вы друг другу. Начните с того, как в системе описан каждый человек, затем смотрите общие темы и обсуждайте реальные договорённости.</p></div><div class="hm17-rel-grid"><article><h3>${E(a.name)}</h3><p><strong>${E(typeName(ca.hd))}</strong> · ${E(authorityName(ca.hd))}</p><p>${E(TYPES[ca.hd.type]?.what||'')}</p></article><article><h3>${E(b.name)}</h3><p><strong>${E(typeName(cb.hd))}</strong> · ${E(authorityName(cb.hd))}</p><p>${E(TYPES[cb.hd.type]?.what||'')}</p></article></div>${step('1','Какая тема возникает только вместе?',`<p>По алгоритму общей карты только вместе становятся определёнными ${newCenters.length} ${newCenters.length===1?'центр':newCenters.length>=2&&newCenters.length<=4?'центра':'центров'}${newCenters.length?': '+E(newCenters.map(k=>HumanMatrixHD.CENTER_LABELS[k]).join(', ')):'.'} Это описание структуры карты, а не гарантия поведения.</p>`,true)}${step('2','Что значат связи между нами?',`<p><strong>Дополняющие (электромагнитные): ${comparison.electromagnetic.length}.</strong> У каждого по одному концу канала, а вместе складывается полный.</p><p><strong>Общие: ${comparison.companionship.length}.</strong> Один и тот же полный канал у обоих.</p><p><strong>Компромиссные: ${comparison.compromise.length}.</strong> Полный канал у одного, отдельные ворота — у другого.</p><p><strong>Доминирующие: ${comparison.dominance.length}.</strong> Полный канал у одного; это не оценка власти.</p>${link('pair-guide','Подробнее о механике пары')}`)}${step('3','Что обсуждать в реальной жизни?',`<p>Когда каждому нужно пространство для самостоятельного решения? Как предупреждать об изменениях? По каким вопросам лучше просить совета, а не навязывать его?</p>${q('Какое конкретное недопонимание мы можем разрешить разговором, независимо от трактовки карты?')}`)}<p class="hm17-note">Счётчики каналов не являются оценкой совместимости. Уважение и безопасность отношений важнее любых трактовок.</p></section>`;
}
const oldPair=pairView;
pairView=function(){
let html=oldPair();
if(state.people.length<2)return html;
const a=state.people[state.pairA],b=state.people[state.pairB];if(!a||!b)return html;
const ca=calcFor(a),cb=calcFor(b);if(!ca.ready||!cb.ready)return html;
return html.replace('<div class="chart-layout">',pairIntro(a,b,ca,cb)+'<div class="chart-layout">');
};
const oldTeam=teamView;
teamView=function(){
let html=oldTeam();
const participants=state.people.map(p=>({p,c:calcFor(p)})).filter(x=>x.c.ready);
if(participants.length<2)return html;
const summary=participants.map(({p,c})=>`<article><h3>${E(p.name)}</h3><p><strong>${E(typeName(c.hd))}</strong></p><p>${E(TYPES[c.hd.type]?.scene||'')}</p><p class="hm17-note">Это пример для размышления, а не назначение роли.</p></article>`).join('');
const prefix=`<section class="hm17-guide hm17-rel" id="hm17-team"><div class="hm17-intro"><span class="hm17-eyebrow">Понятно каждому · Команда</span><h2>Кто в команде и как лучше договориться</h2><p>Начните с людей и конкретных рабочих ситуаций. Роль и профессиональные обязанности определяют не дата рождения и не тип, а компетенции, согласие, ресурсы и результаты.</p></div><div class="hm17-rel-grid">${summary}</div>${step('1','Что мы пытаемся узнать?',`<p>Кто охотно начинает новые задачи? Кому нравится поддерживать длительную работу? Кто замечает проблемы процесса? Это вопросы к людям, а не готовые ответы по карте.</p>`,true)}${step('2','Что карта показывает о группе?',`<p>В разделе ниже есть подсчёт определённых центров у участников и связи, возникающие при объединении карт. Система предлагает темы для обсуждения, но не измеряет эффективность команды.</p>`)}${step('3','Как проверить пользу на практике?',`<p>Возьмите одну реальную задачу, назначьте ответственного по опыту и доступности, договоритесь о сроке и проверьте результат. Затем обсудите, помогло ли описание из карты лучше понять ситуацию.</p>${q('Какие обязанности подтверждены реальными навыками и результатами, а какие мы только приписали человеку?')}`)}</section>`;
html=html.replace('<div class="paper table-scroll">',prefix+'<div class="paper table-scroll">');
return html.replace('Сильные и слабые места группы','Темы для обсуждения в группе');
};
window.HM_GUIDE_VERSION='0.17.0';
renderContent();
})();

/* Human Matrix 0.8 — reference pass: persistent Design/Personality rails, cleaner chart hierarchy, verified-source notes. */
(() => {
  const BODY_ORDER=['sun','earth','north_node','south_node','moon','mercury','venus','mars','jupiter','saturn','uranus','neptune','pluto'];
  const BODY_SYMBOLS={sun:'☉',earth:'⊕',north_node:'☊',south_node:'☋',moon:'☽',mercury:'☿',venus:'♀',mars:'♂',jupiter:'♃',saturn:'♄',uranus:'♅',neptune:'♆',pluto:'♇'};

  function rail(h,side,title,subtitle){
    const activations=new Map(h.activations.filter(x=>x.side===side).map(x=>[x.body,x]));
    const design=side==='design';
    return `<aside class="activation-rail v08 ${design?'design':'personality'}" aria-label="${esc(title)}"><div class="rail-title"><strong>${esc(title)}</strong><span>${esc(subtitle)}</span></div><div class="rail-rows">${BODY_ORDER.map(key=>{const a=activations.get(key);const label=bodyNames[key]||key;return `<div class="rail-row"><span class="planet-symbol" aria-hidden="true">${BODY_SYMBOLS[key]||'•'}</span><span class="planet-name" title="${esc(label)}">${esc(label)}</span>${a?`<button type="button" class="rail-gate" data-detail="gate:${a.gate}" aria-label="${esc(label)}: ворота ${a.gate}, линия ${a.line}">${a.gate}.${a.line}</button>`:'<strong>—</strong>'}</div>`}).join('')}</div></aside>`;
  }

  const previousChartCard=chartCard;
  chartCard=function(h,options={}){
    const personal=!options.other&&!options.title;
    if(!personal)return previousChartCard(h,options);
    const chart=bodygraph(h,options);
    const essentials=`<div class="chart-essentials" aria-label="Ключевые параметры карты"><div><span>Тип</span><strong>${esc(typeName(h))}</strong></div><div><span>Как принимать решения</span><strong>${esc(authorityName(h))}</strong></div><div><span>Профиль</span><strong>${esc(h.profile)}</strong></div><div><span>Определённость</span><strong>${esc(definition(h))}</strong></div></div>`;
    const layerGuide=`<div class="layer-guide" aria-label="Слои карты"><div class="design"><strong>Дизайн</strong><span>бессознательное · красный слой</span></div><div class="personality"><strong>Личность</strong><span>сознательное · чёрный слой</span></div></div>`;
    return `<div class="chart-card has-activations v08"><div class="chart-card-heading">Личная карта<span>9 центров · 64 ворот</span></div>${essentials}${layerGuide}<div class="bodygraph-with-activations">${rail(h,'design','Дизайн','Бессознательное · до рождения')}<div class="bodygraph-center">${chart}</div>${rail(h,'personality','Личность','Сознательное · момент рождения')}</div><p class="chart-help">Нажмите на число в колонке или на ворота/центр в карте, чтобы открыть пояснение.</p></div>`;
  };

  const previousSystemsView=systemsView;
  systemsView=function(){
    return previousSystemsView()+section(
      'project-library',
      'Рабочая библиотека проекта',
      `<div class="paper source-library"><p>Для сверки терминологии и смысловой логики в проект добавлены три справочных источника:</p><ul><li>Линда Баннелл, Ра Уру Ху — «Дизайн Человека. Наука о Дифференциации».</li><li>«Рэйв Картография. Учебное пособие».</li><li>Петер Шёбер — «Основы системы Дизайн Человека. Центры».</li></ul><p class="supporting">Материалы используются как внутренняя справочная база. Тексты интерфейса формулируются самостоятельно и отделяют рассчитанные данные от символической трактовки и интегральных гипотез.</p></div>`,
      '3 источника',
      'В классическом слое приоритет остаётся у Стратегии и Внутреннего Авторитета; детали карты раскрываются дальше по мере необходимости.'
    )+section(
      'reference-boundaries',
      'Что намеренно не дорисовываем',
      `<div class="paper"><p>В референсах встречаются четыре стрелки R/L, цвет, тон, база и дополнительные маркеры. Они появятся только после отдельной верификации расчёта на контрольных картах. Пока Human Matrix не подставляет приблизительные значения ради визуального сходства.</p></div>`,
      'Точность важнее декоративной полноты'
    );
  };

  renderContent();
})();

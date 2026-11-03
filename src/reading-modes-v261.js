/* Human Matrix 0.26.1 — two reading depths; calculations and source data unchanged. */
(function(){
  'use strict';
  const key='human-matrix.reading-mode.v1';
  let mode='simple';
  try{mode=localStorage.getItem(key)==='professional'?'professional':'simple'}catch{}
  const control=document.createElement('div');
  control.className='hm-reading-switch';
  control.setAttribute('role','group');
  control.setAttribute('aria-label','Глубина расшифровки');
  control.innerHTML='<span class="hm-reading-label">Режим просмотра</span><div class="hm-reading-options"><button type="button" data-reading="simple">Обычный</button><button type="button" data-reading="professional">Профессиональный</button></div><p class="hm-reading-description" aria-live="polite"></p>';
  const tabs=document.getElementById('tabs');
  tabs.parentNode.insertBefore(control,tabs);
  function apply(next){
    mode=next==='professional'?'professional':'simple';
    document.body.classList.toggle('hm-reading-simple',mode==='simple');
    document.body.classList.toggle('hm-reading-professional',mode==='professional');
    control.querySelectorAll('button').forEach(b=>{
      const active=b.dataset.reading===mode;
      b.setAttribute('aria-pressed',String(active));
      b.classList.toggle('selected',active);
    });
    control.querySelector('.hm-reading-description').textContent=mode==='simple'
      ? 'Главное о человеке — без подробных технических трактовок. Расчёт карты остаётся тем же.'
      : 'Все уровни разбора: активации, линии, полярности, классические тексты и детали системы.';
    try{localStorage.setItem(key,mode)}catch{}
  }
  control.addEventListener('click',e=>{
    const b=e.target.closest('button[data-reading]');
    if(b)apply(b.dataset.reading);
  });
  apply(mode);
})();
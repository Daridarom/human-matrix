const { computeChart } = require('free-human-design');
window.HumanMatrixEngine = {
  compute(input) {
    const chart = computeChart(input);
    const h = chart.humanDesign;
    const strategyByType = {
      Manifestor: 'Информировать перед действием',
      Generator: 'Ждать отклика',
      'Manifesting Generator': 'Ждать отклика и информировать',
      Projector: 'Ждать признания и приглашения',
      Reflector: 'Наблюдать лунный цикл'
    };
    return {
      type: h.type,
      strategy: strategyByType[h.type] || '—',
      authority: h.authority,
      profile: h.profile,
      definitionCount: h.definitionCount,
      definedCenters: h.definedCenters,
      openCenters: h.openCenters,
      channels: h.definedChannels,
      gates: h.activatedGates,
      meta: chart._meta || null
    };
  }
};

import { calculateChart } from 'hd-chart-engine';
const chart = calculateChart({date:'1989-03-26',time:'12:00',lat:60.1,lon:29.96,tz:'Europe/Moscow'});
if (chart.planets.sun.p.g !== 17) throw new Error('Unexpected personality Sun gate');
if (chart.planets.sun.d.g !== 58) throw new Error('Unexpected design Sun gate');
console.log('engine smoke ok', chart.planets.sun.p.g, chart.planets.sun.d.g, chart.precision.gate);

import {calculateChart} from 'hd-chart-engine';
const fixture={date:'1993-10-18',time:'01:30',tz:'America/Chicago',lat:0,lon:0};
const c=calculateChart(fixture);
if(c.planets.sun.p.g!==32) throw new Error(`Personality Sun gate: ${c.planets.sun.p.g}`);
if(c.planets.sun.d.g!==56) throw new Error(`Design Sun gate: ${c.planets.sun.d.g}`);
if(c.precision.gate!=='reliable') throw new Error(`Gate precision: ${c.precision.gate}`);
console.log('core smoke ok: P32 D56, gate reliable');

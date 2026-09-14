import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const context=vm.createContext({window:{},console,Date,Intl,Map,Set});
vm.runInContext(fs.readFileSync('dist/hd-core.js','utf8'),context);
const hd=context.window.HumanMatrixHD;
const input={date:'1989-03-26',time:'21:45',tz:'Europe/Moscow'};
const chart=hd.calculate(input);
// Independent transcription of the user-provided reference image, 13 rows.
const expectedP=[[17,3],[18,3],[43,5],[55,5],[59,5],[36,6],[25,6],[16,4],[20,3],[38,5],[58,2],[38,3],[1,2]];
const expectedD=[[58,5],[52,5],[47,4],[37,1],[40,1],[61,4],[5,4],[51,5],[8,3],[58,2],[10,4],[38,1],[1,2]];
Object.values(chart.raw.planets).forEach((v,i)=>{assert.deepEqual([v.p.g,v.p.l],expectedP[i]);assert.deepEqual([v.d.g,v.d.l],expectedD[i]);});
assert.equal(chart.hd.profile,'3/5');assert.equal(chart.hd.type,'Manifestor');assert.equal(chart.hd.authority,'Emotional');
assert.equal(chart.hd.channels.map(c=>c.key).join(','),'1-8,10-20,18-58,25-51,37-40');
// A second gate set transcribed from the pair example; no birth data inferred.
const b=hd.fromGates([45,26,49,39,38,16,2,18,50,57,34,11,32,47,22,52,48,59,14,44]);
const pair=hd.compare(chart.hd,b);
assert.equal(pair.electromagnetic.map(c=>c.key).join(','),'10-34,10-57,20-34,20-57,39-55');
assert.equal(pair.compromise.map(c=>c.key+':'+c.owner).join(','),'16-48:B,18-58:A');
assert.equal(pair.companionship.length,0);assert.equal(pair.dominance.length,7);
const combined=hd.fromGates([...chart.hd.gates,...b.gates]);assert.equal(combined.definedCenters.length,7);assert.equal(combined.openCenters.length,2);
const reverse=hd.compare(b,chart.hd);assert.equal(reverse.compromise.map(c=>c.key+':'+c.owner).join(','),'16-48:A,18-58:B');
assert.equal(hd.compare(chart.hd,chart.hd).companionship.length,5);
assert.equal(hd.compare(hd.fromGates([1]),hd.fromGates([8])).electromagnetic.length,1);
assert.equal(hd.fromGates([1]).definedCenters.length,0);
assert.equal(hd.fromGates([1]).completelyOpenCenters.length,8);
assert.equal(hd.fromGates([1,8,3,60]).definitionGroups.length,2);
for(const bad of [{date:'2025-02-29'},{date:'1799-12-31'},{time:'24:01'},{time:''},{tz:'Atlantis/Nowhere'}])assert.throws(()=>hd.calculate({...input,...bad}));
assert.throws(()=>hd.calculate({date:'2026-03-29',time:'02:30',tz:'Europe/Berlin'}),/не было/);
assert.throws(()=>hd.calculate({date:'2026-10-25',time:'02:30',tz:'Europe/Berlin'}),/дважды/);
const utc=hd.calculate({date:'1989-03-26',time:'17:45',tz:'UTC'});assert.equal(JSON.stringify(utc.raw.planets),JSON.stringify(chart.raw.planets));
const tr=hd.transit({date:'2026-09-14',time:'12:00',tz:'UTC'});assert.equal(tr.hd.activations.length,13);assert.equal(tr.hd.profile,null);assert(tr.hd.activations.every(x=>x.side==='personality'));
const later=hd.transit({date:'2026-09-15',time:'12:00',tz:'UTC'});assert.notEqual(JSON.stringify(tr.raw.planets),JSON.stringify(later.raw.planets));
vm.runInContext(fs.readFileSync('src/readings.js','utf8')+';window.text=HD_TEXT;',context);
vm.runInContext(fs.readFileSync('src/bodygraph.js','utf8')+';window.graph=GRAPH;',context);
assert.equal(Object.keys(context.window.graph.gates).length,64);
for(let gate=1;gate<=64;gate++){assert(context.window.graph.gates[gate]);assert(context.window.text.gates[gate]);}
for(const ch of hd.CHANNELS){assert(context.window.text.channels[ch.key]);assert(ch.gates.every(g=>context.window.graph.gates[g]));}
console.log('Reference regression passed: 26 activations, 3/5 Manifestor, pair 7–2, 5 electromagnetic / 2 compromise / 7 dominance; dates, DST, transit, geometry and interpretation coverage.');

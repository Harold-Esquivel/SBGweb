import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

for (const host of ['sbgprofesores-70c64.web.app', 'sbgprofesores-70c64.firebaseapp.com']) {
  for (const file of ['index.html', 'dashboard.html']) {
    const response = await fetch(`https://${host}/${file}`, { headers: { 'Cache-Control': 'no-cache' } });
    assert.equal(response.status, 200, `${host}/${file}: HTTP ${response.status}`);
    const live = Buffer.from(await response.arrayBuffer());
    assert.ok(live.equals(readFileSync(file)), `${host}/${file}: el archivo publicado difiere del local`);
  }
}
console.log('Hosting: index.html y dashboard.html coinciden en ambos dominios');

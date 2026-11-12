import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SourceTextModule } from 'node:vm';

for (const file of ['index.html', 'dashboard.html']) {
  const html = readFileSync(file, 'utf8');
  const scripts = [...html.matchAll(/<script\s+type="module"\s*>([\s\S]*?)<\/script>/g)];
  assert.ok(scripts.length > 0, `${file}: falta el módulo JavaScript`);
  for (const [index, match] of scripts.entries()) {
    new SourceTextModule(match[1], { identifier: `${file}#${index + 1}` });
  }
}

const dashboard = readFileSync('dashboard.html', 'utf8');
for (const id of [
  'newUserRole', 'newUserName', 'newUserCodigo', 'newUserContacto',
  'newUserSalon', 'newUserApoderado', 'newUserPassword',
  'newUserPasswordConfirm', 'newUserEmailPreview'
]) {
  assert.ok(dashboard.includes(`id="${id}"`), `Falta el campo ${id}`);
}

const config = JSON.parse(readFileSync('firebase.json', 'utf8'));
assert.equal(config.hosting.public, '.');
console.log('Sintaxis de ambos módulos, formulario de cuentas y firebase.json: OK');

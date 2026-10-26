import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, dirname, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const port = Number(process.env.PORT || 3000);
const types = { '.html': 'text/html; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ttf': 'font/ttf' };
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const path = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (path !== root && !path.startsWith(root + sep)) {
      response.writeHead(403).end('Forbidden');
      return;
    }
    const content = await readFile(path);
    response.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream' });
    response.end(content);
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(port, () => console.log(`ANGLE: http://localhost:${port}`));

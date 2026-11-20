const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const types = { '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.html': 'text/html', '.txt': 'text/plain; charset=utf-8', '.pdf': 'application/pdf', '.json': 'application/json', '.woff': 'font/woff', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.ico': 'image/x-icon' };
module.exports = (directory = path.resolve(__dirname, '../dist')) => http.createServer((req, res) => {
  const root = path.resolve(directory);
  const requested = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/cv\/?/, '');
  let file = path.resolve(root, requested || 'index.html');
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  fs.readFile(file, (error, data) => {
    if (error) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
});

const http = require('http');
const route = require('./route.js');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  route.home(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

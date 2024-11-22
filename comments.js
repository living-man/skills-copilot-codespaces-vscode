// Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const comments = [];

const server = http.createServer((req, res) => {
    const parseUrl = url.parse(req.url, true);
    const pathName = parseUrl.pathname;
    if (pathName === '/') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('404 Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (pathName === '/comments' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(comments));
    } else if (pathName === '/comments' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const params = querystring.parse(body);
            comments.push(params.comment);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(comments));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000');
});
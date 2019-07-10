const jsdom = require('jsdom');
const { JSDOM } = jsdom;

global.window = new JSDOM(`
    <html>
    <head></head>
    <body></body>
    </html>
`).window;
global.document = global.window.document;
global.fetch = require('node-fetch');
/**
 *
 * @module test.main
 * Using JSDom, createElement can be tested in a node runtime, or perform server side rendering.
 *
 */

require('./setup');
const dist = require('../dist/the-weather');

const { Application, Search, Panel, sdk } = dist.namespace;

const app = new Application();

const html = app.template().outerHTML;
let results = '';

const expect = function (test, excuse) {
    if (test) {
        results += '.';
    } else {
        results += 'x';
        throw new Error(excuse);
    }
};

(async () => {
    expect(html.includes('<form'), 'did not contain form html');
    expect(html.includes('Weather Search Query'), 'did not contain title');
    expect(!sdk.data.report, 'report should be unset');
    await sdk.rest.query('London');
    app.panel.update();
    expect(app.element.outerHTML.includes('<span>London</span>'), 'app should have loaded london data');
    console.log(results);
})();



# HTML Converter CLI

#### Operation

Given an HTML string, the converter will use JSDOM to make the DOM API available for inspection.
It will then convert the node tree into a code format compatible with `nominal-create-element`
factory functions.

#### API

````js
const converter = require('nominal-create-element/curiosities/html-converter/lib/convert');

const myHtml = `

<div class="greeting">
    <span>Hello</span><span>World</span>
</div>

`.trim();
const output = converter(myHtml);
/*

div('greeting',
    span({},
        'Hello'
    )/*span*/,
    span({},
        'World'
    )/*span*/,
)/*div*/

*/
````

#### Examples

More complex examples can be seen in `cli.js` here and `test.html`.

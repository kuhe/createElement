# createElement

#### What?

Forgive the unoriginal module name, but this JavaScript is here to encourage you to use the browser native `document` interface,
rather than any attempt to brand itself.

A few principles here:

- (0) Save space, save bandwidth, save parse time.

For writing out HTML with attached events, the DOM API is so full-featured
there is no need for a template DSL or front end framework.

It's zero-bandwidth, closer to fast native code, isn't as hard to write as you might expect or have been told,
 and you retain full control of where and how often you rerender your tree.

- (1) There's no need for document query selectors

Avoid the class of errors caused by over or under-binding events, the need to match class/id/tag, or waiting
for your elements to appear on the document. Leave classNames for styling.

Bind events to elements created in memory, before they are attached to the document. Attach/append to the document
when you are ready to give an interactive element to the user, not to query or store intermediate application states.


#### Related Information

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement

https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

http://youmightnotneedjquery.com/


#### Import

```js
// CJS module style
const createElement = require('nominal-create-element');
const render = createElement.render;
const nominate = createElement.nominate;
```

```
// ESM style
import { createElement, nominate, render } from 'nominal-create-element/createElement.esm';
```

#### API

Although there is only one source file of 100 lines, here is the API:

```js
/**
 * A "component" here is any object that has an [element] property and a [template()] method.
 * @typedef {object} Component
 * @property {HTMLElement} element
 * @method {Function<HTMLElement>} template
 *
 * @example - this object implicitly implements the "Component" type.
 * {
 *    element: null,
 *    template: () => this.element = createElement('div');
 * }
 */

/**
 * Unsurprisingly, creates elements with document.createElement.
 *
 * @function createElement
 * @param {string} tag - name of the element type.
 * @param {string} [class_] - css class name.
 * @param {string|HTMLElement|HTMLElement[]} [body] - string elements to form the body.
 * @param {object} [properties] - map of attributes.
 * @returns {HTMLElement}
 *
 * Alternate signature:
 *     createElement(tag, properties, body)
 *
 * Where [class_] is expressed as 'class' or 'className' of [properties].
 */

/**
 * Redraw in place, by replacing the element with a new version of itself.
 * Accepts any object matching the Component type, because its element is replaced in place (via its parent node)
 * and the template method of the Component is used to generate the replacement.
 *
 * @function render
 * @param {Component} component
 */

/**
 * Generate a binding of createElement for the given tag.
 * This is used to give an HTML-like appearance to your document.createElement calls.
 *
 * @function nominate
 * @param {string} tag
 * @return {function<HTMLElement>}
 */
```

#### examples

Create an element with a `tag`, a css `class`, `body` and `attributes`.

```js
createElement('div', 'my-css-class', 'Hello, world', { id: 'my-div' });

// or

createElement('div', { id: 'my-div', class: 'my-css-class' }, 'Hello, world');
```

Via "nomination", hence the name of the module:

```js

const div = nominate('div');

div({ id: 'my-div' }, 'Hello, world');

div({}, 'Hello, world'); // no attributes.

```

Nest elements (you see where I'm going).
```js
const div = nominate('div');
const span = nominate('span');

const element = div('', [

    span('', 'Hello'),
    span('', 'World')

]);
```

Create a tree of elements. Attributes prefixed with `on` will be attached as events.

```js
const div = nominate('div');

/**
 * @type {HTMLElement} append me somewhere.
 */
const element = div('my-css-class', [

        div('', 'Hello'),
        div('', 'World')

    ], {

    id: 'my-div-id'
    onclick: () => {
        console.log('clicked');
    }

});

```

A todo list example.

Below is where the `Component` interface should start to make sense. As a reminder:

```js
/**
 * A "component" here is any object that has an element property and a template method.
 * @typedef {object} Component
 * @property {HTMLElement} element
 * @method {Function<HTMLElement>} template
 *
 * @example - this object implicitly implements the "Component" type.
 * {
 *    element: null,
 *    template: () => this.element = createElement('div');
 * }
 */
 ```

As long as you keep a reference (`element`) to your current element and a way to generate a new version of it (`template()`) from changes in your application state, _you_ control how often to re-render and where in your composed tree to do so.

```js
/**
 * Redraw in place.
 * @param {Component} component
 */
function render(component) {
    var element = component.element;
    element.parentNode.replaceChild(component.template(), element);
}
```

```js

import { nominate, render } from 'nominal-create-element/createElement.esm';

const div = nominate('div');
const li = nominate('li');
const ul = nominate('ul');
const form = nominate('form');
const input = nominate('input');

/**
 *
 * @implements Component
 *
 */
class Todo {

    constructor() {

        /**
         * @type {string[]}
         */
        this.list = [
            'add something to my todo list'
        ];

        /**
         * @type {HTMLElement}
         */
        this.input = null;

        /**
         * @type {HTMLElement}
         */
        this.element = null;
    }

    /**
     * @returns {HTMLElement}
     */
    template() {

        return this.element = div({}, [
            ul({}, this.list.map(item => li('', item))),
            form({
                 onsubmit: (e) => {
                     e.preventDefault();
                     this.list.push(this.input.value);
                     this.input.value = '';
                     render(this);
                 }
             }, this.input = input('', null, {
                placeholder: 'Enter to submit'
            }))
        ]);

    }

}

document.body.appendChild(new Todo().template());

```
### Test

`open test.html` in your browser.

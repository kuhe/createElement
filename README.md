# createElement

#### What?

Forgive the unoriginal module name, but this 'script is here to encourage you to use the browser native `document` interface,
rather than any attempt to brand itself.

A few principles here:

- (0) Save space, save bandwidth, save parse time.

For writing out HTML with attached events, the DOM API is so full-featured
there is no need for a template DSL or front end framework.

Take responsibility for every kilobyte you ship to your users.

The `lib` contains a handful of functions and is measured in bytes (~492 bytes with gzip/minify) rather than kilobytes.

- (1) There's no need for document query selectors.

Avoid the class of errors caused by over or under-binding events, the need to match class/id/tag, or waiting
for your elements to appear on the document. Leave classNames for styling.

Bind events to elements created in memory, before they are attached to the document. Attach/append to the document
when you are ready to give an interactive element to the user, not to query or store intermediate application states.

- (2) Components are still the way to go.

This is a rejection of front end frameworks, diff algorithms, even jQuery, but it is not a rejection of
component-based view architecture.

Even using the `document` API, you can still compose your views by a hierarchy of components.


#### Related Information

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement

https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

http://youmightnotneedjquery.com/

Similar to: https://github.com/hyperhype/hyperscript + https://github.com/ohanhi/hyperscript-helpers


#### Import

```js
// CJS module style
const createElement = require('nominal-create-element');
const render = createElement.render;
const nominate = createElement.nominate;
```

```
// ESM style, also available in TypeScript
import { createElement, nominate, render } from 'nominal-create-element/createElement.esm';
```

#### API

Although there is only one source file of 100 lines, here is the API:

```ts
function createElement(tag: string, ...body: body_t[]): HTMLElement;
function createElement(tag: string, className: string, ...body: body_t[]): HTMLElement;
function createElement(tag: string, attributes: { [key: string]: any|(() => void) }, ...body: body_t[]): HTMLElement;
```

You'll mostly use a partial binding of the `createElement` function with the tag already provided, via the
`nominate(string)` function.

```ts
type nominal_creator_t = {
    (...body: body_t[]): HTMLElement;
    (className: string, ...body: body_t[]): HTMLElement;
    (attributes: { [key: string]: any|(() => void) }, ...body: body_t[]): HTMLElement;
};
function nominate(tag: string): nominal_creator_t;
```

You can use the provided `render` function if you adhere to a certain component interface.

```ts
type component_t = {
    element: HTMLElement;
    template(): HTMLElement;
}
function render(component: component_t): void {
    var element = component.element;
    element.parentNode.replaceChild(component.template(), element);
}
```

#### examples

```js
const div = nominate('div');
const span = nominate('span');
```

Create a simple element.

```js
div(); // HTMLDivElement
```

Create an element with a css `class`.

```js
div('my-css-class');
```

Create an element with a css `class`, some body text and additional `attributes`.

```js
div({ id: 'my-css-id', class: 'my-css-class' }, 'my body text');
```

```js
div({}, 'Hello, world'); // no attributes.

```

Nest elements

```js
div(
    span('a', 'Hello'),
    span('b', 'World')
);
```

```js
form(
    { submit: () => { ... /* my handler here */ } }
    div(
        input({ placeholder: 'username' })
        input({ placeholder: 'password' })
        div(
            input({ type: 'checkbox', checked: '' }),
            span({}, 'Remember my username')
        )
    )
    button({ type: 'submit' }, 'Login')
)
```

And further on, something with more complexity:

A todo list example.

```js

import { nominate, render } from 'nominal-create-element/createElement.esm';

const div = nominate('div');
const li = nominate('li');
const ul = nominate('ul');
const form = nominate('form');
const input = nominate('input');
const h = n => nominate('h' + n);
const button = nominate('button');

/**
 *
 * @implements component_t
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

        /** @type {HTMLElement} */
        this.form = null;

        /** @type {HTMLElement} */
        this.input = null;

        /** @type {HTMLElement} */
        this.element = null;

    }

    /**
     * @returns {HTMLElement}
     */
    template() {

        // This is equivalent to the following HTML:
        const html = `
        <div style="margin: 25px; padding: 15px;">
            <h5>To Do List</h5>
            <ul>
                <li>add something to my todo list</li>
            </ul>
            <form>
                <input placeholder="Enter to submit">
                <button type="submit">Add</button>
            </form>
        </div>
        `;

        return this.element =
            div(
                { style: 'margin: 25px; padding: 15px;' },
                h(5)('', 'To Do List'),
                ul(this.list.map(item => li('', item))),
                this.form = form(
                    {
                        submit: (e) => {
                            e.preventDefault();
                            this.list.push(this.input.value);
                            this.input.value = '';
                            render(this);
                        }
                    },
                    this.input = input({
                        placeholder: 'Enter to submit'
                    }),
                    button({ type: 'submit' }, 'Add')
                )
            );

    }

}

var todo = new Todo();
document.body.appendChild(todo.template());

```
### Test

`open test.html` in your browser.

### Notes

The v1.x call signature of `div('css-class', [...children], { /*attrs*/ })` has been removed.

The v2.x call signature described above is

```ts
div('css-class', ...children);
// or
div({ class: 'css-class', ...attrs }, ...children);
```

Where the child elements can still be arbitrarily nested.

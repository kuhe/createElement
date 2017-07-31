# createElement

#### What?

Forgive the unoriginal module name, but this JavaScript is a directive to use the browser native `document` interface,
rather than any attempt to brand itself.

Two principles here:

- (0) Save space, save bandwidth

For writing out HTML with attached events, the DOM API should *not* be avoided in favor of frameworks or template DSLs.

It's zero-bandwidth, closer to fast native code, isn't as hard to write as you might expect, and you retain full
control of where on your tree and how often you rerender.

- (1) No need for selectors

Avoid the mistake of over or under-binding events by not using selectors. Bind events to elements created in memory,
before they are attached to the document.

#### Import

```js
const createElement = require('nominal-create-element');
const render = createElement.render;
const nominate = createElement.nominate;
```

`import { createElement, nominate, render } from 'nominal-create-element';`

#### API

Although there is only one source file of 100 lines, here is the API:

```js
/**
 * A "component" here is any object that has an element property and a template method.
 * @typedef {object} Component
 * @property {HTMLElement} element
 * @method {Function<HTMLElement>} template
 */

/**
 * @interface Component
 * @property {HTMLElement} element
 * @method {Function<HTMLElement>} template
 */

/**
 * Creates elements zzz.
 *
 * @function createElement
 * @param {string} tag - name of the element type.
 * @param {string} [class_] - css class name.
 * @param {string|HTMLElement|HTMLElement[]} [body] - string elements to form the body.
 * @param {object} [properties] - map of attributes.
 * @returns {HTMLElement}
 *
 */

/**
 * Redraw in place.
 *
 * @function render
 * @param {Component} component
 */

/**
 * Generate a binding of createElement for the given tag.
 *
 * @function nominate
 * @param {string} tag
 * @return {function}
 */
```

#### examples

Create an element with a `tag`, a css `class`, `body` and `attributes`.

```js
createElement('div', 'my-css-class', 'Hello, world', { id: 'my-div' });
```

Create a tree of elements. Attributes prefixed with `on` will be attached as events.

```js
const div = nominate('div');

/**
 * @type {HTMLElement} append me somewhere.
 */
const template = div('my-css', [

        div('', 'Hello'),
        div('', 'World')

    ], {

    onclick: () => {
        console.log('clicked');
    }

});

```

A todo list example.

Create a tree of elements. Attributes prefixed with `on` will be attached as events.

```js
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
         * Inline example of one return statement.
         * @returns {HTMLElement}
         */
        templateInline() {

            return this.element = div('', [
                ul('', this.list.map(item => li('', item))),
                form('', this.input = input('', null, {
                    placeholder: 'Enter to submit'
                }), {
                    onsubmit: (e) => {
                        e.preventDefault();
                        this.list.push(this.input.value);
                        this.input.value = '';
                        render(this);
                    }
                })
            ]);

        }

        /**
         * Broken out into variables.
         * @returns {HTMLElement}
         */
        template() {

            this.input = input('', null, {
                placeholder: 'Enter to submit'
            });

            const list_ = ul('', this.list.map(item => li('', item)));
            const form_ = form('', this.input, {
                onsubmit: (e) => {
                    e.preventDefault();
                    this.list.push(this.input.value);
                    this.input.value = '';
                    render(this);
                }
            });

            this.element = div('', [
                list_,
                form_
            ]);

            return this.element;

        }

    }

    document.body.appendChild(new Todo().template());

```
### Test

`open test.html` in your browser.

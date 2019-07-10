# createElement

```tsx
// tsx
<div click={() => alert('clack')}>
    <span>hello</span>,
    <span>world</span>
</div> 
// -> native HTMLDivElement
```

#### What?

This is a JSXFactory function that outputs `HTMLElement`, having no lifecycle methods nor virtual DOM.

Here are a handful of functions that utilize `document.createElement`, `#setAttribute`, `#addEventListener`, and `#replaceChild` to allow a `jsx|tsx` compatible interface for generating native `HTMLElement`s. 

Similar in principle to [Preact](https://preactjs.com/), this module is here to encourage you to use the most minimal abstraction over the the browser native `document` interface as possible.


A few principles here:

- (0) Save space, save bandwidth, save parse time.

For writing out HTML with attached events, the DOM API is so full-featured
there is no need for a template DSL or front end framework.

Take responsibility for every kilobyte you ship to your users.

The `lib` contains a handful of functions and is measured in bytes rather than kilobytes.

- (1) Components are still the way to go.

Components accurately mirror the tree structure of the `document`, and your data and rendering flow should always keep that structure in mind.

Even using the `document` API, you can still compose your views by a hierarchy of components.


#### Related Information

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement

https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

http://youmightnotneedjquery.com/

Similar to: https://github.com/hyperhype/hyperscript + https://github.com/ohanhi/hyperscript-helpers


#### Import

```
// ESM style, also available in TypeScript
import { createElement, render } from 'nominal-create-element/createElement.esm';
import { component_t } from 'nominal-create-element/createElement.esm'; // typescript-only types

// in JSX either alias `createElement` to your assumed JSXFactory, 
// or in TypeScript designate `createElement` as the JSXFactory.
```

#### API

##### createElement

```typescript jsx
// JSX syntax will automatically use `createElement`, which follows the 
// standard JSXFactory signature.
<div style={{color: 'black'}} click={() => {}}>
    Hello, world
</div>
// -->
createElement(
    'div', 
    { style: {color: 'black'}, click: () => {} }, 
    'Hello, world'
)
```

##### render
You can also use the provided `render` function if you adhere to the component interface below.
Render uses `HTMLElement.replaceChild`.

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

A todo list example.

```js

import { createElement, render } from 'nominal-create-element/createElement.esm';

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

### Example with `TypeScript` + `Rollup`

Found in `./curiosities/typescript-example`.

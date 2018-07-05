/**
 * A "component" here is any object that has an element property and a render method.
 * The render method should provide an HTMLElement which is assigned to the element property.
 *
 * The main reason being that the #render(component_t) function also provided here uses both fields
 * to perform a swap in the DOM tree node.
 */
export type component_t = {
    element: HTMLElement;
    template(): HTMLElement;
}

export type nested_t<T> = T|T[]|T[][]|T[][][]|T[][][][];

export type body_t = string|nested_t<HTMLElement>;

/**
 * This is the returned function type from the #nominate(string) function.
 */
export type nominal_creator_t = {
    (...body: body_t[]): HTMLElement;
    (className: string, ...body: body_t[]): HTMLElement;
    (attributes: { [key: string]: any|(() => void) }, ...body: body_t[]): HTMLElement;
};

/**
 *
 * Creates elements zzz.
 *
 * @param tag - name of the element type.
 * @example div
 *      createElement('div'); // equivalent to document.createElement('div');
 *
 * @param [classNameOrAttributes] - css class name or an object of attributes.
 * @example class
 *      createElement('div', 'my-css-class');
 * @example attributes
 *      createElement('div', {
 *          click: function (event) {}; // event listeners use their event name as key.
 *          id: 'my-css-id',
 *          role: 'button'
 *      });
 *
 *
 * @param [body] - string or elements to form the body.
 *        This is a rest parameter, and you may provide any of the following:
 *
 * @example one string
 *      createElement('div', {}, 'body content string');
 *
 * @example one or more HTMLElements or nested arrays thereof
 *
 *      createElement('div', {},
 *          div(), div(), null, div(), [div(), div(), [div(), div()]]
 *      );
 *      // the nested elements will all be normalized to a flat array of child nodes,
 *      // and falsy values will be ignored.
 *
 */
function createElement(tag: string, ...body: body_t[]): HTMLElement;
function createElement(tag: string, className: string, ...body: body_t[]): HTMLElement;
function createElement(tag: string, attributes: { [key: string]: any|(() => void) }, ...body: body_t[]): HTMLElement;
function createElement(tag, classNameOrAttributes/*, ...body*/) {

    var i = 2;
    var _c = classNameOrAttributes;
    var props;
    var className = _c || '';
    _c = _c || '';
    if (typeof _c === 'object') {
        if ('innerHTML' in _c || 'length' in _c) {
            --i;
            className = '';
        } else {
            props = _c;
            className = props.class || props.className || '';
            delete props.class;
            delete props.className;
        }
    }

    var el = document.createElement(tag);

    if (className) el.className = className;

    for (var k in props || {}) {
        var v = props[k];
        if (typeof v === 'function') {
            el.addEventListener(k, v);
            continue;
        }
        el.setAttribute(k, v);
    }

    if (typeof arguments[i] in { string: 0, number: 0 }) {
        el.innerHTML = arguments[i];
    } else {
        for (; i < arguments.length; ++i) {
            var children = flatten(arguments[i]);
            for (var j = 0; j < children.length; ++j) {
                el.appendChild(children[j]);
            }
        }
    }

    return el;

}

/**
 * Redraw in place.
 */
function render(component: component_t): void {
    var element = component.element;
    element.parentNode.replaceChild(component.template(), element);
}

/**
 * @private
 */
function flatten(arr: nested_t<HTMLElement>): HTMLElement[] {

    if (
        typeof arr !== 'object' ||
        !('length' in arr) ||
        ('innerHTML' in arr)
    ) {
        if (arr) {
            return [arr];
        }
        return [];
    }

    var out = [];

    var i = 0;
    for (; i < (<any[]>arr).length; ++i) {
        var item = arr[i];
        if (
            (typeof item === 'object') &&
            ('length' in item) &&
            !('innerHTML' in item)
        ) {
            Array.prototype.push.apply(out, flatten(<any>item));
        } else if (item) {
            out.push(item);
        }
    }

    return out;

}

/**
 * This creates a binding of createElement for a particular tag name.
 * @example
 *  var div = nominate('div');
 *  var span = nominate('span');
 *  div(
 *    span()
 *  ) // returns an HTMLDivElement containing a span.
 *
 * @public
 */
function nominate(tag: string): nominal_creator_t {
    return createElement.bind(null, tag);
}

export {
    nominate,
    createElement,
    render
};

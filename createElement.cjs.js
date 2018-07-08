/**
 * A "component" here is any object that has an element property and a render method.
 * The render method should provide an HTMLElement which is assigned to the element property.
 *
 * The main reason being that the #render(component_t) function also provided here uses both fields
 * to perform a swap in the DOM tree node.
 *
 * @typedef {object} component_t
 * @property {HTMLElement|null} element
 * @method {Function<HTMLElement>} template
 */


/**
 *
 * Creates elements zzz.
 *
 * @param {string} tag - name of the element type.
 * @example div
 *      createElement('div'); // equivalent to document.createElement('div');
 *
 * @param {string} [classNameOrAttributes=''] - css class name or an object of attributes.
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
 * @param {string|HTMLElement|HTMLElement[]} [body] - string or elements to form the body.
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
 * @returns {HTMLElement}
 *
 */
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

    for (; i < arguments.length; ++i) {
        var children = flatten(arguments[i]);
        for (var j = 0; j < children.length; ++j) {
            var child = children[j];
            if (typeof child === 'string' || typeof child === 'number') {
                el.innerHTML += arguments[i];
            } else {
                el.appendChild(child);
            }
        }
    }

    return el;

}

/**
 * Redraw in place.
 * @param {component_t} component
 */
function render(component) {
    var element = component.element;
    element.parentNode.replaceChild(component.template(), element);
}

/**
 * @private
 * @param {*} arr - possibly nested array.
 * @returns {*[]}
 */
function flatten(arr) {

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
    for (; i < arr.length; ++i) {
        var item = arr[i];
        if (
            (typeof item === 'object') &&
            ('length' in item) &&
            !('innerHTML' in item)
        ) {
            Array.prototype.push.apply(out, flatten(item));
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
 * @param {string} tag
 * @return {function<HTMLElement>}
 */
function nominate(tag) {
    return createElement.bind(null, tag);
}

createElement.createElement = createElement;
createElement.nominate = nominate;
createElement.render = render;

module.exports = createElement;

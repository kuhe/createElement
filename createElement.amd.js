/**
 *
 * I'm not going to test whether this works. AMD support is an afterthought.
 *
 */
define('nominal-create-element', function (require, exports, module) {

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
     *
     * Creates elements zzz.
     *
     * @param {string} tag - name of the element type.
     * @param {string} [class_] - css class name.
     * @param {string|HTMLElement|HTMLElement[]} [body] - string elements to form the body.
     * @param {object} [properties] - map of attributes.
     * @returns {HTMLElement}
     *
     */
    function createElement(tag, class_, body, properties) {

        var element = document.createElement(tag);

        element.className = class_ || '';

        var key;
        for (key in properties || {}) {
            var value = properties[key];
            if (key.slice(0, 2) === 'on') {
                element.addEventListener(key.slice(2), value);
                continue;
            }
            element.setAttribute(key, value);
        }

        if (typeof body in { string: true, number: true }) { // primitives.
            element.innerHTML = body;
        } else if (body) { // arrays of things or HTMLElement.
            var children = flatten(body);
            for (var i = 0; i < children.length; ++i) {
                var child = children[i];
                element.appendChild(child);
            }
        }

        return element;

    }

    /**
     * Redraw in place.
     * @param {Component} component
     */
    function render(component) {
        var element = component.element;
        element.parentNode.replaceChild(component.template(), element);
    }

    /**
     * @private
     * @param {*} array - possibly nested array.
     * @returns {*[]}
     */
    function flatten(array) {

        if (!(array instanceof Array)) {
            return [array];
        }

        var out = [];

        var i = 0;
        for (; i < array.length; ++i) {
            var item = array[i];
            if (item instanceof Array) {
                Array.prototype.push.apply(out, flatten(item));
            } else {
                out.push(item);
            }
        }

        return out;
    }

    /**
     * @param {string} tag
     * @return {function} binding of createElement for the given tag.
     */
    var nominate = function (tag) {
        return createElement.bind(null, tag);
    };

    module.exports = createElement;

    createElement.createElement = createElement;
    createElement.nominate = nominate;
    createElement.render = render;

});
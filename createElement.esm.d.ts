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

export type body_t = string|number|nested_t<HTMLElement>;

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
declare function createElement(tag: string, ...body: body_t[]): HTMLElement;
declare function createElement(tag: string, className: string, ...body: body_t[]): HTMLElement;
declare function createElement(tag: string, attributes: { [key: string]: any|(() => void) }, ...body: body_t[]): HTMLElement;

/**
 * Redraw in place.
 */
declare function render(component: component_t): void;

/**
 * @private
 */
declare function flatten(arr: nested_t<HTMLElement>): HTMLElement[];

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
declare function nominate(tag: string): nominal_creator_t;

export {
    nominate,
    createElement,
    render
};

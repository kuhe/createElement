import {component_t, createElement} from './renderer';
import {Search} from './form/search';
import {Panel} from './search-result/panel';

/**
 *
 * This will be our overall root container, composed of subordinate components.
 *
 * Using the component_t interface from the createElement library,
 * we ensure that each component object can generate its subtree elements with consistency and
 * a well-defined scope of responsibility.
 *
 */
export class Application implements component_t {

    public element: HTMLElement;

    public panel = new Panel();
    public search = new Search(this.panel);

    /**
     * Each component has a parameter-less template function, which is used to
     * (re)render as needed.
     */
    public template(): HTMLElement {

        return this.element =
            <div class="col-md-4">
                {this.search.template()}
                {this.panel.template()}
            </div>;

    }

}

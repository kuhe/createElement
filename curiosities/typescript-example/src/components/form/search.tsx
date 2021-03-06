import {component_t, createElement} from '../renderer';
import {sdk} from '../../sdk/sdk';
import {Panel} from '../search-result/panel';

/**
 *
 * Takes user input for the search query.
 *
 */
export class Search implements component_t {

    public element: HTMLElement = null;
    private input: HTMLInputElement = null;

    public constructor(private panel: Panel) {
    }

    public template(): HTMLElement {
        return this.element =
            <form submit={(e: Event) => {
                            e.preventDefault();
                            if (!this.formValid()) {
                                return;
                            }
                            sdk.rest.query(this.input.value)
                                .then(() => this.panel.update())
                                .catch(console.error);
                        }}>
                <div class="form-group">
                    <label for="query">
                        Weather Search Query
                    </label>
                    {this.input = <input type="text" id="query"
                                         placeholder="e.g. New York City"
                                         className="form-control"/>}
                    <button class="btn btn-primary" type="submit">
                        Search
                    </button>
                </div>
            </form>
    }

    private formValid(): boolean {
        return Boolean(this.input.value);
    }

}

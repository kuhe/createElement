import {button, component_t, div, form, input, label} from '../renderer';
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
            form(
                {
                    submit: (e: Event) => {
                        e.preventDefault();
                        if (!this.formValid()) {
                            return;
                        }
                        sdk.rest.query(this.input.value)
                            .then(() => this.panel.update())
                            .catch(console.error);
                    }
                },
                div(
                    'form-group',
                    label({for: 'query'}, 'Weather Search Query'),
                    this.input = <HTMLInputElement>input({
                        id: 'query',
                        type: 'text',
                        class: 'form-control',
                        placeholder: 'e.g. New York City'
                    })
                ),
                button({type: 'submit', class: 'btn btn-primary'}, 'Search')
            );
    }

    private formValid(): boolean {
        return Boolean(this.input.value);
    }

}
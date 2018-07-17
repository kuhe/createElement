import {Application} from './components/Application';
import {Panel} from './components/search-result/panel';
import {Search} from './components/form/search';
import {sdk} from './sdk/sdk';

/**
 *
 * Attach the application to the document body, aka bootstrap.
 *
 */
export function main(): number {
    window.document.body.appendChild(new Application().template());
    return 0;
}

export const namespace = {
    Application,
    Search,
    Panel,
    sdk
};

main();

import {component_t, div, li, render, span, ul} from '../renderer';
import {weather_report_t} from '../../sdk/rest';
import {data} from '../../sdk/data';

/**
 *
 * Will show the output of the current search.
 *
 */
export class Panel implements component_t {

    public element: HTMLElement = null;

    public constructor(public report: weather_report_t = data.report) {
    }

    /**
     * Re-render in place with a new report.
     */
    public update(report: weather_report_t = data.report) {
        this.report = report;
        render(this);
    }

    public template(): HTMLElement {

        if (!this.report) {
            return this.element = div({}, 'Perform a search to see results here.');
        }

        return this.element = div(
            div({},
                span({}, 'Location: '),
                span({}, this.report.name)
            ),
            div({},
                span({}, 'Temperature: '),
                span({}, this.report.main.temp)
            ),
            div({},
                span({}, 'Wind: '),
                span({}, this.report.wind.speed)
            ),
            div({},
                div({}, '(Forecast)'),
                ul({},
                    this.report.weather.map(w => {
                        return li({}, w.description);
                    })
                )
            )
        );

    }

}
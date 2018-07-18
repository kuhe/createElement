import {component_t, createElement, render} from '../renderer';
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
            return this.element =
                <div>
                    Perform a search to see results here.
                </div>;
        }

        return this.element =
            <div>
                <div>
                    <span>Location: </span>
                    <span>{this.report.name}</span>
                </div>
                <div>
                    <span>Temperature: </span>
                    <span>{this.report.main.temp}</span>
                </div>
                <div>
                    <span>Wind: </span>
                    <span>{this.report.wind.speed}</span>
                </div>
                <div>
                    <div>(Forecast)</div>
                    <ul>
                        {this.report.weather.map(w => {
                            return <li>{w.description}</li>
                        })}
                    </ul>
                </div>
            </div>;

    }

}

import {data} from './data';

export type weather_report_t = {
    'coord': { 'lon': number, 'lat': number },
    'weather': [{ 'id': number, 'main': string, 'description': string, 'icon': string }],
    'base': string,
    'main': { 'temp': number, 'pressure': number, 'humidity': number, 'temp_min': number, 'temp_max': number },
    'visibility': number,
    'wind': { 'speed': number, 'deg': number },
    'clouds': { 'all': number },
    'dt': number,
    'sys': { 'type': number, 'id': number, 'message': number, 'country': string, 'sunrise': number, 'sunset': number },
    'id': number,
    'name': string,
    'cod': number
};

export function query(q: string): Promise<weather_report_t> {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${q}&APPID=${'2b6797b5013328293adc22787b0b54d9'}`)
        .then(response => response.json())
        .then(json => {
            return data.report = <weather_report_t>json;
        })
        .catch(() => {
            return data.report = {
                'coord': {'lon': -0.13, 'lat': 51.51},
                'weather': [{'id': 300, 'main': 'Drizzle', 'description': 'light intensity drizzle', 'icon': '09d'}],
                'base': 'stations',
                'main': {'temp': 280.32, 'pressure': 1012, 'humidity': 81, 'temp_min': 279.15, 'temp_max': 281.15},
                'visibility': 10000,
                'wind': {'speed': 4.1, 'deg': 80},
                'clouds': {'all': 90},
                'dt': 1485789600,
                'sys': {
                    'type': 1,
                    'id': 5091,
                    'message': 0.0103,
                    'country': 'GB',
                    'sunrise': 1485762037,
                    'sunset': 1485794875
                },
                'id': 2643743,
                'name': 'London',
                'cod': 200
            };
        });
}

export const rest = {
    query
};

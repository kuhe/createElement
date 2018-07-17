import typescript from 'rollup-plugin-typescript2';

export default {
    input: './src/main.ts',
    output: {
        file: './dist/the-weather.js',
        format: 'umd',
        name: 'the-weather'
    },
    plugins: [
        typescript()
    ]
}
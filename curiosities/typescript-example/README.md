#### The Weather

This application provides a form for querying the OpenWeatherMap api for a given location.

It is provided as one example of how a larger application might be organized, featuring typescript, `tsx` (jsx), and unit testing with server side rendering.

```

/src
    /components - renders application data, maintains UI state
        Application.tsx - root component

    /sdk - view-agnostic, handles application logic and http api communication

    main.ts - bootstrap

```

Abandoning _frameworks_ doesn't mean abandoning modular organization, testability, or other good practices.
Just abandon the weight.

Examples of using the `nominal-create-element` public API:

`nominate (createElement)`: [renderer.ts](https://github.com/kuhe/createElement/blob/master/curiosities/enterprisey-example/src/components/renderer.ts#L11-L20)

`render`: [panel.ts](https://github.com/kuhe/createElement/blob/master/curiosities/enterprisey-example/src/components/search-result/panel.tsx#L22)

`component_t`: [Application.ts](https://github.com/kuhe/createElement/blob/master/curiosities/enterprisey-example/src/components/Application.tsx#L14)

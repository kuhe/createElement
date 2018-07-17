#### The Weather

This application provides a form for querying the OpenWeatherMap api for a given location.

It is provided as one example of how a larger application might be organized.

```

/src
    /components - renders application data, maintains UI state
        Application.ts - root component

    /sdk - view-agnostic, handles application logic and http api communication

    main.ts - bootstrap

```

Abandoning _frameworks_ doesn't mean abandoning modular organization, testability, or other good practices.
Just abandon the weight.

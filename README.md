### Description

This repo holds common UI components for building dashboards in Panther Labs. It's
work in progress and proper semver support will be added soon enough.

### Installation

To install the library, make sure you have proper access to the Panther Lab's
github account from the environment that the `npm install` command is running. If you don't
have the proper credentials set up in your environment, then `npm install` will fail
since this is a private repository which requires a certain access.

```text
    npm install git://github.com/panther-labs/pounce.git
```

### Usage

To use the library you'll first need a `<ThemeProvider>` component in order to pass the
theme down to the components that use it. The recommendation is the `styled-components` library that
Pounce uses internally, but feel free to use `emotion` as well. (If you utilise the `styled-components` library, make sure you install v5 available [here](https://github.com/styled-components/styled-components/releases/tag/v5.0.0-beta.8)
, since it has a reduced bundle size and a faster runtime.)

Make sure to wrap your entire app with a `<ThemeProvider>` and the default `Theme` that Pounce exposes like so:

```text
import { ThemeProvider } from 'styled-components';
import { Theme } from 'pounce'

const App = () => (
    <ThemeProvider theme={Theme}>
       <Router>
         ...
       </Router
    </ThemeProvider>
)

```

In order for some global styles to take effect, you will need to also include a special
components that holds some globally applied CSS to override the default one that comes from
the browser. All that is exposed in a component named `GlobalStyles`. Include it _somewhere_ inside
your app below the `ThemeProvider` (since it reads the theme as well). For example, extending the example above:

```text
import { ThemeProvider } from 'styled-components';
import { Theme, GlobalStyles } from 'pounce'

const App = () => (
    <ThemeProvider theme={Theme}>
       <GlobalStyles />
       <Router>
         ...
       </Router
    </ThemeProvider>
)

```

from the on you can simply import any modules directly from `pouncejs`. For example

```text
import { Box, Button } from 'pouncejs';
```

**Important:** Pounce doesn't come with any font-family since it's font-agnostic, but you should make sure to install
Roboto in the project. To do that, just include a `<link>` tag with the following `rel` value

`https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap`

### Documentation

In order to know the names of the exposed components and to see their documentation,
you should clone the project locally and run it's `start` command. This will spin up
a local server that is going to showcase you the docs. To do that type the following:

```text
    git clone git@github.com:panther-labs/pounce.git
    cd pounce
    npm run start
```

### Deployment

When deploying a project with pounce, you will have to make sure that the CI that builds
the project (most likely Codebuild) has access to the organisation's github repo. This is
most likely already happening, but bear that in mind regardless.

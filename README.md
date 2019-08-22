[![CircleCI](https://circleci.com/gh/panther-labs/pounce/tree/master.svg?style=svg)](https://circleci.com/gh/panther-labs/pounce/tree/master)

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

To use the library you'll need to wrap your app with the `<ThemeProvider>` so that your
components can have access to the theme. By default `<ThemeProvider>` utilises the default Theme
that Pounce exposes, but you can easily override that by passing a `theme` prop to it.

Make sure to wrap your **entire** app with a `<ThemeProvider>` like so:

```text
import { ThemeProvider } from 'pouncejs';

const App = () => (
    <ThemeProvider>
       <Router>
         ...
       </Router
    </ThemeProvider>
)

```

from the on you can simply import any modules directly from `pouncejs`. For example:

```text
import { Box, Button } from 'pouncejs';
```

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

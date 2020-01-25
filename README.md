# Pounce: A Set of Composable React Primitives for Building UI Dashboards

[![CircleCI](https://circleci.com/gh/panther-labs/pounce/tree/master.svg?style=svg)](https://circleci.com/gh/panther-labs/pounce/tree/master)

## Description

This project contains common UI components for building dashboards written in TypeScript.

**It is currently a work in progress**, and proper [SemVer](http://semver.org/) support will be added soon.

Documentation is available on [http://pouncejs.surge.sh/](http://pouncejs.surge.sh/).

## Installation

```text
$ npm install github:panther-labs/pounce
```

To install a specific version:

```text
$ npm install github:panther-labs/pounce#v0.2.0
```

## Usage

### Quick Start

1. To start, wrap your app with the `ThemeProvider` components:

```jsx
import { ThemeProvider } from 'pouncejs';

const App = () => (
    <ThemeProvider>
       <Router>
         ...
       </Router
    </ThemeProvider>
)
```

2. Install Roboto:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
/>
```

3.  Then you are ready to go!

```js
import { Box, Button } from 'pouncejs';
```

### Advanced

To use the library you'll need to wrap your app with the `<ThemeProvider>` so that your
components can have access to the theme. By default `<ThemeProvider>` utilises the default Theme
that Pounce exposes, but you can easily override that by passing a `theme` prop to it.

This can be done like so:

```jsx
import { ThemeProvider } from 'pouncejs';
import theme from '../my/theme.js';

const App = () => (
    <ThemeProvider theme={theme}>
       <Router>
         ...
       </Router
    </ThemeProvider>
)
```

Make sure to wrap your **entire** app with a `<ThemeProvider>` to avoid un-necessary reconsiliations
and to gain in performance.

The next step would be to make sure you have your selected font-family installed. By default,
Pounce uses `Roboto` as it fits the default theme the best. If you are using the default theme,
make sure you install Roboto in your prefered way. The easiest of them all is by adding
a link tag in your html:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
/>
```

If you want to use another font-family, simply install it and make sure to mimic this
change in the `theme` that you will provide to `<ThemeProvider />`. The change that
you need to make is in the `fonts.primary` key of the theme. For example:

```js
import { defaultTheme } from 'pouncejs';

export const myTheme = {
  ...defaultTheme,
  fonts: {
    ...defaultTheme.fonts,
    primary: 'Lato, sans-serif',
  },
};
```

This way you can keep all the defaults and only change the `font-family` exposed. You can also
add keys to the theme if you want to have a centralised theme configuration that can also be used
outside the context of pounce:

```js
import { defaultTheme } from 'pouncejs';

export const myTheme = {
  ...defaultTheme,
  fonts: {
    ...defaultTheme.fonts,
    secondary: 'Inconsolata, monospace',
  },
};
```

### Performance

Pounce is on its testing phase right now, which means that the performance is not optimized and the
bundle size is not a core pillar of the development since it relies on 3rd-party packages for some
of its modules.

There is a plan to gradually migrate those away and to focus on the performance of the actual lib.

As it stands, it utilizes the latest `@emotion/xxx @ 10.x.x` internally, so if you are using a CSS-in-JS
library in your project, it would be recommended to utilize the same library at a similar major
version in order to not have two separate versions of a CSS-in-JS library in your project

## License

[Apache](https://choosealicense.com/licenses/apache-2.0/)

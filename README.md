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

### Quick Start

1. Wrap your app with the `ThemeProvider` components:

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

3.  Ready to go!

```js
import { Box, Button } from 'pouncejs';
```

### Advanced Usage

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

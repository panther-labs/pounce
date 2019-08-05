### Description

This repo holds common UI components for building dashboards in Panther Labs. It's
work in progress and proper semver support will be added soon enough.

### Installation

To install the library, make sure you have proper access to the Panther Lab's
github account from the environment that the `npm install` command is running. If you don't
have the proper credentials set up in your environment, then `npm install` will fail
since this is a private repository which requires a certain access.

```text
    npm install git+https://github.com/panther-labs/pounce.git
```

### Usage

To use the library you can simply import all its modules directly from
`pouncejs`. For example

```text
import { Box, Button } from 'pouncejs';
```

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

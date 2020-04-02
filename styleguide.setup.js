import React from 'react';
import * as Pounce from './src';

global.React = React;
Object.entries(Pounce).forEach(([name, exported]) => (global[name] = exported));

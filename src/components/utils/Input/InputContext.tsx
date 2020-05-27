import React from 'react';
import { InputControlProps } from './InputControl';

export const InputContext = React.createContext<Required<InputControlProps>>({
  disabled: false,
  invalid: false,
  variant: 'outlined',
  required: false,
});

export const useInputContext = () => React.useContext(InputContext);

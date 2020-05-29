import React from 'react';
import { InputControlProps } from './InputControl';

export const InputContext = React.createContext<Required<InputControlProps>>({
  disabled: false,
  invalid: false,
  variant: 'outline',
  required: false,
});

export const useInputContext = () => React.useContext(InputContext);

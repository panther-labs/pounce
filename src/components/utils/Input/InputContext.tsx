import React from 'react';
import { InputControlProps } from './InputControl';

export const InputContext = React.createContext<InputControlProps>({
  variant: 'outline',
});

export const useInputContext = () => React.useContext(InputContext);

import React from 'react';
import { __DEV__ } from '../../utils/helpers';

export type AbstractButtonProps = React.ComponentProps<'button'>;

export const AbstractButton: React.FC<AbstractButtonProps> = ({ children }) => {
  return <button>{children}</button>;
};

export default AbstractButton;

if (__DEV__) {
  AbstractButton.displayName = 'AbstractButton';
}

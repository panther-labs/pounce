import React from 'react';
import { PounceComponentProps } from '../../system';
import { __DEV__ } from '../../utils/helpers';

export type AbstractButtonProps<T extends React.ElementType = any> = PounceComponentProps<T>;

export const AbstractButton = React.forwardRef<HTMLElement, AbstractButtonProps>(
  function AbstractButton({ children }) {
    return <button>{children}</button>;
  }
);

export default AbstractButton;

if (__DEV__) {
  AbstractButton.displayName = 'AbstractButton';
}

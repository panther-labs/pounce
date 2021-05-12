import React from 'react';
import { PounceComponentProps } from '../../system';
import { __DEV__ } from '../../utils/helpers';

export type AbstractButtonProps<T extends React.ElementType = any> = PounceComponentProps<T>;

export const AbstractButton = React.forwardRef<HTMLButtonElement, AbstractButtonProps>(
  function AbstractButton({ children }, ref) {
    return <button ref={ref}>{children}</button>;
  }
);

export default AbstractButton;

if (__DEV__) {
  AbstractButton.displayName = 'AbstractButton';
}

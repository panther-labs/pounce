import React from 'react';
import { pounce } from '../../system';
import { __DEV__ } from '../../utils/helpers';

export type AbstractButtonProps = React.ComponentProps<typeof AbstractButton>;

export const AbstractButton = pounce('button');

// The component should render a button by default, with some default styles
AbstractButton.defaultProps = {
  type: 'button',
  cursor: 'pointer',
  color: 'white-200' as const,
  textDecoration: 'none',
  backgroundColor: 'transparent' as const,
  transition: 'all 0.1s linear',
};

export default AbstractButton;

if (__DEV__) {
  AbstractButton.displayName = 'AbstractButton';
}

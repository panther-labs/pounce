import React from 'react';
import PseudoBox, { PseudoBoxProps } from '../PseudoBox';

export type AbstractButtonProps = PseudoBoxProps;

const abstractButtonStyle = {
  type: 'button',
  cursor: 'pointer',
  textDecoration: 'none',
  backgroundColor: 'transparent' as const,
  transition: 'all 0.1s linear',
  _disabled: {
    opacity: 0.3,
    pointerEvents: 'none' as const,
    cursor: 'default',
  },
};

const AbstractButton: React.FC<AbstractButtonProps> = React.forwardRef(function AbstractButton(
  props,
  ref
) {
  return <PseudoBox as="button" ref={ref} {...abstractButtonStyle} {...props} />;
});

export default AbstractButton;

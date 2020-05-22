import React from 'react';
import PseudoBox, { PseudoBoxProps } from '../PseudoBox';
import { disabledStyles } from '../../utils/common';

export type AbstractButtonProps = PseudoBoxProps;

const abstractButtonStyle = {
  type: 'button',
  cursor: 'pointer',
  textDecoration: 'none',
  backgroundColor: 'transparent' as const,
  transition: 'all 0.1s linear',
  _disabled: disabledStyles,
};

const AbstractButton: React.FC<AbstractButtonProps> = React.forwardRef(function AbstractButton(
  props,
  ref
) {
  return <PseudoBox as="button" ref={ref} {...abstractButtonStyle} {...props} />;
});

export default AbstractButton;

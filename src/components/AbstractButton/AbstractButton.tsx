import React from 'react';
import PseudoBox, { PseudoBoxProps } from '../PseudoBox';
import { disabledStyles } from '../../utils/common';

export type AbstractButtonProps = PseudoBoxProps;

const abstractButtonStyle = {
  type: 'button',
  cursor: 'pointer',
  color: 'gray-50' as const,
  textDecoration: 'none',
  backgroundColor: 'transparent' as const,
  transition: 'all 0.1s linear',
  _disabled: disabledStyles,
};

const AbstractButton = React.forwardRef<HTMLButtonElement, AbstractButtonProps>(
  function AbstractButton(props, ref) {
    return <PseudoBox as="button" ref={ref} {...abstractButtonStyle} {...props} />;
  }
);

export default AbstractButton;

import React from 'react';
import PseudoBox from '../PseudoBox';
import { BoxProps } from '../Box';

const baseStyleProps = {
  transition: `all 0.15s ease-out`,
  cursor: 'pointer',
  textDecoration: 'none',
  outline: 'none',
  _hover: {
    textDecoration: 'underline',
  },
  _focus: {
    boxShadow: 'outline',
  },
  _disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    textDecoration: 'none',
  },
};

interface LinkProps extends BoxProps<React.AnchorHTMLAttributes<HTMLAnchorElement>> {
  /** Whether the link is external and should open in a new tab */
  external?: boolean;

  /** Whether the link should be disabled */
  disabled?: boolean;
}

const Link: React.FC<LinkProps> = React.forwardRef(function Link(
  { external, disabled, onClick, ...rest },
  ref
) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <PseudoBox
      as="a"
      ref={ref}
      tabIndex={disabled ? -1 : undefined}
      aria-disabled={disabled}
      onClick={disabled ? event => event.preventDefault() : onClick}
      {...externalProps}
      {...baseStyleProps}
      {...rest}
    />
  );
});

export default Link;

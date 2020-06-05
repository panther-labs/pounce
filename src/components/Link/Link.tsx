import React from 'react';
import PseudoBox from '../PseudoBox';
import { BoxProps } from '../Box';
import useLinkStyles from './useLinkStyles';

export interface LinkProps
  extends Omit<BoxProps<React.AnchorHTMLAttributes<HTMLAnchorElement>>, 'color'> {
  /** Whether the link is external and should open in a new tab */
  external?: boolean;

  /** The text style & color of the link */
  variant?: 'prominent' | 'neutral' | 'discreet';

  /** Whether the link should be disabled */
  disabled?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { external, disabled, variant, ...rest },
  ref
) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  const variantStyles = useLinkStyles({ variant });

  return (
    <PseudoBox
      as={disabled ? 'span' : 'a'}
      ref={ref}
      aria-disabled={disabled}
      {...externalProps}
      {...variantStyles}
      {...rest}
    />
  );
});

export default Link;

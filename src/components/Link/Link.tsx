import React from 'react';
import useLinkStyles from './useLinkStyles';
import { NativeAttributes, pounce, SystemProps } from '../../system';

export type LinkProps = SystemProps &
  NativeAttributes<'a'> & {
    /** Whether the link is external and should open in a new tab */
    external?: boolean;

    /** The text style & color of the link */
    variant?: 'prominent' | 'neutral' | 'discreet';

    /** Whether the link should be disabled */
    disabled?: boolean;
  };

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { external, disabled, variant, ...rest },
  ref
) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  const variantStyles = useLinkStyles({ variant });

  return (
    <pounce.a
      as={disabled ? 'span' : 'a'}
      aria-disabled={disabled}
      {...externalProps}
      {...variantStyles}
      {...rest}
      ref={ref}
    />
  );
});

export default Link;

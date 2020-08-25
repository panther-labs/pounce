import React from 'react';
import Icon, { IconProps } from '../Icon';
import useIconButtonStyles from './useIconButtonStyles';
import AbstractButton, { AbstractButtonProps } from '../AbstractButton';
import { NativeAttributes } from '../../system';

export interface IconButtonProps extends NativeAttributes<'button'> {
  /** The size of the icon button */
  size?: 'small' | 'large';

  /** The text associated with the icon button */
  'aria-label': string;

  /** The icon present on the button  */
  icon: IconProps['type'];

  /** The style of the icon button */
  variant?: 'solid' | 'ghost' | 'outline' | 'unstyled';

  /** The color scheme of the button for solid variants */
  variantColor?:
    | 'blue'
    | 'violet'
    | 'teal'
    | 'green'
    | 'orange'
    | 'red'
    | 'gray'
    | 'darkgray'
    | 'navyblue';

  /** Whether the button is disabled */
  disabled?: boolean;

  /** Whether the button should have a loading spinner next to it */
  loading?: boolean;

  /** Whether the button should always be marked as active. Helpful for menus. */
  active?: boolean;

  /** The underlying HTML element */
  as?: AbstractButtonProps['as'];
}

/** A wrapper that makes an <a href="/#/Icon">Icon<a> component be clickable */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variantColor = 'blue', active = false, variant = 'solid', size = 'large', icon, ...rest },
  ref
) {
  const styles = useIconButtonStyles({ variantColor, variant, size });

  return (
    <AbstractButton
      aria-pressed={active !== undefined ? active : undefined}
      data-active={active || undefined}
      {...styles}
      {...rest}
      ref={ref}
    >
      <Icon type={icon} size="small" display="block" />
    </AbstractButton>
  );
});

export default IconButton;

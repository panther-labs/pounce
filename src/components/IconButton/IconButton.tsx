import React from 'react';
import Icon, { IconProps } from '../Icon';
import useIconButtonStyles from './useIconButtonStyles';
import { BoxProps, NativeAttributes } from '../Box';
import AbstractButton from '../AbstractButton';

export interface IconButtonProps extends NativeAttributes<'button'>, Pick<BoxProps, 'as' | 'to'> {
  /** The size of the icon button */
  size?: 'small' | 'medium' | 'large';

  /** The text associated with the icon button */
  'aria-label': string;

  /** The icon present on the button  */
  icon: IconProps['type'];

  /** The style of the icon button */
  variant?: 'solid' | 'ghost' | 'outline' | 'unstyled';

  /** The color scheme of the button */
  variantColor?:
    | 'blue'
    | 'violet'
    | 'teal'
    | 'green'
    | 'orange'
    | 'red'
    | 'gray'
    | 'darkgray'
    | 'darkblue'
    | 'navyblue';

  /** The border style of the button  */
  variantBorderStyle?: 'square' | 'circle';

  /** Whether the button is disabled */
  disabled?: boolean;

  /** Whether the button should have a loading spinner next to it */
  loading?: boolean;

  /** Whether the button should always be marked as active. Helpful for menus. */
  active?: boolean;
}

/** A wrapper that makes an <a href="/#/Icon">Icon<a> component be clickable */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    variantColor = 'blue',
    variantBorderStyle = 'circle',
    active = false,
    variant = 'solid',
    size = 'large',
    icon,
    ...rest
  },
  ref
) {
  const styles = useIconButtonStyles({ variantColor, variant, variantBorderStyle, size });

  return (
    <AbstractButton
      aria-pressed={active !== undefined ? active : undefined}
      data-active={active || undefined}
      {...styles}
      {...rest}
      ref={ref}
    >
      <Icon type={icon} size={size} />
    </AbstractButton>
  );
});

export default IconButton;

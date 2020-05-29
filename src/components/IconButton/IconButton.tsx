import React from 'react';
import Icon, { IconProps } from '../Icon';
import useIconButtonStyles from './useIconButtonStyles';
import { ReactAttributes } from '../Box';
import AbstractButton from '../AbstractButton';

export type IconButtonProps = ReactAttributes<React.ButtonHTMLAttributes<HTMLButtonElement>> & {
  /** The text associated with the icon button */
  'aria-label': string;

  /** The icon present on the button  */
  icon: IconProps['type'];

  /** The style of the icon button */
  variant?: 'solid' | 'ghost';

  /** The color scheme of the button for solid variants */
  color?: 'blue' | 'violet' | 'teal' | 'green' | 'orange' | 'red' | 'gray' | 'darkgray';

  /** Whether the button is disabled */
  disabled?: boolean;

  /** Whether the button should have a loading spinner next to it */
  loading?: boolean;

  /** Whether the button should always be marked as active. Helpful for menus. */
  active?: boolean;
};

/** A wrapper that makes an <a href="/#/Icon">Icon<a> component be clickable */
export const IconButton: React.FC<IconButtonProps> = React.forwardRef(function IconButton(
  { color = 'blue', active = false, variant = 'solid', icon, ...rest },
  ref
) {
  const styles = useIconButtonStyles({ color, variant, active });

  return (
    <AbstractButton ref={ref} aria-pressed={active} {...styles} {...rest}>
      <Icon type={icon} size="small" display="block" />
    </AbstractButton>
  );
});

IconButton.defaultProps = {
  active: false,
};

export default IconButton;

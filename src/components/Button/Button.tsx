import * as React from 'react';
import AbstractButton from '../AbstractButton';
import { BoxProps, NativeAttributes } from '../Box';
import useButtonStyles from './useButtonStyles';
import Spinner from '../Spinner';
import Icon, { IconProps } from '../Icon';

export interface ButtonProps extends NativeAttributes<'button'>, Pick<BoxProps, 'as' | 'to'> {
  /** The size (height) of the button */
  size?: 'small' | 'medium' | 'large';

  /** The variant of the button that decides the colors */
  variant?: 'solid' | 'outline';

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

  /** The icon present on the button  */
  icon?: IconProps['type'];

  /** The side of the button in which the icon appears on. Defaults to `left`. */
  iconAlignment?: 'left' | 'right';

  /** Whether the button should occupy entirety of its parent. Defaults to `false` */
  fullWidth?: boolean;

  /** Whether the button is disabled */
  disabled?: boolean;

  /** Whether the button should have a loading spinner next to it */
  loading?: boolean;

  /** Whether the button should always be marked as active. Helpful for menus. */
  active?: boolean;
}

/**
 * Extends <a href="/#/Box">Box</a>
 *
 * The core re-usable button that you will use in the app.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    size = 'large',
    variant = 'solid',
    variantColor = 'blue',
    loading = false,
    fullWidth = false,
    iconAlignment = 'left',
    active,
    icon,
    children,
    ...rest
  },
  ref
) {
  const styles = useButtonStyles({ variantColor, variant, size });

  return (
    <AbstractButton
      aria-pressed={active !== undefined ? active : undefined}
      data-active={active || undefined}
      width={fullWidth ? '100%' : 'auto'}
      {...styles}
      {...rest}
      ref={ref}
    >
      {icon && iconAlignment === 'left' && !loading && (
        <Icon size="small" ml={-1} mr={2} type={icon} />
      )}
      {loading && <Spinner size="small" mr={2} />}
      {children}
      {icon && iconAlignment === 'right' && !loading && (
        <Icon size="small" mr={-1} ml={3} type={icon} />
      )}
    </AbstractButton>
  );
});

export default Button;

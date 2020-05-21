import * as React from 'react';
import { defaultButtonProps, primaryButtonProps, secondaryButtonProps } from './utils';
import AbstractButton, { AbstractButtonProps } from '../AbstractButton';

export interface ButtonProps extends AbstractButtonProps {
  /** The size of the button */
  size: 'small' | 'large';

  /** The variant of the button that decides the colors */
  variant: 'primary' | 'default' | 'secondary';
}

/**
 * Extends <a href="/#/Box">Box</a>
 *
 * The core re-usable button that you will use in the app.
 */
const Button: React.FC<ButtonProps> = React.forwardRef(function Button(
  { size, variant, children, ...rest },
  ref
) {
  const sizeProps = (() => {
    switch (size) {
      case 'small':
        return { px: 4, py: 2, fontSize: 'medium' as const };
      case 'large':
      default:
        return { px: 5, py: 4, fontSize: 'large' as const };
    }
  })();

  const variantProps = (() => {
    switch (variant) {
      case 'secondary':
        return secondaryButtonProps;
      case 'default':
        return defaultButtonProps;
      case 'primary':
      default:
        return primaryButtonProps;
    }
  })();

  return (
    <AbstractButton
      fontWeight="medium"
      borderRadius="pill"
      ref={ref}
      {...sizeProps}
      {...variantProps}
      {...rest}
    >
      {children}
    </AbstractButton>
  );
});

export default Button;

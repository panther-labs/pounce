import * as React from 'react';
import css from '@styled-system/css';
import BaseButton, { BaseButtonProps } from './BaseButton';
import Text from './Text';

export interface ButtonProps extends BaseButtonProps {
  /** The size of the button */
  size: 'small' | 'large';

  /** The variant of the button that decides the colors */
  variant: 'primary' | 'default' | 'secondary';
}

/**
 * Extends <a href="/#/Box">Box</a>
 *
 * The core re-usable button that you will use in the app. You can either add plain text (which will
 * be wrapped in a `<Text>` element) or other React components (which will not be wrapped with
 * anything).
 */
const Button: React.FC<ButtonProps> = ({ size, variant, children, ...rest }) => {
  const sizeProps = (() => {
    switch (size) {
      case 'small':
        return { px: 4, py: 2, fontSize: 2 };
      case 'large':
      default:
        return { px: 5, py: 4, fontSize: 3 };
    }
  })();

  const variantProps = (() => {
    switch (variant) {
      case 'secondary':
        return {
          color: 'grey400',
          bg: 'grey50',
          css: css({
            textTransform: 'uppercase',

            ':hover': {
              filter: 'brightness(90%)',
            },
          }),
        };
      case 'default':
        return {
          color: 'grey400',
          bg: 'transparent',
          boxShadow: 2,
          css: css({
            textTransform: 'uppercase',

            ':hover': {
              boxShadow: 3,
              filter: 'brightness(120%)',
            },
          }),
        };
      case 'primary':
      default:
        return {
          color: 'white',
          bg: 'primary300',
          boxShadow: 2,
          css: css({
            textTransform: 'uppercase',

            ':hover': {
              boxShadow: 3,
              filter: 'brightness(120%)',
            },
          }),
        };
    }
  })();

  return (
    <BaseButton
      fontWeight="bold"
      borderRadius="large"
      css={variantProps.css}
      {...sizeProps}
      {...variantProps}
      {...rest}
    >
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </BaseButton>
  );
};

Button.defaultProps = {
  size: 'large',
  variant: 'primary',
};

export default Button;

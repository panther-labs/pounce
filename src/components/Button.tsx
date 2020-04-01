import * as React from 'react';
import { css } from '@emotion/react';
import BaseButton, { BaseButtonProps } from './BaseButton';
import { convertHexToRgba } from '../utils/helpers';
import useTheme from '../utils/useTheme';

export interface ButtonProps extends BaseButtonProps {
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
const Button: React.FC<ButtonProps> = ({ size, variant, children, css: userCssProp, ...rest }) => {
  const theme = useTheme();

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
          css: css`
            text-transform: uppercase;

            &:hover {
              background-color: ${theme.colors.grey100};
            }

            &:active {
              background-color: ${theme.colors.grey200};
            }
          `,
        };
      case 'default':
        return {
          color: 'grey400',
          bg: 'white',
          boxShadow: 'dark150',
          css: css`
            text-transform: uppercase;

            &:hover {
              box-shadow: ${theme.shadows.dark200};
            }

            &:active {
              box-shadow: ${theme.shadows.none};
              background-color: ${theme.colors.grey100};
            }
          `,
        };
      case 'primary':
      default:
        return {
          color: 'white',
          bg: 'primary300',
          boxShadow: 'dark150',
          css: css`
            text-transform: uppercase;

            &:hover {
              box-shadow: ${theme.shadows.dark200};
              background-color: ${convertHexToRgba(theme.colors.primary300, 0.9)};
            }
            
            &:active {
              box-shadow: ${theme.shadows.none};
              background-color: ${theme.colors.primary300};
            },
          `,
        };
    }
  })();

  return (
    <BaseButton
      fontWeight="bold"
      borderRadius="large"
      css={`
        ${userCssProp}
        ${variantProps.css}
      `}
      {...sizeProps}
      {...variantProps}
      {...rest}
    >
      {children}
    </BaseButton>
  );
};

export default Button;

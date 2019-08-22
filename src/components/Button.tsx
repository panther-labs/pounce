import * as React from 'react';
import { css } from 'styled-components';
import BaseButton, { BaseButtonProps } from 'components/BaseButton';
import { convertHexToRgba } from 'utils/helpers';

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
              background-color: ${({ theme }) => theme.colors.grey100};
            }

            &:active {
              background-color: ${({ theme }) => theme.colors.grey200};
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
              box-shadow: ${({ theme }) => theme.shadows.dark200};
            }

            &:active {
              box-shadow: ${({ theme }) => theme.shadows.none};
              background-color: ${({ theme }) => theme.colors.grey100};
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
              box-shadow: ${({ theme }) => theme.shadows.dark200};
              background-color: ${({ theme }) => convertHexToRgba(theme.colors.primary300, 0.9)};
            }
            
            &:active {
              box-shadow: ${({ theme }) => theme.shadows.none};
              background-color: ${({ theme }) => theme.colors.primary300};
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

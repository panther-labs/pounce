import * as React from 'react';
import styled from 'styled-components';
import { Button as RebassButton, ButtonProps as RebassButtonProps } from 'rebass';

interface ButtonProps extends RebassButtonProps {
  /** The shape of the button */
  pShape?: 'pill' | 'rect';

  /** The size of the button */
  pSize?: 'small' | 'large';

  /** The variant of the button that decides the colors */
  pVariant?: 'primary' | 'default';
}

const StyledRebassButton: React.FC = styled(RebassButton)`
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  box-shadow: ${({ theme }) => theme.shadows[2]};

  [disabled] {
    opacity: 0.3;
    pointer-events: none;
  }

  &:hover:not(:active) {
    filter: brightness(120%);
  }

  &:hover,
  &:active {
    box-shadow: ${({ theme }) => theme.shadows[3]};
  }
`;

/**
 * Extends <a href="/#/Box">Box</a>
 *
 * The core re-usable button that you will use in the app.
 */
const Button: React.FC<ButtonProps> = ({ pShape, pSize, pVariant, ...rest }) => {
  const pShapeProps = (() => {
    switch (pShape) {
      case 'rect':
        return { borderRadius: 'medium' };
      case 'pill':
      default:
        return { borderRadius: 'large' };
    }
  })();

  const pSizeProps = (() => {
    switch (pSize) {
      case 'small':
        return { px: 5, py: 2, fontSize: 2 };
      case 'large':
      default:
        return { px: 5, py: 4, fontSize: 3 };
    }
  })();

  const pVariantProps = (() => {
    switch (pVariant) {
      case 'default':
        return { color: 'grey400', bg: 'transparent' };
      case 'primary':
      default:
        return { color: 'white', bg: 'primary300' };
    }
  })();

  return <StyledRebassButton {...pShapeProps} {...pSizeProps} {...pVariantProps} {...rest} />;
};

Button.defaultProps = {
  pShape: 'pill',
  pSize: 'large',
  pVariant: 'primary',
};

export default Button;

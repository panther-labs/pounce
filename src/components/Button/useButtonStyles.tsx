import React from 'react';
import { AbstractButtonProps } from '../AbstractButton';
import { ButtonProps } from './Button';
import { Theme } from '../../theme';
import { lightenDarkenColor } from '../../utils/helpers';
import useTheme from '../../utils/useTheme';

type ThemeColor = keyof Theme['colors'];

type UseButtonStylesProps = Required<Pick<ButtonProps, 'variantColor' | 'variant' | 'size'>>;

export const getSolidButtonStyles = (theme: Theme, variantColor: ThemeColor) => {
  const themeColor = theme.colors[variantColor];

  const hoverColor = lightenDarkenColor(themeColor, 10);
  const activeColor = lightenDarkenColor(themeColor, -10);
  const focusBorderColor = lightenDarkenColor(themeColor, 85);

  return {
    transition: 'border-color 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, background-color 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms', // prettier-ignore
    borderRadius: 'medium' as const,
    border: '1px solid',
    borderColor: themeColor,
    backgroundColor: themeColor,
    _hover: {
      backgroundColor: hoverColor,
      borderColor: hoverColor,
    },
    _focus: {
      backgroundColor: hoverColor,
      borderColor: focusBorderColor,
    },
    _active: {
      backgroundColor: activeColor,
      borderColor: activeColor,
    },
  };
};

const getOutlineButtonStyles = (theme: Theme, variantColor: ThemeColor) => {
  const themeColor = theme.colors[variantColor];

  const hoverColor = lightenDarkenColor(themeColor, 8);
  const activeColor = lightenDarkenColor(themeColor, -25);
  const focusBorderColor = lightenDarkenColor(themeColor, 85);

  return {
    transition: 'border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms', // prettier-ignore
    borderRadius: 'small' as const,
    border: '1px solid',
    borderColor: themeColor,
    backgroundColor: 'transparent',
    _hover: {
      backgroundColor: hoverColor,
      borderColor: hoverColor,
    },
    _focus: {
      backgroundColor: hoverColor,
      borderColor: focusBorderColor,
    },
    _active: {
      backgroundColor: activeColor,
      borderColor: activeColor,
    },
  };
};

const getSizeButtonStyles = (size: ButtonProps['size']): AbstractButtonProps => {
  switch (size) {
    case 'small':
      return { px: 2, height: 24, fontSize: 'small' };
    case 'medium':
      return { px: 3, height: 32, fontSize: 'small-medium' };
    case 'large':
    default:
      return { px: 4, height: 46, fontSize: 'medium-large' };
  }
};

const useButtonStyles = ({
  variantColor,
  variant,
  size,
}: UseButtonStylesProps): AbstractButtonProps => {
  const theme = useTheme();

  const variantStyles = React.useMemo(() => {
    switch (variant) {
      case 'outline':
        return getOutlineButtonStyles(theme, variantColor);
      case 'solid':
      default:
        return getSolidButtonStyles(theme, variantColor);
    }
  }, [variantColor, variant]);

  const sizeStyles = getSizeButtonStyles(size);

  return {
    outline: 'none',
    ...sizeStyles,
    ...variantStyles,
  } as AbstractButtonProps;
};

export default useButtonStyles;

import React from 'react';
import { AbstractButtonProps } from '../AbstractButton';
import { ButtonProps } from './Button';
import { Theme } from '../../theme';
import { lightenDarkenColor } from '../../utils/helpers';
import useTheme from '../../utils/useTheme';

type ThemeColor = keyof Theme['colors'];
type ButtonColorVariant = ButtonProps['variantColor'];

export const getThemeColor = (color: ButtonColorVariant): ThemeColor => {
  switch (color) {
    case 'violet':
      return 'violet-400';
    case 'teal':
      return 'teal-500';
    case 'red':
      return 'pink-700';
    case 'orange':
      return 'yellow-600';
    case 'green':
      return 'green-400';
    case 'gray':
      return 'gray-500';
    case 'darkgray':
      return 'gray-600';
    case 'navyblue':
      return 'navyblue-300';
    case 'blue':
    default:
      return 'blue-400';
  }
};

type UseButtonStylesProps = Required<Pick<ButtonProps, 'variantColor' | 'variant' | 'size'>>;

export const getSolidButtonStyles = (theme: Theme, variantColor: ButtonColorVariant) => {
  const themeColorKey = getThemeColor(variantColor);
  const themeColor = theme.colors[themeColorKey];

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

const getOutlineButtonStyles = (theme: Theme, variantColor: ButtonColorVariant) => {
  const themeColorKey = getThemeColor(variantColor);
  const themeColor = theme.colors[themeColorKey];

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
      return { px: 5, height: 24, fontSize: 'small' };
    case 'medium':
      return { px: 5, height: 32, fontSize: 'small-medium' };
    case 'large':
    default:
      return { px: 5, height: 46, fontSize: 'medium-large' };
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

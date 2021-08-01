import React from 'react';
import { addOpacity, lightenDarkenColor } from '../../utils/helpers';
import { AbstractButtonProps } from '../AbstractButton';
import useTheme from '../../utils/useTheme';
import { IconButtonProps } from './IconButton';
import { Theme } from '../../theme';

type ThemeColor = keyof Theme['colors'];
type UseIconButtonStyles = Required<
  Pick<IconButtonProps, 'variantColor' | 'variant' | 'size' | 'variantBorderStyle'>
>;

export const getUnstyledButtonStyles = (theme: Theme) => {
  return {
    _focus: {
      backgroundColor: addOpacity(theme.colors.white, 0.1),
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

export const getGhostButtonStyles = (theme: Theme, variantColor: ThemeColor) => {
  const themeColor = theme.colors[variantColor];

  return {
    transition: 'background-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    border: '1px solid',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    _hover: {
      backgroundColor: addOpacity(themeColor, 0.3),
    },
    _focus: {
      backgroundColor: addOpacity(themeColor, 0.3),
    },
    _active: {
      backgroundColor: themeColor,
    },
  };
};

export const getSolidButtonStyles = (theme: Theme, variantColor: ThemeColor) => {
  const themeColor = theme.colors[variantColor];

  const hoverColor = lightenDarkenColor(themeColor, 10);
  const activeColor = lightenDarkenColor(themeColor, -10);
  const focusBorderColor = lightenDarkenColor(themeColor, 85);

  return {
    transition: 'border-color 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, background-color 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms', // prettier-ignore
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

const getSizeButtonStyles = (size: IconButtonProps['size']): AbstractButtonProps => {
  switch (size) {
    case 'small':
      return { height: 24, width: 24 };
    case 'medium':
      return { height: 32, width: 32 };
    case 'large':
    default:
      return { height: 46, width: 46 };
  }
};

const getBorderStyles = (
  variantBorderStyle: IconButtonProps['variantBorderStyle']
): AbstractButtonProps => {
  switch (variantBorderStyle) {
    case 'circle':
      return { borderRadius: 'circle' };
    case 'square':
    default: {
      return { borderRadius: 'medium' };
    }
  }
};

const useIconButtonStyles = ({
  variantColor,
  variantBorderStyle,
  variant,
  size,
}: UseIconButtonStyles): AbstractButtonProps => {
  const theme = useTheme();

  const variantStyles = React.useMemo(() => {
    switch (variant) {
      case 'ghost':
        return getGhostButtonStyles(theme, variantColor);
      case 'unstyled':
        return getUnstyledButtonStyles(theme);
      case 'outline':
        return getOutlineButtonStyles(theme, variantColor);
      case 'solid':
      default:
        return getSolidButtonStyles(theme, variantColor);
    }
  }, [variantColor, variant]);

  const sizeStyles = getSizeButtonStyles(size);
  const borderStyles = getBorderStyles(variantBorderStyle);

  return {
    outline: 'none',
    lineHeight: 'none',
    ...borderStyles,
    ...sizeStyles,
    ...variantStyles,
  } as AbstractButtonProps;
};

export default useIconButtonStyles;

import React from 'react';
import { addOpacity } from '../../utils/helpers';
import { AbstractButtonProps } from '../AbstractButton';
import { getSolidButtonStyles, getThemeColor } from '../Button/useButtonStyles';
import useTheme from '../../utils/useTheme';
import { IconButtonProps } from './IconButton';
import { Theme } from '../../theme';
import { ButtonProps } from '../Button';

type ButtonColorVariant = ButtonProps['variantColor'];
type UseIconButtonStyles = Required<Pick<IconButtonProps, 'variantColor' | 'variant' | 'size'>>;

export const getUnstyledButtonStyles = (theme: Theme) => {
  return {
    _focus: {
      borderRadius: 'circle' as const,
      backgroundColor: addOpacity(theme.colors.white, 0.1),
    },
  };
};

export const getGhostButtonStyles = (theme: Theme, variantColor: ButtonColorVariant) => {
  const themeColorKey = getThemeColor(variantColor);
  const themeColor = theme.colors[themeColorKey];

  return {
    transition: 'background-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    borderRadius: 'circle' as const,
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

const useIconButtonStyles = ({
  variantColor,
  variant,
  size,
}: UseIconButtonStyles): AbstractButtonProps => {
  const theme = useTheme();

  const styles = React.useMemo(() => {
    switch (variant) {
      case 'ghost':
        return getGhostButtonStyles(theme, variantColor);
      case 'unstyled':
        return getUnstyledButtonStyles(theme);
      case 'solid':
      default:
        return getSolidButtonStyles(theme, variantColor);
    }
  }, [variantColor, variant]);

  return {
    p: size === 'small' ? 1 : 3,
    outline: 'none',
    ...styles,
  } as AbstractButtonProps;
};

export default useIconButtonStyles;

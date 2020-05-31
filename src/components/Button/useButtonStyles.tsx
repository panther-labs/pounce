import React from 'react';
import { lightenDarkenColor } from '../../utils/helpers';
import { AbstractButtonProps } from '../AbstractButton';
import { ButtonProps } from './Button';
import { Theme } from '../../theme';
import useTheme from '../../utils/useTheme';

type UseButtonStylesProps = Required<Pick<ButtonProps, 'color' | 'variant'>>;
type ThemeColor = keyof Theme['colors'];

export const getSolidButtonStyles = (theme: Theme, color: ButtonProps['color']) => {
  const themeColorKey: ThemeColor = (() => {
    switch (color) {
      case 'violet':
        return 'violet-300';
      case 'teal':
        return 'teal-300';
      case 'red':
        return 'red-700';
      case 'orange':
        return 'orange-500';
      case 'green':
        return 'green-200';
      case 'gray':
        return 'gray-400';
      case 'darkgray':
        return 'gray-700';
      case 'blue':
      default:
        return 'blue-600';
    }
  })();

  const themeColor = theme.colors[themeColorKey];
  return {
    transition: 'border-color 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, background-color 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms', // prettier-ignore
    borderRadius: 'medium' as const,
    border: '1px solid',
    borderColor: themeColorKey,
    backgroundColor: themeColorKey,
    _hover: {
      backgroundColor: lightenDarkenColor(themeColor, 10),
      borderColor: lightenDarkenColor(themeColor, 10),
    },
    _focus: {
      backgroundColor: lightenDarkenColor(themeColor, 10),
      borderColor: lightenDarkenColor(themeColor, 85),
    },
    _active: {
      backgroundColor: lightenDarkenColor(themeColor, -10),
      borderColor: lightenDarkenColor(themeColor, -10),
    },
  };
};

const getOutlineButtonStyles = (theme: Theme) => {
  const themeColor = theme.colors['navyblue-450'];
  return {
    transition: 'border-color 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, background-color 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms', // prettier-ignore
    borderRadius: 'small' as const,
    border: '1px solid',
    borderColor: 'navyblue-450',
    backgroundColor: 'transparent',
    _hover: {
      backgroundColor: 'navyblue-500',
      borderColor: 'navyblue-500',
    },
    _focus: {
      backgroundColor: 'navyblue-500',
      borderColor: lightenDarkenColor(themeColor, 70),
    },
    _active: {
      backgroundColor: 'navyblue-600',
      borderColor: 'navyblue-600',
    },
  };
};

const useButtonStyles = ({ color, variant }: UseButtonStylesProps): AbstractButtonProps => {
  const theme = useTheme();

  const styles = React.useMemo(() => {
    switch (variant) {
      case 'outline':
        return getOutlineButtonStyles(theme);
      case 'solid':
      default:
        return getSolidButtonStyles(theme, color);
    }
  }, [color, variant]);

  return {
    px: 5,
    py: 3,
    fontSize: 'medium-large',
    outline: 'none',
    color: 'gray-50',
    ...styles,
  } as AbstractButtonProps;
};

export default useButtonStyles;

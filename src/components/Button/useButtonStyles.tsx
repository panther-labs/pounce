import React from 'react';
import { lightenDarkenColor } from '../../utils/helpers';
import { AbstractButtonProps } from '../AbstractButton';
import { ButtonProps } from './Button';
import { Theme } from '../../theme';
import useTheme from '../../utils/useTheme';

type UseButtonStylesProps = Required<Pick<ButtonProps, 'color' | 'variant' | 'active'>>;
type ThemeColor = keyof Theme['colors'];

const getSolidButtonStyles = (theme: Theme, color: ButtonProps['color'], active: boolean) => {
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
    transition: 'border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms', // prettier-ignore
    borderRadius: 'medium' as const,
    border: '1px solid',
    borderColor: !active ? themeColorKey : lightenDarkenColor(themeColor, -20),
    backgroundColor: !active ? themeColorKey : lightenDarkenColor(themeColor, -20),
    _hover: {
      backgroundColor: lightenDarkenColor(themeColor, 20),
      borderColor: lightenDarkenColor(themeColor, 20),
    },
    _focus: {
      backgroundColor: lightenDarkenColor(themeColor, 20),
      borderColor: lightenDarkenColor(themeColor, 170),
    },
    _active: {
      backgroundColor: lightenDarkenColor(themeColor, -20),
      borderColor: lightenDarkenColor(themeColor, -20),
    },
  };
};

const getOutlineButtonStyles = (theme: Theme, active: boolean) => {
  const themeColor = theme.colors['navyblue-450'];
  return {
    transition: 'border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms', // prettier-ignore
    borderRadius: 'small' as const,
    border: '1px solid',
    borderColor: !active ? 'navyblue-450' : 'navyblue-600',
    backgroundColor: !active ? 'transparent' : 'navyblue-600',
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

const useButtonStyles = ({ color, variant, active }: UseButtonStylesProps): AbstractButtonProps => {
  const theme = useTheme();

  const styles = React.useMemo(() => {
    switch (variant) {
      case 'outline':
        return getOutlineButtonStyles(theme, active);
      case 'solid':
      default:
        return getSolidButtonStyles(theme, color, active);
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

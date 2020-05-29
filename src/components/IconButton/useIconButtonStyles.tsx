import React from 'react';
import { addOpacity } from '../../utils/helpers';
import { AbstractButtonProps } from '../AbstractButton';
import { getSolidButtonStyles } from '../Button/useButtonStyles';
import { Theme } from '../../theme';
import useTheme from '../../utils/useTheme';
import { IconButtonProps } from './IconButton';

type UseIconButtonStyles = Required<Pick<IconButtonProps, 'color' | 'variant' | 'active'>>;

export const getGhostButtonStyles = (theme: Theme, active: boolean) => ({
  transition: 'background-color 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
  borderRadius: 'circle' as const,
  border: '1px solid',
  borderColor: !active ? 'transparent' : addOpacity('white', 0.15),
  backgroundColor: !active ? 'transparent' : addOpacity('white', 0.15),
  _hover: {
    backgroundColor: addOpacity('white', 0.075),
  },
  _focus: {
    backgroundColor: addOpacity('white', 0.075),
  },
  _active: {
    backgroundColor: addOpacity('white', 0.15),
  },
});

const useIconButtonStyles = ({
  color,
  variant,
  active,
}: UseIconButtonStyles): AbstractButtonProps => {
  const theme = useTheme();

  const styles = React.useMemo(() => {
    switch (variant) {
      case 'ghost':
        return getGhostButtonStyles(theme, active);
      case 'solid':
      default:
        return getSolidButtonStyles(theme, color, active);
    }
  }, [color, variant]);

  return {
    p: 3,
    outline: 'none',
    color: 'gray-50',
    ...styles,
  } as AbstractButtonProps;
};

export default useIconButtonStyles;

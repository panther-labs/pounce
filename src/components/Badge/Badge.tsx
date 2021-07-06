import React from 'react';
import { Theme } from '../../theme';
import Box from '../Box';
import { addOpacity } from '../../utils/helpers';
import useTheme from '../../utils/useTheme';

export interface BadgeProps {
  /** The color theme of the badge */
  color: keyof Theme['colors'];

  /** The size of the Badge. Defaults to `medium`. */
  size?: 'medium' | 'large';
  /** @ignore */
  children: React.ReactNode;
}

/** A badge is simply a visual label to accompany & characterize a certain text*/
const Badge = React.forwardRef<HTMLElement, BadgeProps>(function Badge(
  { color, children, size = 'medium', ...rest },
  ref
) {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      role="status"
      aria-atomic="true"
      ref={ref}
      cursor="default"
      width={size === 'medium' ? 'fit-content' : 'auto'}
      textAlign="center"
      fontWeight={size === 'medium' ? 'normal' : 'bold'}
      border="1px solid"
      borderRadius="small"
      borderColor={color}
      backgroundColor={addOpacity(theme.colors[color], 0.3)}
      alignItems="center"
      justifyContent="center"
      fontSize="small"
      py={1}
      px="6px"
      {...rest}
    >
      {children}
    </Box>
  );
});

export default React.memo(Badge);

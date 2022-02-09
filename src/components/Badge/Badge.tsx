import React from 'react';
import { Theme } from '../../theme';
import Box from '../Box';
import { addOpacity } from '../../utils/helpers';
import useTheme from '../../utils/useTheme';

export interface BadgeProps {
  /** The color theme of the badge */
  color: keyof Theme['colors'];

  /** Whether the badge should stretch to fill his parent or not */
  stretch?: boolean;

  /** Whether the Badge should be emphasized or not */
  emphasized?: boolean;

  /** The size of the Badge. Defaults to `medium`. */
  size?: 'small' | 'medium';
  /** @ignore */
  children: React.ReactNode;
}

/** A badge is simply a visual label to accompany & characterize a certain text*/
const Badge = React.forwardRef<HTMLElement, BadgeProps>(function Badge(
  { color, children, stretch = false, size = 'medium', emphasized = false, ...rest },
  ref
) {
  const theme = useTheme();
  const hasMediumSize = size === 'medium';

  return (
    <Box
      display="flex"
      role="status"
      aria-atomic="true"
      ref={ref}
      cursor="default"
      width={stretch ? 'auto' : 'fit-content'}
      textAlign="center"
      fontWeight={emphasized ? 'bold' : 'normal'}
      textTransform={emphasized ? 'uppercase' : 'none'}
      border="1px solid"
      borderRadius="small"
      borderColor={color}
      backgroundColor={addOpacity(theme.colors[color], 0.3)}
      alignItems="center"
      justifyContent="center"
      fontSize={hasMediumSize ? 'small' : 'x-small'}
      py={hasMediumSize ? 1 : 0}
      px={hasMediumSize ? '6px' : 1}
      {...rest}
    >
      {children}
    </Box>
  );
});

export default React.memo(Badge);

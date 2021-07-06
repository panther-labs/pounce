import React from 'react';
import { Theme } from '../../theme';
import Box from '../Box';

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
  { color = 'white', children, size = 'medium', ...rest },
  ref
) {
  return (
    <Box
      position="relative"
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
      backgroundColor="transparent"
      alignItems="center"
      justifyContent="center"
      fontSize="small"
      py={1}
      px="6px"
      {...rest}
    >
      <Box position="absolute" bg={color} opacity={0.3} top={0} bottom={0} left={0} right={0} />
      <Box zIndex={1}>{children}</Box>
    </Box>
  );
});

export default React.memo(Badge);

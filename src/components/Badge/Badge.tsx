import React from 'react';
import { Theme } from 'theme';
import useBadgeStyles from './useBadgeStyles';
import Box from 'components/Box';

export interface BadgeProps {
  /** The color theme of the badge */
  color: keyof Theme['colors'];

  /** The style of the badge */
  variant?: 'solid' | 'outline';

  /** @ignore */
  children: React.ReactNode;
}

/** A badge is simply a visual label to accompany & characterize a certain text*/
const Badge = React.forwardRef<HTMLElement, BadgeProps>(function Badge(
  { color, variant = 'solid', children, ...rest },
  ref
) {
  const variantStyles = useBadgeStyles({ variant, color });

  return (
    <Box
      display="flex"
      role="status"
      aria-atomic="true"
      ref={ref}
      cursor="default"
      width="fit-content"
      minWidth="85px"
      textAlign="center"
      fontWeight="bold"
      borderRadius="pill"
      alignItems="center"
      justifyContent="center"
      fontSize="small"
      py={1}
      px={4}
      {...variantStyles}
      {...rest}
    >
      {children}
    </Box>
  );
});

export default React.memo(Badge);

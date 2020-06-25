import React from 'react';
import Flex from '../Flex';
import { Theme } from '../../theme';
import useBadgeStyles from './useBadgeStyles';

export interface BadgeProps {
  /** The color theme of the badge */
  color: keyof Theme['colors'];

  /** The style of the badge */
  variant?: 'solid' | 'outline';
}

/** A badge is simply a visual label to accompany & characterize a certain text*/
const Badge = React.forwardRef<HTMLElement, BadgeProps>(function Badge(
  { color, variant = 'solid', children, ...rest },
  ref
) {
  const variantStyles = useBadgeStyles({ variant, color });

  return (
    <Flex
      ref={ref}
      cursor="default"
      width="fit-content"
      minWidth="85px"
      textAlign="center"
      fontWeight="bold"
      borderRadius="pill"
      align="center"
      justify="center"
      fontSize="small"
      py={1}
      px={4}
      {...variantStyles}
      {...rest}
    >
      {children}
    </Flex>
  );
});

export default Badge;

import React from 'react';
import Flex, { FlexProps } from '../Flex';
import { Theme } from '../../theme';

export interface BadgeProps {
  /** The color theme of the badge */
  color: keyof Theme['colors'];

  /** The style of the badge */
  variant?: 'solid' | 'stroke';
}

/** A badge is simply a visual label to accompany & characterize a certain text*/
const Badge: React.FC<BadgeProps> = ({ color, variant = 'solid', children, ...rest }) => {
  const variantProps = (function() {
    switch (variant) {
      case 'stroke':
        return {
          border: '1px solid',
          borderColor: color,
          bg: 'transparent' as const,
        };
      case 'solid':
      default:
        return { bg: color };
    }
  })() as Partial<FlexProps>;

  return (
    <Flex
      width="fit-content"
      minWidth="85px"
      textAlign="center"
      fontWeight="bold"
      borderRadius="pill"
      align="center"
      justify="center"
      fontSize="small"
      color="white"
      // lineHeight="normal"
      p={1}
      {...variantProps}
      {...rest}
    >
      {children}
    </Flex>
  );
};

export default Badge;

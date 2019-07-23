import React from 'react';
import Text from './Text';

interface BadgeProps {
  /** The style of the badge */
  variant: 'info' | 'error-low' | 'error-medium' | 'error-high' | 'error-critical';
}

/**
 * A badge is simply a visual label to associate with something else
 */
const Badge: React.FC<BadgeProps> = ({ variant, ...rest }) => {
  const variantProps = (function() {
    switch (variant) {
      case 'info':
        return {
          border: '1px solid',
          borderColor: 'grey200',
          bg: 'transparent',
          color: 'grey300',
          children: 'INFO',
        };
      case 'error-low':
        return { bg: 'grey100', color: 'grey300', children: 'LOW' };
      case 'error-medium':
        return { bg: 'blue100', color: 'blue300', children: 'MEDIUM' };
      case 'error-high':
        return { bg: 'red100', color: 'red300', children: 'HIGH' };
      case 'error-critical':
      default:
        return { bg: 'red300', color: 'white', children: 'CRITICAL' };
    }
  })();

  return (
    <Text
      width={62}
      textAlign="center"
      fontSize={0}
      fontWeight="bold"
      borderRadius="small"
      lineHeight="12px"
      px={3}
      py={1}
      {...variantProps}
      {...rest}
    />
  );
};

export default Badge;

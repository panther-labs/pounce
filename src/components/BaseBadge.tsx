import React from 'react';
import Flex from './Flex';
import Text from './Text';
import { BaseTextProps } from './BaseText';

export type BaseBadgeProps = BaseTextProps & {
  /** The color theme of the badge */
  color: 'neutral' | 'grey' | 'blue' | 'pink' | 'red';
};

/** A badge is simply a visual label to associate with something else */
const BaseBadge: React.FC<BaseBadgeProps> = ({ color, children, ...rest }) => {
  const colorProps = (function() {
    switch (color) {
      case 'neutral':
        return {
          border: '1px solid',
          borderColor: 'grey200',
          bg: 'transparent',
          color: 'grey300',
        };
      case 'grey':
        return { bg: 'grey100', color: 'grey300' };
      case 'blue':
        return { bg: 'blue100', color: 'blue300' };
      case 'pink':
        return { bg: 'red100', color: 'red300' };
      case 'red':
      default:
        return { bg: 'red300', color: 'white' };
    }
  })() as Partial<BaseBadgeProps>;

  return (
    <Flex alignItems="center" justifyContent="center" {...colorProps} {...rest}>
      <Text size="medium" fontSize={0} lineHeight={0}>
        {children}
      </Text>
    </Flex>
  );
};

export default BaseBadge;

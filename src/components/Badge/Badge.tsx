import React from 'react';
import Flex, { FlexProps } from '../Flex';

export interface BadgeProps {
  /** The color theme of the badge */
  color: 'neutral' | 'grey' | 'blue' | 'pink' | 'red';
}

/** A badge is simply a visual label to accompany & characterize a certain text*/
const Badge: React.FC<BadgeProps> = ({ color, children, ...rest }) => {
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
  })() as Partial<FlexProps>;

  return (
    <Flex
      width="fit-content"
      minWidth="62px"
      textAlign="center"
      fontWeight="medium"
      borderRadius="small"
      align="center"
      justify="center"
      fontSize="x-small"
      lineHeight={0}
      p={1}
      {...colorProps}
      {...rest}
    >
      {children}
    </Flex>
  );
};

export default Badge;

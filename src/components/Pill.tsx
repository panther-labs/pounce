import React from 'react';
import BaseBadge, { BaseBadgeProps } from 'components/BaseBadge';

export interface PillProps extends BaseBadgeProps {
  /** The size of the circle  */
  size: 'small' | 'large';
}

/** A Pill is a visual label to add a counter to a certain element */
const Pill: React.FC<PillProps> = ({ size, ...rest }) => {
  const sizeProps = (() => {
    switch (size) {
      case 'small':
        return { width: 17, height: 17 };

      case 'large':
      default:
        return { width: 24, height: 24 };
    }
  })();

  return <BaseBadge fontWeight="bolder" borderRadius="circle" {...sizeProps} {...rest} />;
};

Pill.defaultProps = {
  size: 'small',
};

export default Pill;

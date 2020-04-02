import React from 'react';
import BaseBadge, { BaseBadgeProps } from '../BaseBadge';

export type BadgeProps = BaseBadgeProps;

/** A badge is simply a visual label to accompany & characterize a certain text*/
const Badge: React.FC<BadgeProps> = props => {
  return (
    <BaseBadge
      width="fit-content"
      minWidth="62px"
      textAlign="center"
      fontWeight="medium"
      borderRadius="small"
      px={1}
      py={1}
      {...props}
    />
  );
};

export default Badge;

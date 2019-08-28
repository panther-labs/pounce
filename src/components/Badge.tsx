import React from 'react';
import BaseBadge, { BaseBadgeProps } from 'components/BaseBadge';

export type BadgeProps = BaseBadgeProps;

/** A badge is simply a visual label to accompany & characterize a certain text*/
const Badge: React.FC<BadgeProps> = props => {
  return (
    <BaseBadge textAlign="center" fontWeight="bold" borderRadius="small" px={3} py={1} {...props} />
  );
};

export default Badge;

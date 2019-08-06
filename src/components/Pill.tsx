import React from 'react';
import BaseBadge, { BaseBadgeProps } from 'components/BaseBadge';

export type PillProps = BaseBadgeProps;

/** A Pill is a visual label to add a counter to a certain element */
const Pill: React.FC<PillProps> = props => {
  return (
    <BaseBadge width="17px" height="17px" fontWeight="bolder" borderRadius="circle" {...props} />
  );
};

export default Pill;

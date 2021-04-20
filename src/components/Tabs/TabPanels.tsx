import React from 'react';
import { TabPanels as ReachTabPanels, TabPanelProps as ReachTabPanelsProps } from '@reach/tabs';

export type TabPanelsProps = ReachTabPanelsProps;

const TabPanels = React.forwardRef<HTMLDivElement, TabPanelsProps>(function TabPanels(
  { children, ...rest },
  ref
) {
  return (
    <ReachTabPanels ref={ref} {...rest}>
      {React.Children.toArray(children)
        .filter(Boolean)
        .map((child, index) => React.cloneElement(child as React.ReactElement, { index }))}
    </ReachTabPanels>
  );
});

export default TabPanels;

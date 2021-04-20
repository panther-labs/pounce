import React from 'react';
import { TabList as ReachTabList, useTabsContext } from '@reach/tabs';
import { NativeAttributes } from '../Box';
import Flex from '../Flex';

export type TabListProps = NativeAttributes<'div'>;

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>(function TabList(
  { children, ...rest },
  ref
) {
  const { focusedIndex, selectedIndex } = useTabsContext();

  return (
    // @ts-ignore Typing is wrong on @reach-ui, allowing only div | undefined for `as`
    <ReachTabList as={Flex} ref={ref} flexWrap="wrap" {...rest}>
      {React.Children.toArray(children)
        .filter(Boolean)
        .map((child, index) =>
          React.cloneElement(child as React.ReactElement, {
            isSelected: selectedIndex === index,
            isFocused: focusedIndex === index,
          })
        )}
    </ReachTabList>
  );
});

export default TabList;

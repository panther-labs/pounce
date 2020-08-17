import React from 'react';
import { TabList as ReachTabList, useTabsContext } from '@reach/tabs';
import { NativeAttributes } from '../Box';
import Flex, { FlexProps } from '../Flex';

export type TabListProps = NativeAttributes<'ul'>;

const FlexList = React.forwardRef<HTMLUListElement, FlexProps>(function FlexList(props, ref) {
  return <Flex ref={ref} as="ul" flexWrap="wrap" {...props} />;
});

export const TabList = React.forwardRef<HTMLUListElement, TabListProps>(function TabList(
  { children, ...rest },
  ref
) {
  const { focusedIndex, selectedIndex } = useTabsContext();

  return (
    // @ts-ignore Typing is wrong on @reach-ui, allowing only div | undefined for `as`
    <ReachTabList as={FlexList} ref={ref} {...rest}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement, {
          isSelected: selectedIndex === index,
          isFocused: focusedIndex === index,
        })
      )}
    </ReachTabList>
  );
});

export default TabList;

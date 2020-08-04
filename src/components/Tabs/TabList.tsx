import React from 'react';
import { TabList as ReachTabList } from '@reach/tabs';
import Flex, { FlexProps } from '../Flex';
import { NativeAttributes } from '../Box';

export type TabListProps = NativeAttributes<'ul'>;

const FlexList = React.forwardRef<HTMLUListElement, FlexProps>(function FlexList(props, ref) {
  return <Flex as="ul" flexWrap="wrap" ref={ref} {...props} />;
});

export const TabList = React.forwardRef<HTMLInputElement, TabListProps>(function TabList(
  { children, ...rest },
  ref
) {
  return (
    // @ts-ignore Typing is wrong on @reach-ui, allowing only div | undefined for `as`
    <ReachTabList as={FlexList} ref={ref} {...rest}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement, { index })
      )}
    </ReachTabList>
  );
});

export default TabList;

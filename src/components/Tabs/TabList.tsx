import React from 'react';
import { TabList as ReachTabList } from '@reach/tabs';
import Flex, { FlexProps } from '../Flex';
import { ReactAttributes } from '../Box';

export type TabListProps = ReactAttributes<React.AllHTMLAttributes<'ul'>>;

const FlexList = React.forwardRef<HTMLUListElement, FlexProps>(function FlexList(props, ref) {
  return <Flex as="ul" ref={ref} {...props} />;
});

const TabList = React.forwardRef<HTMLUListElement, TabListProps>(function TabList(props, ref) {
  // @ts-ignore Typing is wrong on @reach-ui, allowing only div | undefined for `as`
  return <ReachTabList as={FlexList} ref={ref} {...props} />;
});

export default TabList;

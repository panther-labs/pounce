import React from 'react';
import { TabList as ReachTabList } from '@reach/tabs';
import { NativeAttributes } from '../Box';
import PseudoBox, { PseudoBoxProps } from '../PseudoBox';

export type TabListProps = NativeAttributes<'ul'>;

const FlexList = React.forwardRef<HTMLUListElement, PseudoBoxProps>(function FlexList(props, ref) {
  return (
    <PseudoBox
      ref={ref}
      as="ul"
      display="flex"
      flexWrap="wrap"
      _after={{
        content: '""',
        width: '100%',
        height: '1px',
        backgroundColor: 'navyblue-300',
        marginTop: '-2px',
      }}
      {...props}
    />
  );
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

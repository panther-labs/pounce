import React from 'react';
import { Tab as ReachTab, TabProps as ReachTabProps } from '@reach/tabs';

export type TabProps = ReachTabProps;

const Tab = React.forwardRef<HTMLButtonElement, TabProps>(function Tab({ children, ...rest }, ref) {
  return (
    <ReachTab ref={ref} {...rest}>
      {children}
    </ReachTab>
  );
});

export default React.memo(Tab);

import React from 'react';
import { Tab as ReachTab } from '@reach/tabs';
import AbstractButton from '../AbstractButton';
import { NativeAttributes } from '../Box';
import { ComponentWithAs } from '@reach/utils';

export type TabProps = NativeAttributes<'button'> & { disabled?: boolean };

const Tab = React.forwardRef<HTMLButtonElement, TabProps>(function Tab({ children, ...rest }, ref) {
  return (
    <ReachTab ref={ref} as={AbstractButton} {...rest}>
      {children}
    </ReachTab>
  );
}) as ComponentWithAs<'button', TabProps>;

export default React.memo(Tab);

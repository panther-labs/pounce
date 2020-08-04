import React from 'react';
import { Tab as ReachTab } from '@reach/tabs';
import AbstractButton from '../AbstractButton';
import { NativeAttributes } from '../Box';
import { ComponentWithAs } from '@reach/utils';
import useTabStyles from './useTabStyles';

export type TabProps = NativeAttributes<'button'> & {
  /** Whether the tab should be disabled */
  disabled?: boolean;

  /** @ignore internal index of the tab in relation to its siblings */
  index: number;
};

const Tab = React.forwardRef<HTMLButtonElement, TabProps>(function Tab({ index, ...rest }, ref) {
  const styles = useTabStyles({ index });

  return <ReachTab ref={ref} as={AbstractButton} {...styles} {...rest} />;
}) as ComponentWithAs<'button', TabProps>;

export default React.memo(Tab);

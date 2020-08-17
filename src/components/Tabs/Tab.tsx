import React from 'react';
import { Tab as ReachTab, useTabsContext } from '@reach/tabs';
import AbstractButton from '../AbstractButton';
import { NativeAttributes } from '../Box';
import { ComponentWithAs } from '@reach/utils';

type TabRenderProps = {
  /** Whether the tab is selected */
  isSelected: boolean;

  /** Whether the tab is focused */
  isFocused: boolean;
};

export type TabProps = NativeAttributes<'button'> & {
  /** Whether the tab should be disabled */
  disabled?: boolean;

  /** The children of this tab. Can be a render-props pattern as well */
  children: ((renderProps: TabRenderProps) => React.ReactNode) | React.ReactNode;
};

type PrivateTabProps = TabProps & {
  /**
   * @ignore
   * private internal index of the tab in relation to its siblings. Passed automatically from the
   * `TabList` component
   */
  index: number;
};

const Tab = (React.forwardRef<HTMLButtonElement, PrivateTabProps>(function Tab(
  { children, index, ...rest },
  ref
) {
  const { focusedIndex, selectedIndex } = useTabsContext();

  const isSelected = selectedIndex === index;
  const isFocused = focusedIndex === index;

  // @ts-ignore
  const content = typeof children === 'function' ? children({ isSelected, isFocused }) : children;
  return (
    <ReachTab ref={ref} as={AbstractButton} {...rest}>
      {content}
    </ReachTab>
  );
}) as unknown) as ComponentWithAs<'button', TabProps>;

export default React.memo(Tab);

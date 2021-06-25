import React from 'react';
import { Tab as ReachTab } from '@reach/tabs';
import type * as Polymorphic from '@reach/utils/polymorphic';
import AbstractButton from 'components/AbstractButton';
import { NativeAttributes } from 'components/Box';

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

type PrivateTabProps = TabRenderProps;

const Tab = (React.forwardRef<HTMLButtonElement, PrivateTabProps>(function Tab(
  { children, isSelected, isFocused, ...rest },
  ref
) {
  // @ts-ignore
  const content = typeof children === 'function' ? children({ isSelected, isFocused }) : children;
  return (
    <ReachTab ref={ref} as={AbstractButton} zIndex={1} {...rest}>
      {content}
    </ReachTab>
  );
}) as unknown) as Polymorphic.ForwardRefComponent<'button', TabProps>;

export default React.memo(Tab);

import React from 'react';
import { Tab as ReachTab } from '@reach/tabs';
import AbstractButton from '../AbstractButton';
import { ComponentWithAs } from '@reach/utils';

type TabRenderProps = {
  /** Whether the tab is selected */
  isSelected: boolean;

  /** Whether the tab is focused */
  isFocused: boolean;
};

export type TabProps = React.ComponentProps<'button'> & {
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
}) as unknown) as ComponentWithAs<'button', TabProps>;

export default React.memo(Tab);

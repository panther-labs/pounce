import React from 'react';
import { Tab as ReachTab, TabProps as ReachTabProps } from '@reach/tabs';
import AbstractButton from '../AbstractButton';
import { addOpacity } from '../../utils/helpers';
import useTheme from '../../utils/useTheme';

const Tab = React.forwardRef<HTMLButtonElement, ReachTabProps>(function Tab(
  { children, ...rest },
  ref
) {
  const theme = useTheme();
  const activeColor = 'blue-600';
  const focusBorderColor = addOpacity(theme.colors[activeColor], 0.1);

  return (
    <ReachTab
      as={AbstractButton}
      ref={ref}
      outline="none"
      borderBottom="3px solid"
      transition="border-color 300ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"
      borderColor="transparent"
      _hover={{
        borderColor: focusBorderColor,
      }}
      _focus={{
        borderColor: focusBorderColor,
      }}
      _selected={{
        borderColor: activeColor,
      }}
      {...rest}
    >
      {children}
    </ReachTab>
  );
});

export default React.memo(Tab);

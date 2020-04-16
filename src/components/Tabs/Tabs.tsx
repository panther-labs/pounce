import React from 'react';
import Box, { BoxProps } from '../Box';
import Flex, { FlexProps } from '../Flex';
import AbstractButton, { AbstractButtonProps } from '../AbstractButton';

export interface TabProps extends AbstractButtonProps {
  /**
   * Function triggered when tab is selected.
   */
  onSelect: () => void;

  /**
   * When true, the tab is selected.
   */
  selected?: boolean;
}

/**
 * A component to render as a control element for your tabs. Must be wrapped inside a `<Tablist>`
 * component
 */
export const Tab: React.FC<TabProps> = ({
  onClick,
  onSelect,
  selected,
  onKeyPress,
  disabled,
  ...rest
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e);
    onSelect();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyPress && onKeyPress(e);
    if (e.key === 'Enter' || e.key === ' ') {
      onSelect();
    }
  };

  // Add proper accessibility attributes
  const elementBasedProps = {
    'aria-selected': selected,
    role: 'tab',
    ...(disabled && {
      'aria-disabled': true,
    }),
  };

  return (
    <li>
      <AbstractButton
        outline="none"
        type="button"
        borderRadius="small"
        border="1px solid"
        fontSize={3}
        fontWeight="medium"
        borderColor={selected ? 'primary300' : 'grey100'}
        bg="white"
        color={selected ? 'primary300' : 'grey300'}
        px={5}
        py={3}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        selected={selected}
        _hover={{
          borderColor: !selected ? 'grey300' : undefined,
          color: !selected ? 'grey400' : undefined,
        }}
        _focus={{
          borderColor: !selected ? 'grey300' : undefined,
          color: !selected ? 'grey400' : undefined,
        }}
        {...rest}
        {...elementBasedProps}
      />
    </li>
  );
};

Tab.defaultProps = {
  selected: false,
};

export type TabListProps = FlexProps;

export const TabList: React.FC<TabListProps> = props => (
  <Flex as="ul" role="tablist" flexWrap="wrap" {...props} />
);

export interface TabPanelProps extends BoxProps {
  /**
   * When true, the content of the tab should be visible.
   */
  selected?: boolean;

  /**
   * By default, each TabPanel only mounts/renders when it's selected. If this props is true,
   * the content of the tab will always render but be invisible when it's not acttive
   */
  shouldRender?: boolean;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  selected,
  shouldRender,
  children,
  ...rest
}) => (
  <Box
    role="tabpanel"
    aria-hidden={!selected ? 'true' : 'false'}
    style={!selected ? { display: 'none' } : undefined}
    {...rest}
  >
    {selected || shouldRender ? children : null}
  </Box>
);

TabPanel.defaultProps = {
  selected: false,
  shouldRender: false,
};

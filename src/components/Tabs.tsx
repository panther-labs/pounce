import React from 'react';
import css from '@styled-system/css';
import Box, { BoxProps } from 'components/Box';
import Flex, { FlexProps } from 'components/Flex';
import BaseButton, { BaseButtonProps } from 'components/BaseButton';

export interface TabProps extends BaseButtonProps {
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
      <BaseButton
        borderRadius="small"
        border="1px solid"
        fontSize={3}
        fontWeight="bold"
        borderColor={selected ? 'primary300' : 'grey100'}
        bg="white"
        color={selected ? 'primary300' : 'grey300'}
        px={8}
        py={3}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        css={css({
          outline: 0,
          transition: 'color 0.1s ease-in-out, border-color 0.1s ease-in-out',

          // @ts-ignore
          ':hover, :focus': !selected && {
            borderColor: 'grey300',
            color: 'grey400',
          },
        })}
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

export const TabList: React.FC<TabListProps> = props => <Flex as="ul" role="tablist" {...props} />;

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

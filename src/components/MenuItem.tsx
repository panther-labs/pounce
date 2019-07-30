import React from 'react';
import styled from 'styled-components';
import Box, { BoxProps } from 'components/Box';
import Text from 'components/Text';
import { convertHexToRgba } from '../utils/helpers';

const StyledBox = styled(Box)`
  transition: background-color 0.1s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => convertHexToRgba(theme.colors.black, 0.02)};
  }
`;

interface MenuItemProps extends BoxProps {
  /** Whether the current item is highlighted through the keyboard **/
  highlighted?: boolean;

  /** Whether the current item is currently selected **/
  selected?: boolean;
}

/**
 * A MenuItem is simply an entry in a list of menu options or dropdown options. In general, this
 * should be used only on autocompletes, comboboxes & menus.
 */
const MenuItem: React.FC<MenuItemProps> = ({ highlighted, selected, ...rest }) => {
  const bg = (() => {
    if (selected) {
      return 'grey100';
    }
    if (highlighted) {
      return 'grey50';
    }
    return 'transparent';
  })();
  return (
    <StyledBox px={5} py={4} bg={bg}>
      <Text size="large" color="black" {...rest} />
    </StyledBox>
  );
};

export default MenuItem;

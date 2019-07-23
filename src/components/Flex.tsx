import React from 'react';
import styled from 'styled-components';
import * as StyledSystem from 'styled-system';
import Box, { BoxProps } from './Box';

export interface FlexProps extends BoxProps, StyledSystem.FlexboxProps, StyledSystem.DisplayProps {}

const BaseFlex: React.FC<FlexProps> = styled(Box)`
  ${StyledSystem.flexbox}
  ${StyledSystem.display}
`;

/**
 * Extends <a href="/#/Box">Box</a>
 *
 * Responsive flexbox layout component. You should use this anytime you want a flex container or
 * wrapper around a certain layout
 */
const Flex: React.FC<Omit<FlexProps, 'display'>> = props => <BaseFlex display="flex" {...props} />;

export default Flex;

import React from 'react';
import styled from '@emotion/styled';
import * as StyledSystem from 'styled-system';
import Box, { BoxProps } from 'components/Box';

export interface GridProps extends BoxProps, StyledSystem.GridProps, StyledSystem.DisplayProps {}

const BaseGrid: React.FC<GridProps> = styled(Box)`
  ${StyledSystem.grid}
  ${StyledSystem.display}
`;

/**
 * Extends <a href="/#/Box">Box</a>
 *
 * Grid layout component. You should use this anytime you want to create a container for columns
 * within the design
 */
const Grid: React.FC<Omit<GridProps, 'display'>> = props => <BaseGrid display="grid" {...props} />;

export default Grid;

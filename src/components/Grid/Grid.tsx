import React from 'react';
// import styled from '@emotion/styled';
// import * as StyledSystem from 'styled-system';
import Box, { BoxProps } from '../Box';

export type GridProps = BoxProps;

// const BaseGrid = styled<React.FC<GridProps>>(Box)`
//   ${StyledSystem.grid}
//   ${StyledSystem.display}
// `;

/**
 * Extends <a href="/#/Box">Box</a>
 *
 * Grid layout component. You should use this anytime you want to create a container for columns
 * within the design
 */
const Grid: React.FC<Omit<GridProps, 'display'>> = props => <Box display="grid" {...props} />;

export default Grid;

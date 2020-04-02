import React from 'react';
// import styled from '@emotion/styled';
// import * as StyledSystem from 'styled-system';
import Box, { BoxProps } from '../Box';

/*
// const Flex = styled<React.FC<Omit<BoxProps, 'display'>>>(Box)({
//   display: 'flex',
// });

  direction?: StyledSystemProps['flexDirection'];
  justify?: StyledSystemProps['justifyContent'];
  align?: StyledSystemProps['alignItems'];
 */

export type FlexProps = BoxProps;
/**
 * Extends <a href="/#/Box">Box</a>
 *
 * Responsive flexbox layout component. You should use this anytime you want a flex container or
 * wrapper around a certain layout
 */
const Flex: React.FC<Omit<BoxProps, 'display'>> = props => <Box display="flex" {...props} />;

export default Flex;

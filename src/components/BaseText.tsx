import React from 'react';
import styled from 'styled-components';
import * as StyledSystem from 'styled-system';
import Box, { BoxProps } from './Box';

export interface BaseTextProps extends BoxProps, StyledSystem.TypographyProps {}

const StyledText = styled(Box)`
  ${StyledSystem.typography}
`;

const BaseText: React.FC<BaseTextProps> = props => (
  <StyledText fontFamily="primary" color="inherit" {...props} />
);

export default BaseText;

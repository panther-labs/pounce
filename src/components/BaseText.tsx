import React from 'react';
import styled from '@emotion/styled';
import * as StyledSystem from 'styled-system';
import Box, { BoxProps } from './Box';

export interface BaseTextProps<T = HTMLDivElement>
  extends BoxProps<T>,
    StyledSystem.TypographyProps {}

const StyledText = styled(Box)`
  ${StyledSystem.typography}
`;

const BaseText: React.FC<BaseTextProps> = props => <StyledText {...props} />;

export default BaseText;

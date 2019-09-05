import React from 'react';
import styled from 'styled-components';
import * as CSS from 'csstype';
import * as StyledSystem from 'styled-system';
import Box, { BoxProps } from 'components/Box';
import { textDecoration } from '../extensions';

export interface BaseTextProps<T = HTMLDivElement>
  extends BoxProps<T>,
    StyledSystem.TypographyProps {
  /** The standard text-decoration CSS property */
  textDecoration?: CSS.StandardShorthandProperties['textDecoration'];
}

const StyledText = styled(Box)`
  ${StyledSystem.typography}
  ${textDecoration}
`;

const BaseText: React.FC<BaseTextProps> = props => <StyledText {...props} />;

export default BaseText;

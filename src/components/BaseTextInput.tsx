import React from 'react';
import styled from 'styled-components';
import Box, { BoxProps } from 'components/Box';
import Label from 'components/Label';
import Text from 'components/Text';
import Icon from 'components/Icon';
import Flex from 'components/Flex';
import { slugify } from 'utils/helpers';

const StyledBoxWithBorder = styled(Box)`
  border: ${({ theme }) => `1px solid ${theme.colors.transparent}`};

  &:focus,
  &:active {
    border: ${({ theme }) => `1px solid ${theme.colors.grey100}`};
  }
`;

export interface BaseTextInputProps extends BoxProps {
  /** The label that is associated with this input */
  label?: string;

  /** Whether the input has an error. If the value is not falsy, then its value will
   * be shown below the input. If the value is falsy, then the TextInput is considered fully valid
   */
  error?: string;
}

const BaseTextInput: React.FC<
  BaseTextInputProps & Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'height' | 'width' | 'color'>
> = ({ label, error, ...rest }) => (
  <React.Fragment>
    {!!label && (
      <Box my={3}>
        <Label size="large" htmlFor={slugify(label)} color="grey500">
          {label}
        </Label>
      </Box>
    )}
    <StyledBoxWithBorder
      id={label ? slugify(label) : undefined}
      borderRadius="small"
      bg="grey50"
      color={!error ? 'grey400' : 'red300'}
      fontSize={3}
      px={5}
      py={3}
      {...rest}
    />
    {!!error && (
      <Box py={4} px={5} color="red300">
        <Flex alignItems="center">
          <Icon type="warning" mr={2} />
          <Text size="medium">{error}</Text>
        </Flex>
      </Box>
    )}
  </React.Fragment>
);

BaseTextInput.defaultProps = {
  label: '',
  error: '',
};

export default BaseTextInput;

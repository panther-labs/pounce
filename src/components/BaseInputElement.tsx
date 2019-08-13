import React from 'react';
import styled, { css } from 'styled-components';
import Box, { BoxProps } from 'components/Box';
import Text from 'components/Text';
import Icon from 'components/Icon';
import Flex from 'components/Flex';
import { separateStyledSystemProps, slugify } from 'utils/helpers';
import Label, { LabelProps } from 'components/Label';

type InputElementOuterBoxProps = BoxProps & {
  /** Whether the element should be disabled */
  disabled?: boolean;
};

export const InputElementOuterBox = styled<React.FC<InputElementOuterBoxProps>>(props => (
  <Box borderRadius="small" bg="grey50" {...props} />
))`
  overflow: hidden;
  border: ${({ theme }) => `1px solid ${theme.colors.transparent}`};

  &:focus,
  &:focus-within,
  &:active {
    border: ${({ theme }) => `1px solid ${theme.colors.grey100}`};
  }

  &[disabled] {
    opacity: 0.3;
    pointer-events: none;
  }
`;

InputElementOuterBox.defaultProps = {
  disabled: false,
};

export type InputElementInnerBoxProps = BoxProps<HTMLInputElement> &
  React.HTMLProps<HTMLInputElement>;

export const InputElementInnerBox: React.FC<InputElementInnerBoxProps> = props => (
  <Box
    css={css`
      outline: none;
    `}
    px={4}
    py={3}
    fontSize={3}
    border={0}
    bg="transparent"
    {...props}
  />
);

export const InputElementLabel: React.FC<Omit<LabelProps, 'size'>> = ({ children, ...rest }) => (
  <Box my={3}>
    <Label size="large" color="grey500" {...rest}>
      {children}
    </Label>
  </Box>
);

export type BaseInputElementProps = InputElementOuterBoxProps &
  InputElementInnerBoxProps & {
    /** The label that is associated with this input */
    label?: string;

    /** Whether the input has an error. If the value is not falsy, then its value will
     * be shown below the input. If the value is falsy, then the TextInput is considered fully valid
     */
    error?: string;
  };

const BaseInputElement: React.FC<BaseInputElementProps> = ({ label, error, as, ...rest }) => {
  const [styledSystemProps, nativeHtmlProps] = separateStyledSystemProps(rest);

  return (
    <Box {...styledSystemProps}>
      {!!label && (
        <InputElementLabel htmlFor={slugify(label)} color={error ? 'red300' : 'grey500'}>
          {label}
        </InputElementLabel>
      )}
      <InputElementOuterBox>
        <InputElementInnerBox
          as={as}
          width={1}
          id={label ? slugify(label) : undefined}
          color={!error ? 'grey400' : 'red300'}
          {...nativeHtmlProps}
        />
      </InputElementOuterBox>
      {error && (
        <Box py={4} px={4} color="red300">
          <Flex alignItems="center">
            <Icon size="small" type="warning" mr={2} flex="0 0 auto" />
            <Text size="medium">{error}</Text>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

BaseInputElement.defaultProps = {
  label: '',
  error: '',
};

export default React.memo(BaseInputElement);

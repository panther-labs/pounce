import React from 'react';
import { css, useTheme } from '@emotion/react';
import Box, { BoxProps } from '../Box';
import Text from '../Text';
import Icon from '../Icon';
import Flex from '../Flex';
import { separateStyledSystemProps, slugify } from '../../utils/helpers';
import Label, { LabelProps } from '../Label';

type InputElementOuterBoxProps = BoxProps & {
  /** Whether the element should be disabled */
  disabled?: boolean;
};

export const InputElementOuterBox: React.FC<InputElementOuterBoxProps> = props => {
  const theme = useTheme();
  return (
    <Box
      borderRadius="small"
      bg="grey50"
      css={css`
        overflow: hidden;
        border: 1px solid ${theme.colors.transparent};

        &:focus,
        &:focus-within,
        &:active {
          border: 1px solid ${theme.colors.grey100};
        }

        &[disabled] {
          opacity: 0.3;
          pointer-events: none;
        }
      `}
      {...props}
    />
  );
};

InputElementOuterBox.defaultProps = {
  disabled: false,
};

export type InputElementInnerBoxProps = BoxProps<React.AllHTMLAttributes<HTMLInputElement>> &
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
    color="grey400"
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

export const InputElementErrorLabel: React.FC<BoxProps> = ({ children, ...rest }) => (
  <Box color="red300" {...rest}>
    <Flex alignItems="center">
      <Icon size="small" type="warning" mr={2} flex="0 0 auto" />
      <Text size="medium">{children}</Text>
    </Flex>
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

const BaseInputElement: React.FC<BaseInputElementProps> = ({
  label,
  error,
  is,
  disabled,
  ...rest
}) => {
  const [styledSystemProps, nativeHtmlProps] = separateStyledSystemProps(rest);

  return (
    <Box {...styledSystemProps}>
      {!!label && (
        <InputElementLabel htmlFor={slugify(label)} color={error ? 'red300' : 'grey500'}>
          {label}
        </InputElementLabel>
      )}
      <InputElementOuterBox disabled={disabled}>
        <InputElementInnerBox
          is={is}
          disabled={disabled}
          width={1}
          id={label ? slugify(label) : undefined}
          color={!error ? 'grey400' : 'red300'}
          {...nativeHtmlProps}
        />
      </InputElementOuterBox>
      {error && (
        <InputElementErrorLabel py={4} px={4}>
          {error}
        </InputElementErrorLabel>
      )}
    </Box>
  );
};

BaseInputElement.defaultProps = {
  label: '',
  error: '',
};

export default React.memo(BaseInputElement);

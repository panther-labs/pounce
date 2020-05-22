import React from 'react';
import Box, { BoxProps } from '../Box';
import { addOpacity } from '../../utils/helpers';
import PseudoBox from '../PseudoBox';

const hoverColor = addOpacity('navyblue-450', 0.2);

const renderOuterPseudoElement = (checked: boolean): BoxProps => ({
  content: '""',
  display: 'block',
  width: 28,
  height: 28,
  border: '1px solid',
  borderRadius: 'circle',
  borderColor: checked ? 'blue-600' : 'navyblue-450',
});

const renderInnerPseudoElement = (checked: boolean): BoxProps => {
  if (!checked) {
    return {};
  }

  return {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    width: 12,
    height: 12,
    backgroundColor: 'white',
    borderRadius: 'circle',
  };
};

export interface CheckboxProps {
  /** Whether the checkbox should be checked or not */
  checked: boolean;

  /** Whether the checkbox is currently disabled */
  disabled?: boolean;

  /** The label associated with the Checkbox. Appears on the right. */
  label?: string;

  /** What happens when the value of the checkbox changes */
  onChange: (checked: boolean, e: React.SyntheticEvent) => void;
}

/* Your bread & butter checkbox element. Nothing new here */
const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, disabled, label, ...rest }) => {
  return (
    <Box
      as="label"
      display="inline-flex"
      alignItems="center"
      cursor="pointer"
      fontSize="medium"
      fontWeight="medium"
      color="white"
      opacity={disabled ? 0.3 : 1}
      pointerEvents={disabled ? 'none' : 'all'}
    >
      <PseudoBox
        position="relative"
        borderRadius="circle"
        p={4}
        disabled={disabled}
        transition="background-color 0.15s linear"
        _hover={{
          backgroundColor: hoverColor,
        }}
        _focusWithin={{
          backgroundColor: hoverColor,
        }}
        _before={renderInnerPseudoElement(checked)}
        _after={renderOuterPseudoElement(checked)}
      >
        <Box
          as="input"
          position="absolute"
          opacity={0}
          type="checkbox"
          aria-checked={checked}
          checked={checked}
          disabled={disabled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked, e)}
          {...rest}
        />
      </PseudoBox>
      {label && (
        <Box as="span" userSelect="none">
          {label}
        </Box>
      )}
    </Box>
  );
};

export default Checkbox;

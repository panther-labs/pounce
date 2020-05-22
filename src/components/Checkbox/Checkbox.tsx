import React from 'react';
import Box, { BoxProps } from '../Box';
import { addOpacity } from '../../utils/helpers';
import PseudoBox from '../PseudoBox';
import { disabledStyles } from '../../utils/common';

const renderOuterPseudoElement = (checked: boolean): BoxProps => ({
  content: '""',
  display: 'block',
  width: 28,
  height: 28,
  border: '1px solid',
  borderRadius: 'small',
  borderColor: checked ? 'blue-600' : 'navyblue-450',
});

const renderInnerPseudoElement = (checked: boolean): BoxProps => {
  if (!checked) {
    return {};
  }

  return {
    content: `url( 'data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 18" fill="white"><path d="M7 14.17L2.83 10l-1.41 1.41L7 17 19 5l-1.41-1.42L7 14.17z" /></svg>' )`,
    display: 'block',
    position: 'absolute',
    width: 'fit-content',
    height: 'fit-content',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
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
const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  disabled,
  label,
  ...rest
}) => {
  return (
    <Box
      as="label"
      display="inline-flex"
      alignItems="center"
      cursor="pointer"
      fontSize="medium"
      fontWeight="medium"
      color="white"
      {...(disabled && disabledStyles)}
    >
      <PseudoBox
        position="relative"
        borderRadius="circle"
        p={4}
        transition="background-color 0.15s linear"
        _hover={{
          backgroundColor: addOpacity('navyblue-450', 0.2),
        }}
        _focusWithin={{
          backgroundColor: addOpacity('navyblue-450', 0.2),
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

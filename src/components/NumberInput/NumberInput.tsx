import React from 'react';
import { NativeAttributes } from '../Box';
import { slugify, noop, isEmptyValue } from '../../utils/helpers';
import { typedMemo } from '../../utils/helpers';
import { InputControl, InputElement, InputLabel } from '../utils/Input';
import AbstractButton from '../AbstractButton';
import Icon from '../Icon';
import Flex from '../Flex';

export type NumberInputProps = NativeAttributes<'input'> & {
  /** Callback when the number changes */
  onInputNumberChange?: (e: number) => void;

  /** Callback when the number changes */
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;

  /**
   * The value of the input number.
   * */
  value: number | null;

  /** The label that is associated with this input */
  label: string;

  /** Whether the input has an invalid value */
  invalid?: boolean;

  /** Whether the input is required or not */
  required?: boolean;

  /** Whether the input is disabled or not */
  disabled?: boolean;

  /** The max number that the input can accept */
  max?: number;

  /** The min number that the input can accept */
  min?: number;

  /** The step in which the input increases */
  step?: number;
};

/**
 * A number input is a typical HTML <input> for numbers
 */
function NumberInput({
  label,
  invalid,
  required,
  disabled,
  id,
  name,
  value = 0,
  max,
  min,
  onInputNumberChange = noop,
  onChange = noop,
  ...rest
}: NumberInputProps): React.ReactElement<NumberInputProps> {
  const [inputNumberValue, setInputNumberValue] = React.useState(0);

  const _ref = React.useRef<HTMLInputElement>(null);

  React.useLayoutEffect(() => {
    setInputNumberValue(value);
  }, [value]);

  const _onChange = React.useCallback(
    (num): void => {
      onInputNumberChange(num);
      setInputNumberValue(num);
    },
    [onInputNumberChange, setInputNumberValue]
  );

  const stepUp = React.useCallback(() => {
    _ref.current?.stepUp();
    _onChange(_ref.current?.value);
  }, [_ref, _onChange, setInputNumberValue]);

  const stepDown = React.useCallback(() => {
    _ref.current?.stepDown();
    _onChange(_ref.current?.value);
  }, [_ref, _onChange, setInputNumberValue]);

  const identifier = id || name || slugify(label);

  const inputNumberProps = {
    ...rest,
    onChange: (e: React.FormEvent<HTMLInputElement>) => {
      setInputNumberValue(Number(e.currentTarget.value));
      _onChange(e.currentTarget.value);
      onChange(e);
    },
  };
  return (
    <InputControl invalid={invalid} disabled={disabled} required={required}>
      <InputElement
        as="input"
        type="number"
        role="spinbutton"
        id={identifier}
        name={name}
        value={inputNumberValue}
        aria-valuenow={value !== undefined ? Number(value) : undefined}
        max={max}
        aria-valuemax={max}
        min={min}
        aria-valuemin={min}
        ref={_ref}
        {...inputNumberProps}
      />
      <InputLabel raised={!isEmptyValue(value)} htmlFor={identifier}>
        {label}
      </InputLabel>
      <Flex
        direction="column"
        position="absolute"
        top={0}
        right={0}
        height="100%"
        color="white"
        borderLeft="1px solid"
        borderColor="navyblue-300"
      >
        <AbstractButton aria-label="Increment" aria-hidden tabIndex={-1} onClick={stepUp}>
          <Icon type="caret-up" size="large" />
        </AbstractButton>
        <AbstractButton aria-label="Decrement" aria-hidden tabIndex={-1} onClick={stepDown}>
          <Icon type="caret-down" size="large" />
        </AbstractButton>
      </Flex>
    </InputControl>
  );
}

export default typedMemo(NumberInput);

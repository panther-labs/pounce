import React from 'react';
import { NativeAttributes } from '../Box';
import { slugify } from '../../utils/helpers';
import { InputControl, InputElement, InputLabel } from '../utils/Input';
import AbstractButton from '../AbstractButton';
import Icon from '../Icon';
import Flex from '../Flex';

export type NumberInputProps = NativeAttributes<'input'> & {
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
const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  { label, invalid, required, disabled, id, name, value, max, min, ...rest },
  ref
) {
  const _ref = React.useRef<HTMLInputElement>(null);
  const identifier = id || name || slugify(label);

  const mergeRefs = React.useCallback((element: HTMLInputElement) => {
    (_ref as React.MutableRefObject<HTMLInputElement>).current = element;
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLInputElement>).current = element;
    }
  }, []);

  return (
    <InputControl invalid={invalid} disabled={disabled} required={required}>
      <InputElement
        as="input"
        type="number"
        role="spinbutton"
        id={identifier}
        name={name}
        value={value}
        aria-valuenow={value !== undefined ? Number(value) : undefined}
        max={max}
        aria-valuemax={max}
        min={min}
        aria-valuemin={min}
        {...rest}
        ref={mergeRefs}
      />
      <InputLabel raised={value !== undefined} htmlFor={identifier}>
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
        <AbstractButton
          aria-label="Increment"
          aria-hidden
          tabIndex={-1}
          onClick={() => _ref.current?.stepUp()}
        >
          <Icon type="caret-up" size="large" />
        </AbstractButton>
        <AbstractButton
          aria-label="Decrement"
          aria-hidden
          tabIndex={-1}
          onClick={() => _ref.current?.stepDown()}
        >
          <Icon type="caret-down" size="large" />
        </AbstractButton>
      </Flex>
    </InputControl>
  );
});

export default React.memo(NumberInput);

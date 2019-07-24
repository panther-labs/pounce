import React from 'react';
import BaseTextInput, { BaseTextInputProps } from 'components/BaseTextInput';

export { BaseTextInputProps as TextInputProps };

/** The typical text input that you are going to use in most forms */
const TextInput = (props: BaseTextInputProps) => (
  <BaseTextInput as="input" type="text" {...props} />
);

export default TextInput;

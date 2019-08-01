import React from 'react';
import BaseInputElement, { BaseInputElementProps } from 'components/BaseInputElement';

export type TextInputProps = BaseInputElementProps;

/** The typical text input that you are going to use in most forms */
const TextInput = (props: TextInputProps) => <BaseInputElement as="input" {...props} />;

export default TextInput;

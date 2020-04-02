import React from 'react';
import BaseInputElement, { BaseInputElementProps } from '../BaseInputElement';

export type TextInputProps = BaseInputElementProps;

/** The typical text input that you are going to use in most forms */
const TextInput = (props: TextInputProps) => <BaseInputElement is="input" type="text" {...props} />;

export default TextInput;

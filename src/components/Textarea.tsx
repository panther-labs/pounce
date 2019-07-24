import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import BaseTextInput, { BaseTextInputProps } from 'components/BaseTextInput';

export { BaseTextInputProps as TextareaProps };

/** The typical text input that you are going to use in most forms */
const Textarea = (props: BaseTextInputProps) => <BaseTextInput as={TextareaAutosize} {...props} />;

export default Textarea;

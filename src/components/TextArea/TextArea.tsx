import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ReactAttributes } from '../Box';
import Input, { InputProps } from '../Input';

export type TextAreaProps = ReactAttributes<React.TextareaHTMLAttributes<HTMLTextAreaElement>> &
  Pick<InputProps, 'variant' | 'label' | 'error'>;

/** A typical, dynamically sized textarea that you are going to use in most forms */
// @ts-ignore Typescript thinks that this declaration doesn't properly extend React.Component
const TextArea = (props: TextAreaProps) => (
  <Input as={TextareaAutosize} verticalAlign="top" {...props} />
);

export default TextArea;

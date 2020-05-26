import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ReactAttributes } from '../Box';
import AbstractInput, { AbstractInputProps } from '../AbstractInput';

export type TextAreaProps = ReactAttributes<React.TextareaHTMLAttributes<HTMLTextAreaElement>> &
  Pick<AbstractInputProps, 'variant' | 'label' | 'invalid'>;

/** A typical, dynamically sized textarea that you are going to use in most forms */
const TextArea = (props: TextAreaProps) => (
  <AbstractInput as={TextareaAutosize} verticalAlign="top" {...props} />
);

export default TextArea;

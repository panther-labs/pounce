import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import BaseInputElement, { BaseInputElementProps } from 'components/BaseInputElement';

export type TextareaProps = BaseInputElementProps;

/** A typical, dynamically sized textarea that you are going to use in most forms */
// @ts-ignore Typescript thinks that this declaration doesn't properly extend React.Component
const Textarea = (props: TextareaProps) => <BaseInputElement is={TextareaAutosize} {...props} />;

export default Textarea;

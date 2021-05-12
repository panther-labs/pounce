import React from 'react';
import { PounceComponentProps } from '../../system';
import { __DEV__ } from '../../utils/helpers';

export type TextProps<T extends React.ElementType = any> = PounceComponentProps<T>;

/**
 * Extends <a href="/#/Box">Box</a>
 *
 * Responsive typographic component. Anywhere you want to add some text that doesn't constitute a
 * heading or a title, this component is what you need.
 *
 * */
const Text: React.FC<TextProps> = ({ children }) => {
  return <p>{children}</p>;
};

export default Text;

if (__DEV__) {
  Text.displayName = 'Text';
}

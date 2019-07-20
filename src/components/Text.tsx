import React from 'react';
import { Text as RebassText, TextProps } from 'rebass';

/**
 * Extends <a href="/#/Box">Box</a>
 *
 * Responsive typographic component. Anywhere you want to add some text that doesn't constitute a heading or a title,
 this component is what you need. */
const Text: React.FC<TextProps> = props => (
  <RebassText fontFamily="primary" color="grey500" fontSize={2} {...props} />
);

export default Text;

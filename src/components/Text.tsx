import React from 'react';
import BaseText, { BaseTextProps } from 'components/BaseText';

export interface TextProps extends BaseTextProps {
  /** The size of the font */
  size: 'medium' | 'large';
}
/**
 * Extends <a href="/#/Box">Box</a>
 *
 * Responsive typographic component. Anywhere you want to add some text that doesn't constitute a
 * heading or a title, this component is what you need.
 *
 * */
const Text: React.FC<TextProps> = ({ size, ...rest }) => {
  const sizeProps = (function() {
    switch (size) {
      case 'large':
        return { fontSize: 3, lineHeight: 3 };
      case 'medium':
      default:
        return { fontSize: 2, lineHeight: 2 };
    }
  })();

  return <BaseText {...sizeProps} {...rest} />;
};

export default Text;

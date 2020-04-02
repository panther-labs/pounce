import React from 'react';
import BaseText, { BaseTextProps } from '../BaseText';

export interface TextProps extends BaseTextProps {
  /** The size of the font */
  size: 'small' | 'medium' | 'large';
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
        return { fontSize: 2, lineHeight: 2 };
      case 'small':
      default:
        return { fontSize: 1, lineHeight: 1 };
    }
  })();

  return <BaseText {...sizeProps} {...rest} />;
};

export default Text;

/*
export const truncate = props => {
  if (props.isTruncated) {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    };
  }
};
 */

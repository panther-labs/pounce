import React from 'react';
import BaseText, { BaseTextProps } from 'components/BaseText';
import { Theme } from 'src/themes/default';

export interface HeadingProps extends BaseTextProps {
  /** The size of the font */
  size: 'medium' | 'large';
}

/**
 * Responsive typographic component. Anywhere you want to add a title to something
 * then you can use this
 * */
const Heading: React.FC<HeadingProps> = ({ size, ...rest }) => {
  const sizeProps = (function() {
    switch (size) {
      case 'large':
        return { fontWeight: 'bold', fontSize: 5, lineHeight: 5 };
      case 'medium':
      default:
        return { fontWeight: 'normal', fontSize: 4, lineHeight: 4 };
    }
  })() as { fontWeight: keyof Theme['fontWeights']; fontSize: number };

  return <BaseText is="h1" {...sizeProps} {...rest} />;
};

export default Heading;

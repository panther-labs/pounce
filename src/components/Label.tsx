import React from 'react';
import BaseText, { BaseTextProps } from './BaseText';

export interface LabelProps extends BaseTextProps {
  /** The size of the font */
  size: 'extra-small' | 'small' | 'medium' | 'large';
}

/** Responsive typographic component. Use it within forms or wherever something needs to be labeled */
const Label: React.FC<LabelProps> = ({ size, ...rest }) => {
  const sizeProps = (function() {
    switch (size) {
      case 'large':
        return { fontWeight: 'normal', fontSize: 3 };
      case 'medium':
        return { fontWeight: 'normal', fontSize: 2 };
      case 'small':
        return { fontWeight: 'bold', fontSize: 1 };
      case 'extra-small':
      default:
        return { fontWeight: 'normal', fontSize: 0 };
    }
  })() as { fontWeight: 'normal' | 'bold'; fontSize: number };

  return <BaseText as="label" {...sizeProps} {...rest} />;
};

Label.defaultProps = {
  size: 'medium',
};

export default Label;

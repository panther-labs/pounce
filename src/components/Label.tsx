import React from 'react';
import BaseText, { BaseTextProps } from 'components/BaseText';
import { Theme } from 'themes/default';

export interface LabelProps extends BaseTextProps {
  /** The size of the font */
  size?: 'extra-small' | 'small' | 'medium' | 'large';
}

/** Responsive typographic component. Use it within forms or wherever something needs to be labeled */
const Label: React.FC<LabelProps> = ({ size, ...rest }) => {
  const sizeProps = (function() {
    switch (size) {
      case 'large':
        return { fontWeight: 'medium', fontSize: 3 };
      case 'medium':
        return { fontWeight: 'medium', fontSize: 2 };
      case 'small':
        return { fontWeight: 'bolder', fontSize: 1 };
      case 'extra-small':
      default:
        return { fontWeight: 'medium', fontSize: 0 };
    }
  })() as { fontWeight: keyof Theme['fontWeights']; fontSize: number };

  return <BaseText as="label" {...sizeProps} {...rest} />;
};

Label.defaultProps = {
  size: 'medium',
};

export default Label;

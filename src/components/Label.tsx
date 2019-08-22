import React, { LabelHTMLAttributes } from 'react';
import BaseText, { BaseTextProps } from 'components/BaseText';
import { DefaultTheme } from 'styled-components';

export type LabelProps = BaseTextProps &
  LabelHTMLAttributes<'label'> & {
    /** The size of the font */
    size: 'extra-small' | 'small' | 'medium' | 'large';
  };

/**
 * Responsive typographic component. Use it within forms or wherever something needs to be labeled
 * */
const Label: React.FC<LabelProps> = ({ size, ...rest }) => {
  const sizeProps = (function() {
    switch (size) {
      case 'large':
        return { fontWeight: 'bold', fontSize: 3, lineHeight: 3 };
      case 'medium':
        return { fontWeight: 'bold', fontSize: 2, lineHeight: 2 };
      case 'small':
        return { fontWeight: 'bolder', fontSize: 1, lineHeight: 1 };
      case 'extra-small':
      default:
        return { fontWeight: 'bold', fontSize: 0, lineHeight: 0 };
    }
  })() as { fontWeight: keyof DefaultTheme['fontWeights']; fontSize: number };

  return <BaseText is="label" {...sizeProps} {...rest} />;
};

export default Label;

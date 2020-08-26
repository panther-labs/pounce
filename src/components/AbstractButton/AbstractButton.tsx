import Box, { BoxProps } from '../Box';
import { defaultButtonStyles } from './utils';

export type AbstractButtonProps = BoxProps<'button'>;

export const AbstractButton = Box;

// The component should render a button by default, with some default styles
AbstractButton.defaultProps = {
  as: 'button',
  type: 'button',
  ...defaultButtonStyles,
};

export default AbstractButton;

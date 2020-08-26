import Box, { BoxProps } from '../Box';
import { defaultButtonStyles } from './utils';

export type AbstractButtonProps = BoxProps<'button'>;

export const AbstractButton = Box;

AbstractButton.defaultProps = {
  as: 'button',
  type: 'button',
  ...defaultButtonStyles,
};

export default AbstractButton;

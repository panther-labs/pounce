import * as React from 'react';

export interface ButtonProps {
  /** The color of the button */
  color?: string;

  /** The shape of the button */
  shape: 'pill' | 'rect';
  /**
   * Callback function
   */
  onClick: () => void;
}

/**
 * The core re-usable button.
 */
const Button: React.FC<ButtonProps> = props => <button {...props}>hello world</button>;

Button.defaultProps = {
  color: 'black',
  shape: 'pill',
};

export default Button;

import React from 'react';
import { keyframes } from '@emotion/react';
import { Theme } from '../../theme';
import { pounce, SystemProps } from '../../system';

export interface SpinnerProps extends SystemProps {
  /** Delay after which spinner should be visible. */
  delay?: number;

  /** The size of the spinner, */
  size?: 'small' | 'medium' | 'large';

  /** The color of the spinner. Defaults to the current text color */
  color?: keyof Theme['colors'];
}

const spinningKeyframes = keyframes`
  0% {
    transform: rotate(0);
  }
  
  100% {
    transform: rotate(360deg);
  }
`;

const circleKeyframes = keyframes`
  0% {
    stroke-dashoffset: 600;
  }
  
  100% {
    stroke-dashoffset: 0;
  }
`;

/**
 *
 * Extends Box.
 *
 * A simple spinner component that allows you to display that something is loading
 */
const Spinner: React.FC<SpinnerProps> = ({
  delay = 0,
  size = 'medium',
  color = 'current',
  ...rest
}) => {
  const [isVisible, setVisibility] = React.useState(delay === 0);
  const delayTimer = React.useRef(0);

  React.useEffect(() => {
    if (delay && delay > 0) {
      delayTimer.current = window.setTimeout(() => setVisibility(true), delay);
    }
    return () => clearTimeout(delayTimer.current);
  }, []);

  if (!isVisible) {
    return null;
  }

  const sizeProps = (() => {
    switch (size) {
      case 'small':
        return { width: '18px', height: '18px' };
      case 'medium':
        return { width: '36px', height: '36px' };
      case 'large':
      default:
        return { width: '54px', height: '54px' };
    }
  })();

  return (
    <pounce.svg
      display="inline-block"
      verticalAlign="sub"
      animation={`${spinningKeyframes} 2s linear infinite`}
      viewBox="0 0 150 150"
      aria-label="Loading..."
      {...sizeProps}
      {...rest}
    >
      <pounce.circle
        cx="75"
        cy="75"
        r="60"
        strokeDashoffset={600}
        strokeDasharray={300}
        strokeWidth={13}
        strokeMiterlimit={10}
        strokeLinecap="round"
        animation={`${circleKeyframes} 1.6s cubic-bezier(0.4, 0.15, 0.6, 0.85) infinite`}
        stroke={color}
        fill="transparent"
      />
    </pounce.svg>
  );
};

export default Spinner;

import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Box, { BoxProps } from 'components/Box';
import { Theme } from 'theme';

export interface SpinnerProps extends BoxProps<'svg'> {
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

const StyledCircle = styled.circle<Required<Pick<SpinnerProps, 'color'>>>`
  stroke-dashoffset: 600;
  stroke-dasharray: 300;
  stroke-width: 13;
  stroke-miterlimit: 10;
  stroke-linecap: round;
  animation: ${circleKeyframes} 1.6s cubic-bezier(0.4, 0.15, 0.6, 0.85) infinite;
  stroke: ${({ theme, color }) => theme.colors[color]};
  fill: transparent;
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
    <Box
      as="svg"
      display="inline-block"
      verticalAlign="sub"
      animation={`${spinningKeyframes} 2s linear infinite`}
      viewBox="0 0 150 150"
      aria-label="Loading..."
      {...sizeProps}
      {...rest}
    >
      <StyledCircle cx="75" cy="75" r="60" color={color} />
    </Box>
  );
};

export default React.memo(Spinner);

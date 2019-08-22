import React from 'react';
import styled, { keyframes } from 'styled-components';
import Box, { BoxProps } from './Box';

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

const StyledCircleContainer = styled.svg`
  animation: ${spinningKeyframes} 2s linear infinite;
`;

const StyledCircle = styled.circle`
  stroke-dashoffset: 600;
  stroke-dasharray: 300;
  stroke-width: 13;
  stroke-miterlimit: 10;
  stroke-linecap: round;
  animation: ${circleKeyframes} 1.6s cubic-bezier(0.4, 0.15, 0.6, 0.85) infinite;
  stroke: ${({ theme }) => theme.colors.grey200};
  fill: ${({ theme }) => theme.colors.transparent};
`;

export interface SpinnerProps extends BoxProps {
  /** Delay after which spinner should be visible. */
  delay?: number;

  /** The size of the spinner, */
  size: 'small' | 'medium' | 'large';
}

const Spinner: React.FC<SpinnerProps> = ({ delay, size, ...rest }) => {
  const [isVisible, setVisibility] = React.useState(delay === 0);
  const delayTimer = React.useRef(0);

  React.useEffect(() => {
    if (delay) {
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
    <Box {...sizeProps} {...rest}>
      <StyledCircleContainer x={0} y={0} viewBox="0 0 150 150">
        <StyledCircle cx="75" cy="75" r="60" />
      </StyledCircleContainer>
    </Box>
  );
};

Spinner.defaultProps = {
  delay: 0,
};

export default React.memo(Spinner);

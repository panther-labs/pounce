import { keyframes } from '@emotion/react';
import { FadeInProps } from './FadeIn';

const centerKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  
  100% {
    opacity: 1;
  }
`;

const topKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, -25px, 0);
  }
  
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const bottomKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 25px, 0);
  }
  
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const leftKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(-25px, 0, 0);
  }
  
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const rightKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(25px, 0, 0);
  }
  
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const generateKeyframes = (direction: FadeInProps['direction']) => {
  switch (direction) {
    case 'right':
      return rightKeyframes;
    case 'left':
      return leftKeyframes;
    case 'top':
      return topKeyframes;
    case 'bottom':
      return bottomKeyframes;
    case 'center':
    default:
      return centerKeyframes;
  }
};

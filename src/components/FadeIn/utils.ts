import { keyframes } from '@emotion/react';
import { FadeInProps } from './FadeIn';

export const generateKeyframes = (
  direction: FadeInProps['direction'],
  offset: FadeInProps['offset']
) => {
  if (direction === 'center') {
    return keyframes`
      0% { opacity: 0; }
      100% { opacity: 1; }
    `;
  }

  let initialTransformValue;
  switch (direction) {
    case 'right':
      initialTransformValue = `translate3d(${offset}px, 0, 0)`;
      break;
    case 'left':
      initialTransformValue = `translate3d(-${offset}px, 0, 0)`;
      break;
    case 'top':
      initialTransformValue = `translate3d(0, -${offset}px, 0)`;
      break;
    case 'bottom':
    default:
      initialTransformValue = `translate3d(0, ${offset}px, 0)`;
  }

  return keyframes`
    0% { opacity: 0; transform: ${initialTransformValue}; }
    100% { opacity: 1; transform: translate3d(0, 0, 0); }
  `;
};

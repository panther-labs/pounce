import { keyframes } from '@emotion/core';
import { FadeInProps } from './FadeIn';

export const generateKeyframes = (from: FadeInProps['from'], offset: FadeInProps['offset']) => {
  if (from === 'center') {
    return keyframes`
      0% { opacity: 0; }
      100% { opacity: 1; }
    `;
  }

  let initialTransformValue;
  switch (from) {
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

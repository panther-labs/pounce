import { createShouldForwardProp, props } from '@styled-system/should-forward-prop';

export const extraConfig = {
  direction: {
    property: 'flexDirection' as const,
  },
  justify: {
    property: 'justifyContent' as const,
  },
  align: {
    property: 'alignItems' as const,
  },
  shadow: {
    property: 'boxShadow' as const,
    scale: 'shadows',
  },
  fill: {
    property: 'fill' as const,
    scale: 'colors',
  },
  stroke: {
    property: 'stroke' as const,
    scale: 'colors',
  },
  viewBox: true,
  textDecoration: true,
  overflowX: true,
  overflowY: true,
  textTransform: true,
  animation: true,
  transform: true,
  visibility: true,
  whiteSpace: true,
  pointerEvents: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  cursor: true,
  resize: true,
  transition: true,
  objectFit: true,
  outline: true,
  willChange: true,
};

// extend the forwarded props by stuff that styled-system doesn't deal with
export const shouldForwardProp = createShouldForwardProp([
  ...props,
  'textDecoration',
  'pointerEvents',
  'visibility',
  'transform',
  'cursor',
]);

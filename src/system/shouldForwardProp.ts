import { createShouldForwardProp, props } from '@styled-system/should-forward-prop';

const nativeProps = ['nativeWidth', 'nativeHeight'];

// extend the forwarded props by stuff that styled-system doesn't deal with
export const shouldForwardProp = createShouldForwardProp([
  ...props,
  'textDecoration',
  'pointerEvents',
  'visibility',
  'transform',
  'cursor',
]);

export default (prop: string) => (nativeProps.includes(prop) ? true : shouldForwardProp(prop));

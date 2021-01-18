import { createShouldForwardProp, props } from '@styled-system/should-forward-prop';

const otherProps = ['nativeWidth', 'nativeHeight', 'minRows', 'maxRows'];

// extend the forwarded props by stuff that styled-system doesn't deal with
const shouldForwardSystemProp = createShouldForwardProp([
  ...props,
  'textDecoration',
  'pointerEvents',
  'visibility',
  'transform',
  'cursor',
]);

export const shouldForwardProp = (prop: string) =>
  otherProps.includes(prop) ? true : shouldForwardSystemProp(prop);

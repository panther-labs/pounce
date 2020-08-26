import { createShouldForwardProp, props } from '@styled-system/should-forward-prop';

const nativeProps = ['nativeWidth', 'nativeHeight'];

// extend the forwarded props by stuff that styled-system doesn't deal with
const shouldForwardPropSystemProps = createShouldForwardProp([
  ...props,
  'textDecoration',
  'pointerEvents',
  'visibility',
  'transform',
  'cursor',
]);

export const shouldForwardProp = (prop: string) =>
  nativeProps.includes(prop) ? true : shouldForwardPropSystemProps(prop);

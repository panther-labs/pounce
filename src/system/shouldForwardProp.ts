import { createShouldForwardProp, props } from '@styled-system/should-forward-prop';

export interface ValidHTMLProps {
  nativeWidth?: string | number;
  nativeHeight?: string | number;
}

export const validHTMLProps = {
  nativeWidth: 'width',
  nativeHeight: 'height',
};

const isValidHTMLProp = (value: string): value is keyof ValidHTMLProps => value in validHTMLProps;

// extend the forwarded props by stuff that styled-system doesn't deal with
export const shouldForwardProp = createShouldForwardProp([
  ...props,
  'textDecoration',
  'pointerEvents',
  'visibility',
  'transform',
  'cursor',
]);

function isPropValid(prop: string) {
  return prop in validHTMLProps ? true : shouldForwardProp(prop);
}

export function filterProps(props: Record<string, any>) {
  const validProps: typeof props = {};
  for (const prop in props) {
    if (isPropValid(prop)) {
      const propKey = isValidHTMLProp(prop) ? validHTMLProps[prop] : prop;
      validProps[propKey] = props[prop];
    }
  }
  return validProps;
}

/*

Check Img to see if we can remove intermediary component
 */

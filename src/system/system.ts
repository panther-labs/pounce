import * as React from 'react';
import createStyled from '@emotion/styled';
import { shouldForwardProp } from './shouldForwardProp';
import {
  systemProps,
  pseudoProps,
  truncateProp,
  sxProp,
  defaultStyleProp,
  SystemProps,
  domElements,
  DOMElements,
  NativeAttributes,
} from './utils';

interface Options {
  defaultStyle?: any;
}

export type StyledSystemComponent<T extends React.ElementType> = React.FC<
  NativeAttributes<T> & SystemProps
>;

export function styled<T extends React.ElementType, P = Record<string, unknown>>(
  component: T,
  { defaultStyle }: Options = {}
) {
  return createStyled(component as any, {
    shouldForwardProp,
  })(
    systemProps,
    pseudoProps,
    truncateProp,
    sxProp,
    defaultStyleProp(defaultStyle)
  ) as StyledSystemComponent<T>;
}

type JSXElements = {
  [Tag in DOMElements]: StyledSystemComponent<Tag>;
};

type CreateComponent = {
  <T extends React.ElementType>(component: T, options?: Options): StyledSystemComponent<T>;
};

export const pounce = (styled as unknown) as CreateComponent & JSXElements;

domElements.forEach(tag => {
  //@ts-ignore
  pounce[tag] = pounce(tag);
});

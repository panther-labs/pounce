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
  NativeAttributes,
} from './utils';

interface Options {
  defaultStyle?: any;
}

export type StyledSystemComponent<T extends React.ElementType> = React.FC<
  NativeAttributes<T> & SystemProps
>;

export function pounce<T extends React.ElementType, P = Record<string, unknown>>(
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

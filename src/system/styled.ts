import React from 'react';
import styled from '@emotion/styled';
import { shouldForwardProp } from './shouldForwardProp';
import { stylingProps, SystemProps } from './system';
import { pseudoProps } from './pseudo';
import {
  backgroundOpacityProp,
  borderOpacityProp,
  sxProp,
  truncateProp,
  visuallyHiddenProp,
} from './utility';

export type NativeAttributes<El extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<El>,
  keyof SystemProps
>;

export type PounceComponentProps<Element extends React.ElementType> = NativeAttributes<Element> &
  SystemProps;

export const pounce = <T extends keyof JSX.IntrinsicElements>(tag: T) =>
  styled(tag, {
    shouldForwardProp,
  })`
  ${stylingProps}
  ${pseudoProps}
  ${sxProp}
  ${truncateProp}
  ${backgroundOpacityProp}
  ${borderOpacityProp}
  ${visuallyHiddenProp}
` as React.FC<PounceComponentProps<T>>;

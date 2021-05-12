import React from 'react';
import { SystemProps } from './system';

export type NativeAttributes<El extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<El>,
  keyof SystemProps
>;

export type PounceComponentProps<Element extends React.ElementType> = NativeAttributes<Element> &
  SystemProps;

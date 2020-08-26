/* eslint-disable @typescript-eslint/no-explicit-any */
import css, { SystemCssProperties } from '@styled-system/css';
import { StylingProps } from './system';

export const truncateProp = ({ truncated }: any): any => {
  if (truncated) {
    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };
  }
};

export const visuallyHiddenProp = ({ visuallyHidden }: any): any => {
  if (visuallyHidden) {
    return {
      border: '0px',
      height: '1px',
      width: '1px',
      margin: '-1px',
      padding: '0px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      position: 'absolute',
    };
  }
};

export type SxProp = StylingProps | { [cssSelector: string]: SxProp | undefined };
export const sxProp = (props: any) => css(props.sx as SystemCssProperties)(props);

export type UtilityProps = {
  /** Whether should text should truncate to fill at most one line of text */
  truncated?: boolean;

  /** Additional custom inline CSS to pass to the element */
  sx?: SxProp;

  /** Makes the component invisible to the eye, but still readable by screen readers */
  visuallyHidden?: boolean;
};

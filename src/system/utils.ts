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

export type SxProp = StylingProps | { [cssSelector: string]: SxProp | undefined };
export const sxProp = (props: any) => css(props.sx as SystemCssProperties)(props);

export type UtilityProps = {
  /** Whether should text should truncate to fill at most one line of text */
  truncated?: boolean;

  /** Additional custom inline CSS to pass to the element
   * @ignore
   */
  sx?: SxProp;
};

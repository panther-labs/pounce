/* eslint-disable @typescript-eslint/no-explicit-any */
import css, { SystemCssProperties } from '@styled-system/css';
import { StylingProps } from './system';
import { addOpacity } from '../utils/helpers';
import colors from '../theme/colors';

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

export const backgroundOpacityProp = ({
  backgroundOpacity,
  backgroundColor,
}: {
  backgroundOpacity: number | string;
  backgroundColor: keyof typeof colors;
}): any => {
  if (backgroundOpacity) {
    // As the value of `backgroundOpacity` we want to be able to parse a lot of alternatives such as: 0.5, "0.5", 50, "50"
    // Obviously the user can still add values such as "110" or "200", but we can't do much there
    let bgOpacity =
      typeof backgroundOpacity === 'string' ? Number(backgroundOpacity) : backgroundOpacity;
    bgOpacity = bgOpacity > 1 ? bgOpacity / 100 : bgOpacity;

    const bgColor = colors[backgroundColor] ?? colors.inherit;
    return {
      backgroundColor: addOpacity(bgColor, bgOpacity),
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

  /** Adds an opacity to the existing `backgroundColor` */
  backgroundOpacity?: string | number;
};

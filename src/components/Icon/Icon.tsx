import React from 'react';
import { pounce, NativeAttributes, SystemProps } from '../../system';
import useTheme from '../../utils/useTheme';
import { icons } from '../../theme';

export interface IconProps extends NativeAttributes<'svg'>, SystemProps {
  /** The icon that you want to show */
  type: keyof typeof icons;

  /** The color of the icon */
  color?: SystemProps['color'];

  /** The size of the icon. Can be 18px or 24px */
  size?: 'x-small' | 'small' | 'large';
}

/** An simple SVG element exported as a React component. It renders a simple <svg> */
export const Icon = React.forwardRef<SVGElement & HTMLElement, IconProps>(function Icon(
  { type, size = 'large', color = 'current', ...rest },
  ref: any
) {
  const { icons } = useTheme();
  const viewBox = icons[type]?.viewBox || '0 0 24 24';

  let sizeInPx;
  if (size === 'x-small') {
    sizeInPx = 12;
  } else if (size === 'small') {
    sizeInPx = 20;
  } else {
    sizeInPx = 24;
  }

  return (
    <pounce.svg
      display="inline-block"
      verticalAlign="sub"
      flexShrink={0}
      width={sizeInPx}
      height={sizeInPx}
      color={color}
      viewBox={viewBox}
      role="presentation"
      {...rest}
      ref={ref}
    >
      {icons[type].path}
    </pounce.svg>
  );
});

export default Icon;

import React from 'react';
import Box, { BoxProps } from 'components/Box';
import useTheme from 'utils/useTheme';
import { Theme } from 'theme';

export interface IconProps extends BoxProps<'svg'> {
  /** The icon that you want to show */
  type: keyof Theme['icons'];

  /** The color of the icon */
  color?: BoxProps['color'];

  /** The size of the icon. Can be 18px or 24px */
  size?: 'x-small' | 'small' | 'medium' | 'large';
}

/** An simple SVG element exported as a React component. It renders a simple <svg> */
export const Icon = React.forwardRef<SVGElement & HTMLElement, IconProps>(function Icon(
  { type, size = 'large', color = 'current', ...rest },
  ref
) {
  const { icons } = useTheme();
  const viewBox = icons[type]?.viewBox || '0 0 24 24';

  let sizeInPx;
  switch (size) {
    case 'x-small':
      sizeInPx = 12;
      break;
    case 'small':
      sizeInPx = 16;
      break;
    case 'medium':
      sizeInPx = 20;
      break;
    case 'large':
    default:
      sizeInPx = 24;
  }

  return (
    <Box
      as="svg"
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
    </Box>
  );
});

export default Icon;

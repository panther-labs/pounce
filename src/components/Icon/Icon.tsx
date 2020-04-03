import React from 'react';
import Box, { BoxProps } from '../Box';
import useTheme from '../../utils/useTheme';
import { icons } from '../../theme';

export interface IconProps
  extends Omit<
    BoxProps<React.SVGAttributes<SVGElement> & React.HTMLAttributes<HTMLOrSVGElement>>,
    'innerRef'
  > {
  /** The icon that you want to show */
  type: keyof typeof icons;

  /** The color of the icon */
  color?: BoxProps['color'];

  /** The size of the icon. Can be 18px or 24px */
  size?: 'small' | 'large';
}

/** An simple SVG element exported as a React component. It renders a simple <svg> */
const Icon: React.FC<IconProps> = ({ type, size = 'large', color = 'current', ...rest }) => {
  const { icons } = useTheme();
  const sizeInPx = size === 'small' ? 18 : 24;
  const viewBox = icons[type].viewBox || '0 0 24 24';

  return (
    <Box
      is="svg"
      display="inherit"
      flexShrink={0}
      width={sizeInPx}
      height={sizeInPx}
      color={color}
      viewBox={viewBox}
      role="presentation"
      {...rest}
    >
      {icons[type].path}
    </Box>
  );
};

export default Icon;

import React from 'react';
import Box, { BoxProps } from './Box';
import useTheme from '../utils/useTheme';
import icons from '../themes/icons';

export interface IconProps extends Omit<BoxProps<HTMLOrSVGElement>, 'innerRef'> {
  /** The icon that you want to show */
  type: keyof typeof icons;

  /** The color of the icon */
  color?: string;

  /** The size of the icon. Can be 18px or 24px */
  size?: 'small' | 'large';
}

/** An simple SVG element exported as a React component. It renders a simple <svg> */
const Icon: React.FC<IconProps> = ({ type, size = 'large', color = 'currentColor', ...rest }) => {
  const { icons } = useTheme();
  const sizeInPx = size === 'small' ? 18 : 24;
  const viewBox = icons[type].viewBox || '0 0 24 24';

  return (
    <Box
      is="svg"
      flex="0 0 auto"
      width={sizeInPx}
      height={sizeInPx}
      color={color}
      // @ts-ignore
      display="inline-block"
      viewBox={viewBox}
      role="presentation"
      {...rest}
    >
      {icons[type].path}
    </Box>
  );
};

export default Icon;

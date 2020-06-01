import React from 'react';
import Box from '../Box';
import { Theme } from '../../theme';

export interface ProgressBarProps {
  /** The thickness (in pixels) of the progress bar (a.k.a. vertical height). Defaults to `5` */
  thickness?: number;

  /** The color of the progress bar as it fills out */
  color?: keyof Theme['colors'];

  /** A value between [0,1] denoting the progress of the bar */
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, thickness = 5, color }) => {
  return (
    <Box width={1} position="relative">
      <Box height={thickness} bg="navyblue-450" borderRadius="pill" zIndex={0} />
      <Box
        position="absolute"
        borderRadius="pill"
        bottom={0}
        height={thickness}
        width={progress}
        bg={color}
        zIndex={1}
      />
    </Box>
  );
};

export default ProgressBar;

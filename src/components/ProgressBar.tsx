import React from 'react';
import Box from './Box';
import { Theme } from '../theme';

export interface ProgressBarProps {
  /** The thickness (in pixels) of the progress bar (a.k.a. vertical height). Defaults to `5` */
  thickness?: number;

  /** The color of the progress bar as it fills out */
  progressColor?: keyof Theme['colors'];

  /** A value between [0,1] denoting the progress of the bar */
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, thickness = 5, progressColor }) => {
  return (
    <Box width={1} position="relative">
      <Box height={thickness} bg="grey50" borderRadius="large" zIndex={0} />
      <Box
        position="absolute"
        borderRadius="large"
        bottom={0}
        height={thickness}
        width={progress}
        bg={progressColor}
        zIndex={1}
      />
    </Box>
  );
};

export default ProgressBar;

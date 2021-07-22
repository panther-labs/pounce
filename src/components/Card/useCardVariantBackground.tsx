import React from 'react';
import { CardProps } from './Card';
import { Theme } from '../../theme';
import { BoxProps } from '../Box';

type ThemeColor = keyof Theme['colors'];

export const getBackgroundColor = (color: CardProps['variant']): ThemeColor => {
  switch (color) {
    case 'darker':
      return 'navyblue-600';
    case 'dark':
      return 'navyblue-500';
    case 'lighter':
      return 'navyblue-300';
    case 'light':
    default:
      return 'navyblue-400';
  }
};

type useCardVariantBackgroundProps = Required<Pick<CardProps, 'variant'>>;

const useCardVariantBackground = ({ variant }: useCardVariantBackgroundProps): BoxProps['bg'] => {
  return React.useMemo(() => getBackgroundColor(variant), [variant]);
};

export default useCardVariantBackground;

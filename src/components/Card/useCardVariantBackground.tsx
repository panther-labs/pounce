import { CardProps } from './Card';
import { BoxProps } from '../Box';

type useCardVariantBackgroundProps = Required<Pick<CardProps, 'variant'>>;

const useCardVariantBackground = ({ variant }: useCardVariantBackgroundProps): BoxProps['bg'] => {
  switch (variant) {
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

export default useCardVariantBackground;

import { BoxProps } from 'components/Box';
import { HeadingProps } from './Heading';

type UseHeadingStyles = Pick<HeadingProps, 'size'>;

const useHeadingStyles = ({ size }: UseHeadingStyles): BoxProps => {
  switch (size) {
    case '3x-large':
      return { fontSize: '7x-large' as const };
    case '2x-large':
      return { fontSize: '6x-large' as const };
    case 'x-large':
      return { fontSize: '5x-large' as const };
    case 'large':
      return { fontSize: '4x-large' as const };
    case 'medium':
      return { fontSize: '3x-large' as const };
    case 'small':
      return { fontSize: '2x-large' as const };
    case 'x-small':
    default:
      return { fontSize: 'x-large' as const };
  }
};

export default useHeadingStyles;

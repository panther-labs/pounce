import { LinkProps } from './Link';
import { BoxProps } from 'components/Box';

type UseLinkStyles = Pick<LinkProps, 'variant'>;

const useLinkStyles = ({ variant }: UseLinkStyles): BoxProps => {
  switch (variant) {
    case 'neutral':
      return {
        transition: `color 0.1s ease-out`,
        textDecoration: 'none',
        borderBottom: '1px solid',
        color: 'gray-300',
        _hover: { color: 'white' },
        _focus: { color: 'white' },
        _active: { color: 'white' },
      };
    case 'discreet':
      return {
        fontSize: 'x-small',
        fontWeight: 'bold',
        letterSpacing: 'relaxed',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: 'gray-200',
      };
    case 'prominent':
    default: {
      return {
        transition: `color 0.1s ease-out`,
        fontWeight: 'medium',
        textDecoration: 'none',
        color: 'blue-200',
        _hover: { color: 'blue-100' },
        _focus: { color: 'blue-100' },
        _active: { color: 'blue-300' },
      };
    }
  }
};

export default useLinkStyles;

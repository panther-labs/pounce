import { LinkProps } from './Link';
import { PseudoBoxProps } from '../PseudoBox';
import useTheme from '../../utils/useTheme';
import { lightenDarkenColor } from '../../utils/helpers';

type UseLinkStyles = Pick<LinkProps, 'variant'>;

const useLinkStyles = ({ variant }: UseLinkStyles): PseudoBoxProps => {
  const theme = useTheme();

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
      const hoverColor = lightenDarkenColor(theme.colors['blue-400'], 25);
      return {
        transition: `color 0.1s ease-out`,
        fontWeight: 'medium',
        textDecoration: 'none',
        color: 'blue-400',
        _hover: { color: hoverColor },
        _focus: { color: hoverColor },
        _active: { color: hoverColor },
      };
    }
  }
};

export default useLinkStyles;

import { LinkProps } from './Link';
import { PseudoBoxProps } from '../PseudoBox';
import { disabledStyles } from '../../utils/common';
import useTheme from '../../utils/useTheme';
import { lightenDarkenColor } from '../../utils/helpers';

type UseLinkStyles = Pick<LinkProps, 'variant'>;

const useLinkStyles = ({ variant }: UseLinkStyles): PseudoBoxProps => {
  const theme = useTheme();

  switch (variant) {
    case 'neutral':
      return {
        transition: `color 0.15s ease-out`,
        fontSize: 'medium',
        textDecoration: 'none',
        borderBottom: '1px solid',
        color: 'gray-300',
        _hover: { color: 'white' },
        _focus: { color: 'white' },
        _disabled: disabledStyles,
        _after: {},
      };
    case 'discreet':
      return {
        fontSize: 'x-small',
        fontWeight: 'bold',
        letterSpacing: 'relaxed',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: 'gray-100',
        _disabled: disabledStyles,
      };
    case 'prominent':
    default: {
      const hoverColor = lightenDarkenColor(theme.colors['blue-600'], 25);
      return {
        transition: `color 0.15s ease-out`,
        fontSize: 'medium',
        fontWeight: 'medium',
        textDecoration: 'none',
        color: 'blue-600',
        _hover: { color: hoverColor },
        _focus: { color: hoverColor },
        _disabled: disabledStyles,
      };
    }
  }
};

export default useLinkStyles;

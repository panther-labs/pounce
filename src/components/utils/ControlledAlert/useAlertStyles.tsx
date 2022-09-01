import { ControlledAlertProps } from './ControlledAlert';
import { addOpacity, lightenDarkenColor } from '../../../utils/helpers';
import useTheme from '../../../utils/useTheme';
import { Theme } from '../../../theme';

type UseControlledAlertStylesProps = Pick<
  ControlledAlertProps,
  'variant' | 'variantBackgroundStyle'
>;
type AlertVariant = UseControlledAlertStylesProps['variant'];
type ThemeColor = keyof Theme['colors'];

const getSolidAlertThemes = (alertVariant: AlertVariant): VariantTheming => {
  const theme = useTheme();
  const getBackgroundColor = (variantColor: ThemeColor) => {
    return lightenDarkenColor(theme.colors[variantColor], 190) as ThemeColor; // TODO: This is as close as I could get to the proper color, and it's a very yellow green...
  };
  switch (alertVariant) {
    case 'success':
      return {
        color: 'green-500' as const,
        backgroundColor: getBackgroundColor('green-500'),
        icon: 'check-circle' as const,
      };
    case 'warning':
      return {
        color: 'yellow-600',
        backgroundColor: getBackgroundColor('yellow-500'),
        icon: 'alert-circle-filled',
      };
    case 'error':
      return {
        color: 'red-400',
        backgroundColor: getBackgroundColor('red-500'),
        icon: 'alert-circle-filled',
      };
    case 'info':
      return { color: 'blue-400', backgroundColor: getBackgroundColor('blue-400'), icon: 'info' };
    case 'default':
    default:
      return { color: undefined, backgroundColor: 'gray-100', icon: undefined };
  }
};

const getTransparentAlertThemes = (alertVariant: AlertVariant): VariantTheming => {
  const theme = useTheme();
  switch (alertVariant) {
    case 'success':
      return {
        color: 'green-300',
        backgroundColor: addOpacity(theme.colors['green-300'], 0.3),
        icon: 'check-circle',
      };
    case 'warning':
      return {
        color: 'yellow-300',
        backgroundColor: addOpacity(theme.colors['yellow-300'], 0.3),
        icon: 'alert-circle',
      };
    case 'error':
      return {
        color: 'red-300',
        backgroundColor: addOpacity(theme.colors['red-300'], 0.3),
        icon: 'info',
      };
    case 'info':
      return {
        color: 'blue-300',
        backgroundColor: addOpacity(theme.colors['blue-300'], 0.3),
        icon: 'info',
      };
    case 'default':
    default:
      return { color: 'white', backgroundColor: 'gray-100', icon: 'info' };
  }
};

type VariantTheming = {
  color: keyof Theme['colors'] | undefined;
  backgroundColor: keyof Theme['colors'];
  icon: keyof Theme['icons'] | undefined;
};

const useAlertStyles = ({ variant, variantBackgroundStyle }: UseControlledAlertStylesProps) => {
  const { color, backgroundColor, icon } =
    variantBackgroundStyle === 'solid'
      ? getSolidAlertThemes(variant)
      : getTransparentAlertThemes(variant);
  switch (variantBackgroundStyle) {
    case 'transparent':
      return {
        p: 2,
        align: 'center',
        icon: icon,
        iconColor: color,
        border: '1px solid',
        borderColor: color,
        borderRadius: 'large' as const,
        backgroundColor: backgroundColor,
      };
    case 'solid':
    default:
      return {
        p: 2,
        align: 'center',
        icon: icon,
        iconColor: color,
        borderRadius: 'large' as const,
        borderLeft: variant === 'default' ? 'none' : ('4px solid' as const),
        borderLeftColor: color,
        backgroundColor: backgroundColor,
        titleColor: 'black' as const,
      };
  }
};

export default useAlertStyles;

import { ControlledAlertProps } from './ControlledAlert';
import { addOpacity } from '../../../utils/helpers';
import useTheme from '../../../utils/useTheme';
import { Theme } from '../../../theme';

type UseControlledAlertStylesProps = Pick<
  ControlledAlertProps,
  'variant' | 'variantBackgroundStyle'
>;
type AlertVariant = UseControlledAlertStylesProps['variant'];

const getSolidAlertThemes = (alertVariant: AlertVariant): VariantTheming => {
  switch (alertVariant) {
    case 'success':
      return {
        color: 'green-500' as const,
        backgroundColor: 'green-500-10' as const,
        icon: 'check-circle' as const,
      };
    case 'warning':
      return { color: 'yellow-600', backgroundColor: 'yellow-500-10', icon: 'alert-circle-filled' };
    case 'error':
      return { color: 'red-400', backgroundColor: 'red-500-10', icon: 'alert-circle-filled' };
    case 'info':
      return { color: 'blue-400', backgroundColor: 'blue-400-10', icon: 'info' };
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

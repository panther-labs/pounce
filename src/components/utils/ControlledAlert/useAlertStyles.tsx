import { ControlledAlertProps } from './ControlledAlert';
import { addOpacity } from '../../../utils/helpers';
import useTheme from '../../../utils/useTheme';

type UseControlledAlertStylesProps = Pick<
  ControlledAlertProps,
  'variant' | 'variantBackgroundStyle'
>;
type AlertVariant = UseControlledAlertStylesProps['variant'];

/** Transparent Alert Options **/

const getTransparentAlertVariantColor = (alertVariant: AlertVariant) => {
  switch (alertVariant) {
    case 'success':
      return 'green-300' as const;
    case 'info':
      return 'blue-300' as const;
    case 'warning':
      return 'yellow-300' as const;
    case 'error':
      return 'red-300' as const;
    case 'default':
    default:
      return 'white' as const;
  }
};

const getTransparentAlertVariantIcon = (alertVariant: AlertVariant) => {
  switch (alertVariant) {
    case 'success':
      return 'check-circle' as const;
    case 'warning':
      return 'alert-circle' as const;
    case 'info':
    case 'default':
    default:
      return 'info' as const;
  }
};

/** Solid Alert Options **/

const getSolidAlertVariantColor = (alertVariant: AlertVariant) => {
  switch (alertVariant) {
    case 'success':
      return 'green-500' as const;
    case 'info':
      return 'blue-400' as const;
    case 'warning':
      return 'yellow-600' as const;
    case 'error':
      return 'red-400' as const;
    case 'default':
    default:
      return 'blue-400' as const;
  }
};

const getSolidAlertVariantBackgroundColors = (alertVariant: AlertVariant) => {
  switch (alertVariant) {
    case 'success':
      return 'green-500-10' as const;
    case 'info':
      return 'blue-400-10' as const;
    case 'warning':
      return 'yellow-500-10' as const;
    case 'error':
      return 'red-500-10' as const;
    case 'default':
    default:
      return 'gray-100' as const;
  }
};

const getSolidAlertVariantIcon = (alertVariant: AlertVariant) => {
  switch (alertVariant) {
    case 'success':
      return 'check-circle' as const;
    case 'warning':
    case 'error':
      return 'alert-circle-filled' as const;
    case 'info':
      return 'info' as const;
    case 'default':
    default:
      return null;
  }
};

const useAlertStyles = ({ variant, variantBackgroundStyle }: UseControlledAlertStylesProps) => {
  const theme = useTheme();
  switch (variantBackgroundStyle) {
    case 'transparent':
      return {
        p: 2,
        align: 'center',
        icon: getTransparentAlertVariantIcon(variant),
        iconColor: getTransparentAlertVariantColor(variant),
        border: '1px solid',
        borderColor: getTransparentAlertVariantColor(variant),
        borderRadius: 'large' as const,
        backgroundColor: addOpacity(theme.colors[getTransparentAlertVariantColor(variant)], 0.3),
      };
    case 'solid':
    default:
      return {
        p: 2,
        align: 'center',
        icon: getSolidAlertVariantIcon(variant),
        iconColor: getSolidAlertVariantColor(variant),
        borderRadius: 'large' as const,
        borderLeft: variant === 'default' ? 'none' : ('4px solid' as const),
        borderLeftColor: getSolidAlertVariantColor(variant),
        backgroundColor: getSolidAlertVariantBackgroundColors(variant),
        titleColor: 'black' as const,
      };
  }
};

export default useAlertStyles;

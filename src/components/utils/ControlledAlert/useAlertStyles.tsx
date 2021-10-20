import { ControlledAlertProps } from './ControlledAlert';
import { addOpacity } from '../../../utils/helpers';
import useTheme from '../../../utils/useTheme';

type UseControlledAlertStylesProps = Pick<
  ControlledAlertProps,
  'variant' | 'variantBackgroundStyle'
>;
type AlertVariant = UseControlledAlertStylesProps['variant'];

const getAlertVariantColor = (alertVariant: AlertVariant) => {
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

const getAlertVariantIcon = (alertVariant: AlertVariant) => {
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

const useAlertStyles = ({ variant, variantBackgroundStyle }: UseControlledAlertStylesProps) => {
  const theme = useTheme();
  const color = getAlertVariantColor(variant);
  switch (variantBackgroundStyle) {
    case 'transparent':
      return {
        p: 2,
        align: 'center',
        icon: getAlertVariantIcon(variant),
        iconColor: color,
        border: '1px solid',
        borderColor: color,
        borderRadius: 'large' as const,
        backgroundColor: addOpacity(theme.colors[color], 0.3),
      };
    case 'solid':
    default:
      return {
        p: 4,
        backgroundColor: 'navyblue-400' as const,
        borderLeft: variant === 'default' ? 'none' : ('4px solid' as const),
        borderRadius: 'small' as const,
        borderLeftColor: color,
        titleColor: color,
      };
  }
};

export default useAlertStyles;

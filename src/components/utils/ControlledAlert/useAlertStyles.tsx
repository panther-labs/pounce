import { ControlledAlertProps } from './ControlledAlert';
import { addOpacity } from '../../../utils/helpers';
import useTheme from '../../../utils/useTheme';

type UseControlledAlertStylesProps = Pick<ControlledAlertProps, 'type' | 'variant'>;
type AlertType = UseControlledAlertStylesProps['type'];

const getAlertTypeColor = (alertType: AlertType) => {
  switch (alertType) {
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

const getAlertTypeIcon = (alertType: AlertType) => {
  switch (alertType) {
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

const useAlertStyles = ({ type, variant }: UseControlledAlertStylesProps) => {
  const theme = useTheme();
  const color = getAlertTypeColor(type);
  switch (variant) {
    case 'opaque':
      return {
        icon: getAlertTypeIcon(type),
        border: '1px solid',
        borderColor: color,
        borderRadius: 'large' as const,
        backgroundColor: addOpacity(theme.colors[color], 0.3),
      };
    case 'default':
    default:
      return {
        backgroundColor: 'navyblue-400' as const,
        borderLeft: type === 'default' ? 'none' : ('4px solid' as const),
        borderRadius: 'small' as const,
        borderLeftColor: color,
        titleColor: color,
      };
  }
};

export default useAlertStyles;

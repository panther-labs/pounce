import { ControlledAlertProps } from './ControlledAlert';

type UseControlledAlertStylesProps = Pick<ControlledAlertProps, 'variant'>;

const useAlertStyles = ({ variant }: UseControlledAlertStylesProps) => {
  switch (variant) {
    case 'success':
      return {
        icon: 'check-circle' as const,
        backgroundColor: 'green-400' as const,
      };
    case 'info':
      return {
        icon: 'info' as const,
        backgroundColor: 'blue-400' as const,
      };
    case 'warning':
      return {
        icon: 'alert-circle' as const,
        backgroundColor: 'orange-400' as const,
      };
    case 'error':
      return {
        icon: 'alert-circle' as const,
        backgroundColor: 'pink-700' as const,
      };
    case 'default':
    default:
      return {
        icon: 'info' as const,
        backgroundColor: 'navyblue-300' as const,
      };
  }
};

export default useAlertStyles;

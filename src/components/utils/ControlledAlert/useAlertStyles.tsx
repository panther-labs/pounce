import { ControlledAlertProps } from './ControlledAlert';

type UseControlledAlertStylesProps = Pick<ControlledAlertProps, 'variant'>;

const useAlertStyles = ({ variant }: UseControlledAlertStylesProps) => {
  switch (variant) {
    case 'success':
      return {
        icon: 'check' as const,
        backgroundColor: 'green-200' as const,
      };
    case 'info':
      return {
        icon: 'warning' as const,
        backgroundColor: 'blue-600' as const,
      };
    case 'warning':
      return {
        icon: 'warning' as const,
        backgroundColor: 'orange-500' as const,
      };
    case 'error':
      return {
        icon: 'delete' as const,
        backgroundColor: 'red-700' as const,
      };
    case 'default':
    default:
      return {
        icon: 'warning' as const,
        backgroundColor: 'navyblue-450' as const,
      };
  }
};

export default useAlertStyles;

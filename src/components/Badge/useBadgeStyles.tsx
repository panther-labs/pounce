import { BadgeProps } from './Badge';
import { FlexProps } from '../Flex';

type UseBadgeStylesProps = Pick<BadgeProps, 'variant' | 'color'>;
type UseBadgeStylesPayload = Partial<FlexProps>;

const useBadgeStyles = ({ variant, color }: UseBadgeStylesProps): UseBadgeStylesPayload => {
  switch (variant) {
    case 'outline':
      return {
        border: '1px solid',
        borderColor: color,
        bg: 'transparent' as const,
        color: 'white',
      };
    case 'solid':
    default:
      return { bg: color, color: 'gray-50' };
  }
};

export default useBadgeStyles;

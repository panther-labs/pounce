import { BadgeProps } from './Badge';
import { FlexProps } from '../Flex';

type UseBadgeStylesProps = Pick<BadgeProps, 'variant' | 'color'>;
type UseBadgeStylesPayload = Partial<FlexProps>;

const useBadgeStyles = ({ variant, color }: UseBadgeStylesProps): UseBadgeStylesPayload => {
  switch (variant) {
    case 'outline':
      return { border: '1px solid', borderColor: color, bg: 'transparent' as const };
    case 'solid':
    default:
      return { bg: color };
  }
};

export default useBadgeStyles;

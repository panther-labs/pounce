import { FlexProps } from './Flex';
import { SystemProps } from '../../system';

export const getItemSpacingProps = (
  spacing: FlexProps['margin'],
  direction: FlexProps['direction']
): Partial<SystemProps> => {
  if (!spacing) {
    return {};
  }

  const isFlexColumn = direction && (direction as string).includes('column');
  return {
    sx: {
      '& > *:not(:last-child)': {
        marginRight: isFlexColumn ? undefined : spacing,
        marginBottom: isFlexColumn ? spacing : undefined,
      },
    },
  };
};

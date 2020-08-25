import { FlexProps } from './Flex';

export const getItemSpacingProps = (
  spacing: FlexProps['margin'],
  direction: FlexProps['direction']
): Partial<FlexProps> => {
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

import { FlexProps } from './Flex';
import css from '@styled-system/css';
import { transformAliasProps } from '../Box';

export const getItemSpacingProps = (
  spacing: FlexProps['margin'],
  direction: FlexProps['direction']
): Partial<FlexProps> => {
  if (!spacing) {
    return {};
  }

  const isFlexColumn = direction && (direction as string).includes('column');
  return {
    css: css({
      '& > *:not(:last-child)': transformAliasProps({
        marginRight: isFlexColumn ? undefined : spacing,
        marginBottom: isFlexColumn ? spacing : undefined,
      }),
    }),
  };
};

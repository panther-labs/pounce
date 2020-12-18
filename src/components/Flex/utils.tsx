import React from 'react';
import { FlexProps } from './Flex';

export const useItemSpacingProps = (
  spacing: FlexProps['margin'],
  direction: FlexProps['direction'],
  sx: FlexProps['sx']
): Partial<FlexProps> => {
  return React.useMemo(() => {
    if (!spacing) {
      return sx;
    }

    const isFlexColumn = direction && (direction as string).includes('column');
    return {
      sx: {
        ...sx,
        '& > *:not(:last-child)': {
          marginRight: isFlexColumn ? undefined : spacing,
          marginBottom: isFlexColumn ? spacing : undefined,
        },
      },
    };
  }, [spacing, direction, sx]);
};

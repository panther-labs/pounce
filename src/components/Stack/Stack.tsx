import React from 'react';
import { NativeAttributes, transformAliasProps } from '../Box';
import Flex, { FlexProps } from '../Flex';
import css from '@styled-system/css';

export interface StackProps extends Pick<FlexProps, 'justify' | 'align'>, NativeAttributes<'div'> {
  /**
   * The gap between the items
   */
  spacing: number;

  /**
   * The direction of the stacking
   * @default horizontal
   */
  orientation?: 'horizontal' | 'vertical';
}

// calc(100% + 12px)

/**
 * A Stack is a simple way of adding gap between items and stacking them side by side. It's an altenative
 * to manually adding margins to each element individually
 * */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(function Stack(
  { spacing, orientation = 'horizontal', children, ...rest },
  ref
) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <Flex
      {...rest}
      ref={ref}
      inline
      direction={orientation === 'horizontal' ? 'row' : 'column'}
      css={
        css({
          '& > *:not(:last-child)': transformAliasProps({
            marginRight: isHorizontal ? spacing : undefined,
            marginBottom: isHorizontal ? undefined : spacing,
          }),
        }) as any // eslint-disable-line
      }
    >
      {children}
    </Flex>
  );
});

export default Stack;

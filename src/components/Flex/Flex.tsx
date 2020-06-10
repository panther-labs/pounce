import React from 'react';
import Box, { BoxProps } from '../Box';
import { getItemSpacingProps } from './utils';

export type FlexProps = Omit<BoxProps, 'display'> & {
  /** An alias for `flexDirection` */
  direction?: BoxProps['flexDirection'];

  /** An alias for `justifyContent` */
  justify?: BoxProps['justifyContent'];

  /** An alias for `alignItems` */
  align?: BoxProps['alignItems'];

  /** An alias for `flexWrap` */
  wrap?: BoxProps['flexWrap'];

  /** Whether the flex should be `flex-inline` */
  inline?: boolean;

  /** The gap between the flex items */
  spacing?: BoxProps['margin'];
};

/**
 * Extends <a href="/#/Box">Box</a>
 *
 * Responsive flexbox layout component. You should use this anytime you want a flex container or
 * wrapper around a certain layout
 */
export const Flex = React.forwardRef<HTMLElement, FlexProps>(function Flex(props, ref) {
  const { direction, justify, align, inline, wrap, spacing, ...rest } = props;

  const itemSpacingProps = getItemSpacingProps(spacing, direction || rest.flexDirection);
  return (
    <Box
      display={inline ? 'inline-flex' : 'flex'}
      ref={ref}
      flexDirection={direction}
      justifyContent={justify}
      alignItems={align}
      flexWrap={wrap}
      {...itemSpacingProps}
      {...rest}
    />
  );
});

export default Flex;

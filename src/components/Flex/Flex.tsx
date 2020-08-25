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
  /**
   * An alias  for `flexBasis` style prop
   */
  basis?: BoxProps['flexBasis'];
  /**
   * An alias  for `flexGrow` style prop
   */
  grow?: BoxProps['flexGrow'];
  /**
   * An alias  for `flexShrink` style prop
   */
  shrink?: BoxProps['flexShrink'];
};

/**
 * Extends <a href="/#/Box">Box</a>
 *
 * Responsive flexbox layout component. You should use this anytime you want a flex container or
 * wrapper around a certain layout
 */
export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(function Flex(props, ref) {
  const { direction, justify, align, inline, wrap, spacing, shrink, grow, basis, ...rest } = props;

  const itemSpacingProps = getItemSpacingProps(spacing, direction || rest.flexDirection);
  return (
    <Box
      display={inline ? 'inline-flex' : 'flex'}
      ref={ref}
      flexDirection={direction}
      justifyContent={justify}
      alignItems={align}
      flexWrap={wrap}
      flexShrink={shrink}
      flexGrow={grow}
      flexBasis={basis}
      {...itemSpacingProps}
      {...rest}
    />
  );
});

export default Flex;

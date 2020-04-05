import React from 'react';
import Box, { BoxProps } from '../Box';

export type FlexProps = Omit<BoxProps, 'display'> & {
  /** An alias for `flexDirection */
  direction?: BoxProps['flexDirection'];

  /** An alias for `justifyContent */
  justify?: BoxProps['justifyContent'];

  /** An alias for `alignItems */
  align?: BoxProps['alignItems'];
};

/**
 * Extends <a href="/#/Box">Box</a>
 *
 * Responsive flexbox layout component. You should use this anytime you want a flex container or
 * wrapper around a certain layout
 */
const Flex: React.FC<FlexProps> = React.forwardRef(function Flex(props, ref) {
  const { direction, justify, align, ...rest } = props;
  return (
    <Box
      display="flex"
      ref={ref}
      flexDirection={direction}
      justifyContent={justify}
      alignItems={align}
      {...rest}
    />
  );
});

export default Flex;

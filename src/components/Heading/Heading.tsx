import React from 'react';
import Box, { BoxProps } from '../Box';
import useHeadingStyles from './useHeadingStyles';

// Default heading levels to `h2`:
//
// This is so that you can drop `<Heading>` on a page _anywhere_ and it will be
// semantically correct. Since you should _usually_ only have 1 `h1` on the page,
// that can be done by explicitly overriding the `as` prop (`<Heading as="h1">`).
const DEFAULT_HEADING_LEVEL = 2;
export const HeadingLevelContext = React.createContext(DEFAULT_HEADING_LEVEL);

export interface HeadingProps extends BoxProps<'h2'> {
  /** The size of the font */
  size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | '2x-large' | '3x-large';
}

/**
 * Responsive typographic component. Anywhere you want to add a title to something
 * then you can use this
 * */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { size = 'medium', as, ...rest },
  ref
) {
  const styles = useHeadingStyles({ size });
  const level = React.useContext(HeadingLevelContext);

  // `Math.min` makes sure that the heading level is never above a h6
  const hTag = ('h' + Math.min(level, 6)) as React.ElementType;

  return <Box as={as || hTag} ref={ref} fontWeight="normal" {...styles} {...rest} />;
});

export default Heading;

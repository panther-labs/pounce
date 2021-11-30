import React from 'react';
import Box, { BoxProps } from '../Box';

const DEFAULT_HEADING_LEVEL = 2;
export const HeadingLevelContext = React.createContext(DEFAULT_HEADING_LEVEL);

type HTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HProps = BoxProps<HTag>;

/**
 * Provides and manages `h` tags within a document context. The underlying heading level rendered
 * can vary depending on _where_ this component is in the component tree.
 *
 * This allows for simple scaffolding of a document with accessible heading levels while
 * also allowing components to create markup in a vacuum.
 */
export const H: React.FC<HProps> = React.forwardRef<HTMLHeadingElement, HProps>(function H(
  props,
  ref
) {
  const level = React.useContext(HeadingLevelContext);

  // `Math.min` makes sure that the heading level is never above a h6
  const tag = 'h' + Math.min(level, 6);
  return <Box ref={ref} {...props} as={tag as HTag} />;
});

export default H;

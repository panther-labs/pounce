import React from 'react';
import Box, { BoxProps } from '../Box';

const DEFAULT_HEADING_LEVEL = 2;
export const HeadingLevelContext = React.createContext(DEFAULT_HEADING_LEVEL);

export interface HProps extends BoxProps<'h2'> {
  /**
   * Allows you to manually tweak the rendered heading level above the heading level's
   * context.
   *
   * This can be useful if you want to render two heading levels right next to each other without
   * needing an intermediate <Section />.
   *
   * @example
   * ```tsx
   * <H>this is a h2</H>
   * <H increase={1}>this is a h3</H>
   * <H increase={2}>this is a h4</H>
   * ```
   *
   * You can only increase up to 4 levels, since <H> only renders <h2>-<h6> tags
   */
  increase?: 1 | 2 | 3 | 4;
}

type HTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Provides and manages `h` tags within a document context. The underlying heading level rendered
 * can vary depending on _where_ this component is in the component tree.
 *
 * This allows for simple scaffolding of a document with accessible heading levels while
 * also allowing components to create markup in a vacuum.
 */
export const H: React.FC<HProps> = React.forwardRef<HTMLHeadingElement, HProps>(function H(
  { increase = 0, ...rest },
  ref
) {
  const level = React.useContext(HeadingLevelContext);

  // `Math.min` makes sure that the heading level is never above a h6
  const tag = 'h' + Math.min(level + increase, 6);
  return <Box ref={ref} {...rest} as={tag as HTag} />;
});

export default H;

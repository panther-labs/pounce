import React from 'react';
import { BoxProps } from '../Box';
import Section from '../Section';

/**
 * Increases the heading level of all `H` components inside it by 1.
 *
 * **NOTE**: this component is functionally the same as `<Section />`, but semantically
 * it renders an `<article>` tag instead of a `<section>` tag.
 */
export const Article: React.FC<BoxProps<'article'>> = ({ as = 'article', ...rest }) => {
  return <Section as={as} {...rest} />;
};

export default Article;

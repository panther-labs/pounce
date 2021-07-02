import React from 'react';
import * as StyledSystem from 'styled-system';
import Grid, { GridProps } from 'components/Grid';
import { countToColumns, widthToColumns } from './utils';

export interface SimpleGridProps extends GridProps {
  /**
   * The width at which child elements will break into columns. Pass a number for pixel values or a string for any other valid CSS length.
   */
  minChildWidth?: GridProps['minWidth'];
  /**
   * The number of columns
   */
  columns?: StyledSystem.ResponsiveValue<number>;
  /**
   * The gap between the grid items
   */
  spacing?: GridProps['gridGap'];
  /**
   * The column gap between the grid items
   */
  spacingX?: GridProps['gridGap'];
  /**
   * The row gap between the grid items
   */
  spacingY?: GridProps['gridGap'];
}

/**
 * Extends <a href="/#/Grid">Grid</a>
 *
 * An alternative to the simple Grid component that aims to conventiently help with the average
 * use cases of a grid.
 *
 * Inspired from <a href="https://chakra-ui.com/" target="_blank">Chakra UI</a>
 */
export const SimpleGrid = React.forwardRef<HTMLElement, SimpleGridProps>(function SimpleGrid(
  props,
  ref
) {
  const { columns, spacingX, spacingY, spacing, minChildWidth, ...rest } = props;
  let templateColumns;
  if (minChildWidth && minChildWidth > 0) {
    templateColumns = widthToColumns(minChildWidth);
  } else if (columns && columns > 0) {
    templateColumns = countToColumns(columns);
  }

  return (
    <Grid
      ref={ref}
      gap={spacing}
      columnGap={spacingX}
      rowGap={spacingY}
      templateColumns={templateColumns}
      {...rest}
    />
  );
});

export default SimpleGrid;

import React from 'react';
import Box, { BoxProps } from '../Box';

export type GridProps = Omit<BoxProps, 'display'> & {
  /** An alias for the `gridTemplateColumns` property */
  templateColumns?: BoxProps['gridTemplateColumns'];

  /** An alias for the `gridGap` property */
  gap?: BoxProps['gridGap'];

  /** An alias for the `gridRowGap` property */
  rowGap?: BoxProps['gridRowGap'];

  /** An alias for the `gridColumnGap` property */
  columnGap?: BoxProps['gridColumnGap'];

  /** An alias for the `gridAutoFlow` property */
  autoFlow?: BoxProps['gridAutoFlow'];

  /** An alias for the `gridAutoRows` property */
  autoRows?: BoxProps['gridAutoRows'];

  /** An alias for the `gridAutoColumns` property */
  autoColumns?: BoxProps['gridAutoColumns'];

  /** An alias for the `gridTemplateRows` property */
  templateRows?: BoxProps['gridTemplateRows'];

  /** An alias for the `gridTemplateAreas` property */
  templateAreas?: BoxProps['gridTemplateAreas'];

  /** An alias for the `gridArea` property */
  area?: BoxProps['gridArea'];

  /** An alias for the `gridColumn` property */
  column?: BoxProps['gridColumn'];

  /** An alias for the `gridRow` property */
  row?: BoxProps['gridRow'];
};

/**
 * Extends <a href="/#/Box">Box</a>
 *
 * Grid layout component. You should use this anytime you want to create a container for columns
 * within the design
 */
const Grid: React.FC<GridProps> = React.forwardRef(function Grid(props, ref) {
  const {
    gap,
    rowGap,
    columnGap,
    autoFlow,
    autoRows,
    autoColumns,
    templateRows,
    templateColumns,
    templateAreas,
    area,
    column,
    row,
    ...rest
  } = props;

  return (
    <Box
      display="grid"
      ref={ref}
      gridArea={area}
      gridTemplateAreas={templateAreas}
      gridGap={gap}
      gridRowGap={rowGap}
      gridColumnGap={columnGap}
      gridAutoColumns={autoColumns}
      gridColumn={column}
      gridRow={row}
      gridAutoFlow={autoFlow}
      gridAutoRows={autoRows}
      gridTemplateRows={templateRows}
      gridTemplateColumns={templateColumns}
      {...rest}
    />
  );
});

export default Grid;

import React from 'react';
import Box, { BoxProps, ReactAttributes } from '../Box';
import { useTable } from './Table';

export type TableHeaderCellProps = ReactAttributes<
  React.AllHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
> & {
  /** The alignment of the cell. Defaults to `left` */
  align?: BoxProps['textAlign'];

  /** Marks the related column as sorted */
  sortDir?: 'ascending' | 'descending' | false;
};

const TableHeaderCell: React.FC<TableHeaderCellProps> = React.forwardRef(function TableHeaderCell(
  { align = 'left', sortDir, ...rest },
  ref
) {
  const { size, stickyHeader } = useTable();

  return (
    <Box
      as="th"
      role="columnheader"
      ref={ref}
      p={size === 'medium' ? 4 : 2}
      color="grey400"
      fontWeight="bold"
      textTransform="uppercase"
      fontSize="small"
      textAlign={align}
      aria-sort={sortDir ? sortDir : undefined}
      position={stickyHeader ? 'sticky' : undefined}
      top={stickyHeader ? 0 : undefined}
      backgroundColor={stickyHeader ? 'primary50' : 'inherit'}
      verticalAlign="middle"
      {...rest}
    />
  );
});

export default React.memo(TableHeaderCell);

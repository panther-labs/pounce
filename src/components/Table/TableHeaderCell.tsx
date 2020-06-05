import React from 'react';
import Box, { BoxProps, NativeAttributes } from '../Box';
import { useTable } from './Table';

export type TableHeaderCellProps = NativeAttributes<
  React.AllHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
> & {
  /** The alignment of the cell. Defaults to `left` */
  align?: BoxProps['textAlign'];

  /** Marks the related column as sorted */
  sortDir?: 'ascending' | 'descending' | false;
};

const TableHeaderCell = React.forwardRef<HTMLTableHeaderCellElement, TableHeaderCellProps>(
  function TableHeaderCell({ align = 'left', sortDir, ...rest }, ref) {
    const { size, stickyHeader } = useTable();

    return (
      <Box
        as="th"
        role="columnheader"
        ref={ref}
        p={size === 'medium' ? 4 : 2}
        fontWeight="medium"
        textTransform="uppercase"
        fontSize="small"
        textAlign={align}
        aria-sort={sortDir ? sortDir : undefined}
        position={stickyHeader ? 'sticky' : undefined}
        top={stickyHeader ? 0 : undefined}
        backgroundColor={stickyHeader ? 'navyblue-500' : 'inherit'}
        verticalAlign="middle"
        {...rest}
      />
    );
  }
);

export default React.memo(TableHeaderCell);

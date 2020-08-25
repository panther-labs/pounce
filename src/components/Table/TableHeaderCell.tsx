import React from 'react';
import Box, { BoxProps } from '../Box';
import { useTable } from './Table';
import { NativeAttributes } from '../../system';

export type TableHeaderCellProps = NativeAttributes<'th'> & {
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
        backgroundColor={stickyHeader ? 'navyblue-300' : 'inherit'}
        verticalAlign="middle"
        {...rest}
      />
    );
  }
);

export default React.memo(TableHeaderCell);

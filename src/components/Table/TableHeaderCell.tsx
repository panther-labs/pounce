import React from 'react';
import Box, { BoxProps, NativeAttributes } from '../Box';
import { useTable } from './Table';

export type TableHeaderCellProps = NativeAttributes<'th'> & {
  /** The alignment of the cell. Defaults to `left` */
  align?: BoxProps['textAlign'];

  /** Marks the related column as sorted */
  sortDir?: 'ascending' | 'descending' | false;
};

const TableHeaderCell = React.forwardRef<HTMLTableHeaderCellElement, TableHeaderCellProps>(
  function TableHeaderCell({ align = 'left', sortDir, ...rest }, ref) {
    const { size, stickyHeader, backgroundColor } = useTable();

    // When a value for backgroundColor has been provided, the header, sticky or otherwise, will be
    // that value. When a value for backgroundColor has not been provided, and the default value of
    // `inherit` has been applied, sticky headers will have a `navyblue-300` background color.
    const headerBackgroundColor =
      stickyHeader && backgroundColor === 'inherit' ? 'navyblue-300' : backgroundColor;

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
        backgroundColor={headerBackgroundColor}
        verticalAlign="middle"
        {...rest}
      />
    );
  }
);

export default React.memo(TableHeaderCell);

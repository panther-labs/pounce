import React from 'react';
import Box, { BoxProps, NativeHTMLAttributes } from '../Box';
import { useTable } from './Table';

export type TableHeaderCellProps = NativeHTMLAttributes<
  React.AllHTMLAttributes<HTMLTableCellElement>
> & {
  /** The alignment of the cell. Defaults to `left` */
  align?: BoxProps['textAlign'];
};

const TableHeaderCell: React.FC<TableHeaderCellProps> = React.forwardRef<
  HTMLElement,
  TableHeaderCellProps
>(function TableHeaderCell({ align = 'left', ...rest }, ref) {
  const { size, stickyHeader } = useTable();

  return (
    <Box
      as="th"
      role="cell"
      ref={ref}
      p={size === 'medium' ? 4 : 2}
      color="grey400"
      fontWeight="bold"
      textTransform="uppercase"
      fontSize={1}
      lineHeight={1}
      textAlign={align}
      position={stickyHeader ? 'sticky' : undefined}
      top={stickyHeader ? 0 : undefined}
      backgroundColor={stickyHeader ? 'primary50' : 'inherit'}
      {...rest}
    />
  );
});

export default React.memo(TableHeaderCell);

import React from 'react';
import Box, { BoxProps, ReactAttributes } from '../Box';
import { useTable } from './Table';

export type TableCellProps = Pick<BoxProps, 'truncated' | 'color' | 'width' | 'maxWidth'> &
  ReactAttributes<React.AllHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> & {
    /** Whether the content should wrap to multiple lines. Defaults to `auto` */
    wrapText?: 'wrap' | 'nowrap' | 'auto';

    /** The alignment of the cell. Defaults to `left` */
    align?: BoxProps['textAlign'];
  };

const TableCell: React.FC<TableCellProps> = React.forwardRef(function TableCell(
  { wrapText = 'auto', align = 'left', ...rest },
  ref
) {
  const { size } = useTable();

  return (
    <Box
      as="td"
      role="cell"
      ref={ref}
      p={size === 'medium' ? 4 : 2}
      color="black"
      fontSize="medium"
      textAlign={align}
      overflowWrap={wrapText === 'wrap' ? 'break-word' : undefined}
      whiteSpace={wrapText === 'nowrap' ? 'nowrap' : undefined}
      verticalAlign="middle"
      {...rest}
    />
  );
});

export default React.memo(TableCell);

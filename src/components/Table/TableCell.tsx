import React from 'react';
import Box, { BoxProps, ReactAttributes } from '../Box';
import { useTable } from './Table';

export type TableCellProps = Pick<
  BoxProps,
  'truncated' | 'color' | 'width' | 'maxWidth' | 'whiteSpace'
> &
  ReactAttributes<React.AllHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> & {
    /** Whether the content should wrap to multiple lines. Defaults to `true` */
    wrapText?: boolean;

    /** The alignment of the cell. Defaults to `left` */
    align?: BoxProps['textAlign'];
  };

const TableCell: React.FC<TableCellProps> = React.forwardRef(function TableCell(
  { wrapText = true, align = 'left', ...rest },
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
      fontSize={2}
      textAlign={align}
      wordBreak={wrapText ? 'break-word' : undefined}
      {...rest}
    />
  );
});

export default React.memo(TableCell);
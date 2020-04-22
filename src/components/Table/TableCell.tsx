import React from 'react';
import Box, { BoxProps, NativeHTMLAttributes } from '../Box';
import { useTable } from './Table';

export type TableCellProps = Pick<BoxProps, 'truncated' | 'color' | 'width' | 'maxWidth'> &
  NativeHTMLAttributes<React.AllHTMLAttributes<HTMLTableCellElement>> & {
    /** Whether the content should wrap to multiple lines. Defaults to `true` */
    wrapText?: boolean;

    /** The alignment of the cell. Defaults to `left` */
    align?: BoxProps['textAlign'];
  };

const TableCell: React.FC<TableCellProps> = React.forwardRef<HTMLElement, TableCellProps>(
  function TableCell({ wrapText = true, align = 'left', ...rest }, ref) {
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
  }
);

export default React.memo(TableCell);

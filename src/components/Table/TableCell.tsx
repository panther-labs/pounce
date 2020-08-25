import React from 'react';
import Box, { BoxProps } from '../Box';
import { useTable } from './Table';
import Heading from '../Heading/Heading';
import { NativeAttributes } from '../../system';

export type TableCellProps = Pick<BoxProps, 'truncated' | 'color' | 'width' | 'maxWidth'> &
  NativeAttributes<'td'> & {
    /** Whether the content should wrap to multiple lines. Defaults to `auto` */
    wrapText?: 'wrap' | 'nowrap' | 'auto';

    /** The alignment of the cell. Defaults to `left` */
    align?: BoxProps['textAlign'];

    /** Whether the content of the cell should be rendered using a fixed-width font */
    mono?: boolean;
  };

const TableCell = React.forwardRef<HTMLTableDataCellElement, TableCellProps>(function TableCell(
  { wrapText = 'auto', align = 'left', mono, ...rest },
  ref
) {
  const { size } = useTable();

  return (
    <Box
      as="td"
      ref={ref}
      role="cell"
      p={size === 'medium' ? 4 : 2}
      fontSize="medium"
      textAlign={align}
      overflowWrap={wrapText === 'wrap' ? 'break-word' : undefined}
      whiteSpace={wrapText === 'nowrap' ? 'nowrap' : undefined}
      verticalAlign="middle"
      fontFamily={mono ? 'mono' : undefined}
      {...rest}
    />
  );
});

export default React.memo(TableCell);

const H = () => <Heading as="h2">f</Heading>;

import React from 'react';
import Box, { NativeHTMLAttributes } from '../Box';

export type TableBodyProps = NativeHTMLAttributes<React.AllHTMLAttributes<HTMLElement>>;

const TableBody: React.FC<TableBodyProps> = React.forwardRef<HTMLElement, TableBodyProps>(
  function TableBody(props, ref) {
    return <Box as="tbody" ref={ref} {...props} />;
  }
);

export default TableBody;

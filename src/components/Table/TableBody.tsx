import React from 'react';
import Box, { ReactAttributes } from '../Box';

export type TableBodyProps = ReactAttributes<React.AllHTMLAttributes<HTMLElement>>;

const TableBody: React.FC<TableBodyProps> = React.forwardRef<HTMLElement, TableBodyProps>(
  function TableBody(props, ref) {
    return <Box as="tbody" ref={ref} {...props} />;
  }
);

export default TableBody;

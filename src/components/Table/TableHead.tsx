import React from 'react';
import Box, { NativeHTMLAttributes } from '../Box';

export type TableHeadProps = NativeHTMLAttributes<React.AllHTMLAttributes<HTMLElement>>;

const TableHead: React.FC<TableHeadProps> = React.forwardRef<HTMLElement, TableHeadProps>(
  function TableHead(props, ref) {
    return <Box as="thead" ref={ref} {...props} />;
  }
);

export default TableHead;

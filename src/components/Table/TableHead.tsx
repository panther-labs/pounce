import React from 'react';
import Box, { ReactAttributes } from '../Box';

export type TableHeadProps = ReactAttributes<React.AllHTMLAttributes<HTMLElement>>;

export const TableHead = React.forwardRef<HTMLElement, TableHeadProps>(function TableHead(
  props,
  ref
) {
  return <Box as="thead" ref={ref} {...props} />;
});

export default TableHead;

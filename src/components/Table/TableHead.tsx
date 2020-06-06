import React from 'react';
import Box, { NativeAttributes } from '../Box';

export type TableHeadProps = NativeAttributes<'thead'>;

export const TableHead = React.forwardRef<HTMLElement, TableHeadProps>(function TableHead(
  props,
  ref
) {
  return <Box as="thead" ref={ref} {...props} />;
});

export default TableHead;

import React from 'react';
import Box from '../Box';

export type TableHeadProps = React.ComponentProps<'thead'>;

export const TableHead = React.forwardRef<HTMLElement, TableHeadProps>(function TableHead(
  props,
  ref
) {
  return <Box as="thead" ref={ref} {...props} />;
});

export default TableHead;

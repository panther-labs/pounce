import React from 'react';
import Box, { NativeAttributes } from '../Box';

export type TableBodyProps = NativeAttributes<React.AllHTMLAttributes<HTMLElement>>;

export const TableBody = React.forwardRef<HTMLElement, TableBodyProps>(function TableBody(
  props,
  ref
) {
  return <Box as="tbody" ref={ref} {...props} />;
});

export default TableBody;

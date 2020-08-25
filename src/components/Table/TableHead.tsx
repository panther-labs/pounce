import React from 'react';
import Box from '../Box';
import { NativeAttributes } from '../../system';

export type TableHeadProps = NativeAttributes<'thead'>;

export const TableHead = React.forwardRef<HTMLElement, TableHeadProps>(function TableHead(
  props,
  ref
) {
  return <Box as="thead" ref={ref} {...props} />;
});

export default TableHead;

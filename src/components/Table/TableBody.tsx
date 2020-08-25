import React from 'react';
import Box from '../Box';
import { NativeAttributes } from '../../system';

export type TableBodyProps = NativeAttributes<'tbody'>;

export const TableBody = React.forwardRef<HTMLElement, TableBodyProps>(function TableBody(
  props,
  ref
) {
  return <Box as="tbody" ref={ref} {...props} />;
});

export default TableBody;

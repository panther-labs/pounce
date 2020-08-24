import React from 'react';
import Box from '../Box';

export type TableBodyProps = React.ComponentProps<'tbody'>;

export const TableBody = React.forwardRef<HTMLElement, TableBodyProps>(function TableBody(
  props,
  ref
) {
  return <Box as="tbody" ref={ref} {...props} />;
});

export default TableBody;

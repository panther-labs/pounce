import React from 'react';
import Box from '../Box';
import { NativeAttributes, SystemProps } from '../../system';

export interface TableProps extends NativeAttributes<'table'> {
  /** The table layout. Defaults to `auto` */
  layout?: SystemProps['tableLayout'];

  /** The size of the table. Affects how dense the cells are. Defaults to `medium`. */
  size?: 'small' | 'medium';

  /** Whether the rows of the table should be hoverable. Defaults to `false`. */
  hoverable?: boolean;

  /** How to visually separate different rows. Defaults to `background`. */
  rowSeparationStrategy?: 'background' | 'border' | 'none';

  /**
   * Whether the header is sticky or should be scrolled long with the content. Defaults to `false`
   */
  stickyHeader?: boolean;
}

const TableContext = React.createContext<TableProps>({});
const useTable = () => React.useContext(TableContext);

const Table = React.forwardRef<HTMLTableElement, TableProps>(function Table(
  {
    layout = 'auto',
    size = 'medium',
    stickyHeader = false,
    hoverable = false,
    rowSeparationStrategy = 'background',
    ...rest
  },
  ref
) {
  const contextValue = React.useMemo(
    () => ({
      size,
      hoverable,
      rowSeparationStrategy,
      stickyHeader,
    }),
    [size, rowSeparationStrategy, hoverable, stickyHeader]
  );
  return (
    <TableContext.Provider value={contextValue}>
      <Box as="table" tableLayout={layout} ref={ref} width={1} {...rest} />
    </TableContext.Provider>
  );
});

export { useTable };
export default React.memo(Table);

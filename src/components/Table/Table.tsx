import React from 'react';
import { Theme } from 'src/theme';
import Box, { BoxProps, NativeAttributes } from '../Box';

export interface TableProps extends NativeAttributes<'table'> {
  /** The table layout. Defaults to `auto` */
  layout?: BoxProps['tableLayout'];

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

  /** The background color of table header and even-numbered rows for the 'background' rowSeparationStrategy
   * Defaults to `inherit`
   */
  backgroundColor?: keyof Theme['colors'];

  /** The background color of odd-numbered rows for the 'background' rowSeparationStrategy.
   * Defaults to `navyblue-500`
   */
  backgroundColorOddRows?: keyof Theme['colors'];
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
    backgroundColor = 'inherit',
    backgroundColorOddRows = 'navyblue-500',
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
      backgroundColor,
      backgroundColorOddRows,
    }),
    [size, rowSeparationStrategy, hoverable, stickyHeader, backgroundColor, backgroundColorOddRows]
  );
  return (
    <TableContext.Provider value={contextValue}>
      <Box
        as="table"
        tableLayout={layout}
        ref={ref}
        width={1}
        // Make a new "stacking context" so that any absolute- / sticky-positioned
        // items (like header rows) will not pollute the global z-index space.
        position="relative"
        zIndex={0}
        {...rest}
      />
    </TableContext.Provider>
  );
});

export { useTable };
export default React.memo(Table);

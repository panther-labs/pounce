import Table from './Table';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableHead from './TableHead';
import TableHeaderCell from './TableHeaderCell';
import TableRow from './TableRow';
import TableSortableHeaderCell from './TableSortableHeaderCell';

type TableComposition = typeof Table & {
  Body?: typeof TableBody;
  Cell?: typeof TableCell;
  Head?: typeof TableHead;
  HeaderCell?: typeof TableHeaderCell;
  Row?: typeof TableRow;
  SortableHeaderCell?: typeof TableSortableHeaderCell;
};

const ComposedTable: TableComposition = Table;
ComposedTable.Body = TableBody;
ComposedTable.Row = TableRow;
ComposedTable.Cell = TableCell;
ComposedTable.Head = TableHead;
ComposedTable.HeaderCell = TableHeaderCell;
ComposedTable.SortableHeaderCell = TableSortableHeaderCell;

export type { TableProps } from './Table';
export type { TableBodyProps } from './TableBody';
export type { TableCellProps } from './TableCell';
export type { TableHeadProps } from './TableHead';
export type { TableHeaderCellProps } from './TableHeaderCell';
export type { TableRowProps } from './TableRow';
export type { TableSortableHeaderCellProps } from './TableSortableHeaderCell';

export default ComposedTable;

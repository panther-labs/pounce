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

export * from './Table';
export * from './TableBody';
export * from './TableCell';
export * from './TableHead';
export * from './TableHeaderCell';
export * from './TableRow';
export * from './TableSortableHeaderCell';

export default ComposedTable;

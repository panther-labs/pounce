import React from 'react';
import { TableProps } from 'components/Table';
import Label from 'components/Label';

export interface UseEnumerableTableRowsProps<T> {
  /**
   * A list of column object that describe each column. More info on the shape of these objects
   * follows down below
   * */
  columns: TableProps<T>['columns'];
}

/**
 * A hook that extends the columns of a table in order to add an enumeration column to show the
 * serial number of each row
 * */
function useEnumerableTableRows<ItemShape>({ columns }: UseEnumerableTableRowsProps<ItemShape>) {
  /* eslint-disable react/display-name */
  const extendedColumns: TableProps<ItemShape>['columns'] = React.useMemo(
    () => [
      {
        key: 'enumeration',
        flex: '0 1 auto',
        renderColumnHeader: () => <Label size="medium" ml={4} />,
        renderCell: (item, index) => (
          <Label size="medium" ml={4}>
            {index + 1}
          </Label>
        ),
      },
      ...columns,
    ],
    [columns]
  );
  /* eslint-enable react/display-name */

  return extendedColumns;
}

export default useEnumerableTableRows;

import React from 'react';
import { TableProps } from 'components/Table';
import Label from 'components/Label';

export interface UseEnumerableTableRowsProps {
  /**
   * A list of column object that describe each column. More info on the shape of these objects
   * follows down below
   * */
  columns: TableProps['columns'];
}

/**
 * A hook that extends the columns of a table in order to add an enumeration column to show the
 * serial number of each row
 * */
const useEnumerableTableRows = ({ columns }: UseEnumerableTableRowsProps) => {
  /* eslint-disable react/display-name */
  const extendedColumns: TableProps['columns'] = React.useMemo(
    () => [
      {
        key: 'enumeration',
        flex: '0 1 auto',
        renderColumnHeader: () => null,
        renderCell: (item, index) => <Label ml={4}>{index + 1}</Label>,
      },
      ...columns,
    ],
    [columns]
  );
  /* eslint-enable react/display-name */

  return extendedColumns;
};

export default useEnumerableTableRows;

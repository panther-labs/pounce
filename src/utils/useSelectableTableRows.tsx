import React from 'react';
import { TableProps } from 'components/Table';
import Checkbox from 'components/Checkbox';

export interface UseSelectableTableRowsProps {
  /**
   * A list of items that are going to be showcased by the Table. TableItem extends the basic JS
   * object, thus the shape of these items can by anything. Usually they keep the same
   * shape as the one that was returned from the API.
   */
  items: TableProps['items'];

  /**
   * A list of column object that describe each column. More info on the shape of these objects
   * follows down below
   * */
  columns: TableProps['columns'];

  /**
   * This is a callback for when the user clicks on one of checkboxes. This should only be defined
   * if "selectable" is true, since it won't have any effect if checkboxes are not present.
   */
  onSelect: (selectedItems: TableProps['items']) => void;
}

/**
 * A variation of the table where a first column is added in order to show the serial number of
 * each row
 * */
const useSelectableTableRows = ({ columns, onSelect, items }: UseSelectableTableRowsProps) => {
  const [selectedItems, setSelectedItems] = React.useState<UseSelectableTableRowsProps['items']>(
    []
  );

  React.useEffect(() => {
    onSelect(selectedItems);
  }, [selectedItems]);

  /* eslint-disable react/display-name */
  const extendedColumns: TableProps['columns'] = React.useMemo(
    () => [
      {
        key: 'selection',
        flex: '0 1 auto',
        renderColumnHeader: () => (
          <Checkbox
            checked={selectedItems.length === items.length}
            onChange={checked => setSelectedItems(checked ? items : [])}
          />
        ),
        renderCell: item => (
          <Checkbox
            checked={selectedItems.includes(item)}
            onChange={(checked, e) => {
              e.stopPropagation();

              setSelectedItems(
                checked
                  ? [...selectedItems, item]
                  : selectedItems.filter(selectedItem => selectedItem !== item)
              );
            }}
          />
        ),
      },
      ...columns,
    ],
    [selectedItems, columns, items, onSelect]
  );
  /* eslint-enable react/display-name */

  return extendedColumns;
};

export default useSelectableTableRows;

import React from 'react';

export interface UseSortableTableRows {
  /** The initial value of the sort direction */
  initialSortDir?: 'ascending' | 'descending' | null;

  /**
   * The initial value of the sort key. The value must match the `keys` of one of the columns or be
   * null if the data is not currently being sorted under a certain column
   */
  initialSortKey?: string | null;
}

/**
 * A hook that adds the ability for columns to be sortable and handles state management for them
 * */
function useSortableTableRows({
  initialSortDir = null,
  initialSortKey = null,
}: UseSortableTableRows) {
  const [sortDir, setSortDir] = React.useState(initialSortDir);
  const [sortKey, setSortKey] = React.useState(initialSortKey);

  const onSort = (selectedKey: string) => {
    if (sortKey === selectedKey) {
      setSortDir(sortDir === 'ascending' ? 'descending' : 'ascending');
    } else {
      setSortDir('ascending');
    }
    setSortKey(selectedKey);
  };

  return React.useMemo(() => ({ sortDir, sortKey, onSort }), [sortDir, sortKey]);
}

export default useSortableTableRows;

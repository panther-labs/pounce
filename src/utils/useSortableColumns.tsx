import React from 'react';

/**
 * A hook that adds the ability for columns to be sortable and handles state management for them
 * */
function useSortableTableRows() {
  const [sortDir, setSortDir] = React.useState<'ascending' | 'descending' | null>(null);
  const [sortKey, setSortKey] = React.useState<string | null>(null);

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

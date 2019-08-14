import React from 'react';
import { TableItem } from 'components/Table';
import IconButton from '../components/IconButton';
import Icon from 'components/Icon';
import Label from 'components/Label';
import Text from 'components/Text';
import Flex from 'components/Flex';
import Dropdown from 'components/Dropdown';
import MenuItem from 'components/MenuItem';

export interface UseClientPaginatedTable {
  /**
   * A list of items that are going to be showcased by the Table. TableItem extends the basic JS
   * object, thus the shape of these items can by anything. Usually they keep the same
   * shape as the one that was returned from the API.
   */
  items: TableItem[];

  /**
   * A list of page sizes that the user is going to be able to select from
   * */
  pageSizes?: number[];

  /**
   * The index of `pageSizes` that will initially be selected. This prop defaults to the 0.
   */
  initialPageSizeIndex?: number;
}

/**
 * A hook that extends the columns of a table in order to add an enumeration column to show the
 * serial number of each row
 * */
const useEnumerableTableRows = ({
  items,
  pageSizes = [25, 50, 75, 100],
  initialPageSizeIndex,
}: UseClientPaginatedTable) => {
  const [activePageIndex, setActivePageIndex] = React.useState(0);
  const [activePageSizeIndex, setActivePageSizeIndex] = React.useState(initialPageSizeIndex || 0);

  const itemsPerPage = pageSizes[activePageSizeIndex];

  return React.useMemo(
    () => ({
      items: items.slice(itemsPerPage * activePageIndex, itemsPerPage * (activePageIndex + 1)),
      paginationElement: (
        <Flex alignItems="center" justifyContent="center">
          <Flex mr={9} alignItems="center">
            <IconButton variant="default" onClick={() => setActivePageIndex(activePageIndex - 1)}>
              <Icon size="small" type="chevron-left" />
            </IconButton>
            <Label size="large" mx={4}>
              {activePageIndex + 1} of {Math.ceil(items.length / itemsPerPage)}
            </Label>
            <IconButton variant="default" onClick={() => setActivePageIndex(activePageIndex + 1)}>
              <Icon size="small" type="chevron-right" />
            </IconButton>
          </Flex>
          <Flex alignItems="center">
            <Dropdown
              trigger={
                <Flex alignItems="center">
                  <Text size="medium" mr={2}>
                    {itemsPerPage} per page
                  </Text>
                  <Icon size="small" type="rules" />
                </Flex>
              }
            >
              {pageSizes.map((pageSize, index) => (
                <Dropdown.Item
                  key={pageSize}
                  onSelect={() => {
                    setActivePageSizeIndex(index);
                    setActivePageIndex(0);
                  }}
                >
                  <MenuItem variant="default">{pageSize} per page</MenuItem>
                </Dropdown.Item>
              ))}
            </Dropdown>
          </Flex>
        </Flex>
      ),
    }),
    [itemsPerPage, activePageIndex]
  );
};

export default useEnumerableTableRows;

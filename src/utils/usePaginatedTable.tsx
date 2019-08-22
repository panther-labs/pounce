import React from 'react';
import IconButton from '../components/IconButton';
import Icon from 'components/Icon';
import Label from 'components/Label';
import Text from 'components/Text';
import Flex from 'components/Flex';
import Dropdown from 'components/Dropdown';
import MenuItem from 'components/MenuItem';

export interface UsePaginatedTable {
  /**
   * The total number of items that this table will show. This prop is only used to display the
   * total number of pages that exist for a selected page size. You can omit it if you don't want
   * the total number of pages to be shown
   */
  total?: number;

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
const usePaginatedTable = ({
  total = 0,
  pageSizes = [25, 50, 75, 100],
  initialPageSizeIndex,
}: UsePaginatedTable) => {
  const [activePageIndex, setActivePageIndex] = React.useState(0);
  const [activePageSizeIndex, setActivePageSizeIndex] = React.useState(initialPageSizeIndex || 0);

  const itemsPerPage = pageSizes[activePageSizeIndex];

  return React.useMemo(
    () => ({
      startIndex: itemsPerPage * activePageIndex,
      endIndex: itemsPerPage * (activePageIndex + 1) - 1,
      itemsPerPage,
      activePageIndex,
      paginationElement: (
        <Flex alignItems="center" justifyContent="center">
          <Flex mr={9} alignItems="center">
            <IconButton variant="default" onClick={() => setActivePageIndex(activePageIndex - 1)}>
              <Icon size="small" type="chevron-left" />
            </IconButton>
            {total > 0 && (
              <Label size="large" mx={4}>
                {activePageIndex + 1} of {Math.ceil(total / itemsPerPage)}
              </Label>
            )}
            <IconButton variant="default" onClick={() => setActivePageIndex(activePageIndex + 1)}>
              <Icon size="small" type="chevron-right" />
            </IconButton>
          </Flex>
          {pageSizes.length > 1 && (
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
          )}
        </Flex>
      ),
    }),
    [itemsPerPage, activePageIndex]
  );
};

export default usePaginatedTable;
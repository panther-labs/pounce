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
   * A list of page sizes that the user is going to be able to select from
   * */
  pageSizes?: number[];

  /**
   * The index of `pageSizes` that will initially be selected. This prop defaults to the 0.
   */
  initialPageSizeIndex?: number;

  /**
   * The page that will initially be selected. This prop defaults to the 0 (the first page, since
   * numbering starts from `0` although `1` is displayed).
   */
  initialPageIndex?: number;
}

/**
 * A hook that extends the columns of a table in order to add an enumeration column to show the
 * serial number of each row
 * */
const usePaginatedTable = ({
  pageSizes = [25, 50, 75, 100],
  initialPageSizeIndex = 0,
  initialPageIndex = 0,
}: UsePaginatedTable) => {
  const [activePageIndex, setActivePageIndex] = React.useState(initialPageIndex);
  const [activePageSizeIndex, setActivePageSizeIndex] = React.useState(initialPageSizeIndex);

  const itemsPerPage = pageSizes[activePageSizeIndex];

  return React.useMemo(
    () => ({
      startIndex: itemsPerPage * activePageIndex,
      endIndex: itemsPerPage * (activePageIndex + 1) - 1,
      itemsPerPage,
      activePageIndex,

      // eslint-disable-next-line react/display-name
      paginationElement: (total: number) => {
        const totalPages = Math.ceil(total / itemsPerPage);
        return (
          <Flex alignItems="center" justifyContent="center">
            <Flex mr={9} alignItems="center">
              <IconButton
                variant="default"
                disabled={activePageIndex <= 0}
                onClick={() => setActivePageIndex(activePageIndex - 1)}
              >
                <Icon size="large" type="chevron-left" />
              </IconButton>
              {total > 0 && (
                <Label size="large" mx={4} color="grey400">
                  {activePageIndex + 1} of {Math.ceil(total / itemsPerPage)}
                </Label>
              )}
              <IconButton
                variant="default"
                disabled={activePageIndex >= totalPages - 1}
                onClick={() => setActivePageIndex(activePageIndex + 1)}
              >
                <Icon size="large" type="chevron-right" />
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
        );
      },
    }),
    [itemsPerPage, activePageIndex]
  );
};

export default usePaginatedTable;

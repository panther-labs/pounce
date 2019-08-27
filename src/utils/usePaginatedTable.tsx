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
   * The page that will initially be selected. This prop defaults to 1 (the first page)
   */
  initialPage?: number;
}

/**
 * A hook that extends the columns of a table in order to add an enumeration column to show the
 * serial number of each row
 * */
const usePaginatedTable = ({
  pageSizes = [25, 50, 75, 100],
  initialPageSizeIndex = 0,
  initialPage = 1,
}: UsePaginatedTable) => {
  const [activePage, setActivePage] = React.useState(initialPage);
  const [activePageSizeIndex, setActivePageSizeIndex] = React.useState(initialPageSizeIndex);

  const itemsPerPage = pageSizes[activePageSizeIndex];

  return React.useMemo(
    () => ({
      startIndex: itemsPerPage * (activePage - 1),
      endIndex: itemsPerPage * activePage - 1,
      itemsPerPage,
      activePage,

      // eslint-disable-next-line react/display-name
      renderPaginationElement: (total: number) => {
        const totalPages = Math.ceil(total / itemsPerPage);
        return (
          <Flex alignItems="center" justifyContent="center">
            <Flex mr={9} alignItems="center">
              <IconButton
                variant="default"
                disabled={activePage <= 1}
                onClick={() => setActivePage(activePage - 1)}
              >
                <Icon size="large" type="chevron-left" />
              </IconButton>
              {total > 0 && (
                <Label size="large" mx={4} color="grey400">
                  {activePage + 1} of {Math.ceil(total / itemsPerPage)}
                </Label>
              )}
              <IconButton
                variant="default"
                disabled={activePage >= totalPages}
                onClick={() => setActivePage(activePage + 1)}
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
                        setActivePage(1);
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
    [itemsPerPage, activePage]
  );
};

export default usePaginatedTable;

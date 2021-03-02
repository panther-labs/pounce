import React from 'react';
import { GetItemPropsOptions } from 'downshift';
import Text from '../../Text';
import Box from '../../Box';
import MenuItem from '../MenuItem';
import groupBy from 'lodash/groupBy';

interface ComboBoxItemsProps<T> {
  items: T[];
  disableItem: (item: T) => boolean;
  getItemProps: (options: GetItemPropsOptions<T>) => T;
  itemToString: (item: T) => string;
  itemToGroup?: (item: T) => string;
  selectedItem?: T | null;
}

/**
 * Acts as a wrapper of MenuItems in a list of dropdown options,
 * to allow grouping.
 */
function ComboBoxItems<Item>({
  items,
  itemToGroup,
  ...rest
}: ComboBoxItemsProps<Item>): React.ReactElement<ComboBoxItemsProps<Item>> {
  const groupedItems = React.useMemo(() => {
    if (!itemToGroup) {
      return [];
    }
    return groupBy(items, itemToGroup);
  }, [items, itemToGroup]);

  if (!itemToGroup) {
    return (
      <>
        {items.map(item => {
          return (
            <MenuItem
              {...rest.getItemProps({ item, disabled: rest.disableItem(item) })}
              as="li"
              listStyle="none"
              key={rest.itemToString(item)}
              selected={
                !!rest.selectedItem &&
                rest.itemToString(item) === rest.itemToString(rest.selectedItem)
              }
            >
              {rest.itemToString(item)}
            </MenuItem>
          );
        })}
      </>
    );
  }

  return (
    <>
      {Object.entries(groupedItems).map(([groupName, items]) => (
        <Box aria-label={`Group ${groupName}`} as="li" key={groupName} listStyle="none">
          <Text
            position="sticky"
            top={0}
            pl={4}
            py={4}
            zIndex={1}
            fontWeight="bold"
            textTransform="uppercase"
            backgroundColor="navyblue-350"
          >
            {groupName}
          </Text>
          <Box as="ul" role="listbox">
            {items.map(item => (
              <MenuItem
                {...rest.getItemProps({ item, disabled: rest.disableItem(item) })}
                as="li"
                listStyle="none"
                nested
                key={rest.itemToString(item)}
                selected={
                  !!rest.selectedItem &&
                  rest.itemToString(item) === rest.itemToString(rest.selectedItem)
                }
              >
                {rest.itemToString(item)}
              </MenuItem>
            ))}
          </Box>
        </Box>
      ))}
    </>
  );
}

export default ComboBoxItems;

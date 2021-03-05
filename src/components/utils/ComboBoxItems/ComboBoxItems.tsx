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
  selectedItems?: T[];
}

/**
 * Acts as a wrapper of MenuItems in a list of dropdown options,
 * to allow grouping.
 */
function ComboBoxItems<Item>({
  items,
  itemToGroup,
  getItemProps,
  itemToString,
  disableItem,
  selectedItems,
}: ComboBoxItemsProps<Item>): React.ReactElement<ComboBoxItemsProps<Item>> {
  const groupedItems = React.useMemo(() => {
    return groupBy(items, itemToGroup);
  }, [items, itemToGroup]);

  if (!itemToGroup) {
    return (
      <>
        {items.map(item => {
          return (
            <MenuItem
              {...getItemProps({ item, disabled: disableItem(item) })}
              as="li"
              listStyle="none"
              key={itemToString(item)}
              selected={
                !!selectedItems &&
                selectedItems.map(item => itemToString(item)).includes(itemToString(item))
              }
            >
              {itemToString(item)}
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
                {...getItemProps({ item, disabled: disableItem(item) })}
                as="li"
                listStyle="none"
                nested
                key={itemToString(item)}
                selected={
                  !!selectedItems &&
                  selectedItems.map(item => itemToString(item)).includes(itemToString(item))
                }
              >
                {itemToString(item)}
              </MenuItem>
            ))}
          </Box>
        </Box>
      ))}
    </>
  );
}

export default ComboBoxItems;

import React from 'react';
import { GetItemPropsOptions } from 'downshift';
import Text from '../Text';
import Box from '../Box';
import MenuItem from '../utils/MenuItem';
import { typedMemo } from '../../utils/helpers';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';

interface MenuItemGroupProps<T> {
  items: T[];
  disableItem: (item: T) => boolean;
  getItemProps: (options: GetItemPropsOptions<T>) => T;
  itemToString: (item: T) => string;
  itemToGroup: (item: T) => keyof T;
  selectedItem?: T | null;
}

/**
 * Acts as a wrapper of MenuItems in a list of dropdown options,
 * to allow grouping in MultiComboBoxes.
 */
function MenuItemGroups<Item>({
  items,
  itemToGroup,
  ...rest
}: MenuItemGroupProps<Item>): React.ReactElement<MenuItemGroupProps<Item>> {
  const groupedItems = React.useMemo(() => groupBy(items, itemToGroup), [items, itemToGroup]);

  return (
    <>
      {map(groupedItems, (items, key) => (
        <Box as="li" key={key} listStyle="none">
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
            {key}
          </Text>
          <Box as="ul">
            {items.map(item => (
              <MenuItem
                {...rest.getItemProps({ item, disabled: rest.disableItem(item) })}
                as="li"
                listStyle="none"
                grouped
                key={rest.itemToString(item)}
                selected={item === rest.selectedItem}
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

export default typedMemo(MenuItemGroups);

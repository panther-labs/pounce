import React from 'react';
import { GetItemPropsOptions } from 'downshift';
import Text from '../Text';
import Box from '../Box';
import MenuItem from '../utils/MenuItem';
import { TreeNode } from './MultiCombobox';
import { typedMemo } from '../../utils/helpers';

interface MenuItemGroupProps<T> {
  items: Array<T | TreeNode<T>>;
  disableItem: (item: T) => boolean;
  getItemProps: (options: GetItemPropsOptions<T>) => T;
  itemToString: (item: T) => string;
  selectedItem?: T | null;
  /**
   * The number of nested calls (recursion depth)
   */
  depth?: number;
}

/**
 * Acts as a wrapper of MenuItems in a list of dropdown options.
 * When dealing with a data set which is arbitrarily nested it recursively
 * renders MenuItems grouped by their parent.
 */
function MenuItemGroup<Item>({
  items,
  depth = 1,
  ...rest
}: MenuItemGroupProps<Item>): React.ReactElement<MenuItemGroupProps<Item>> {
  return (
    <>
      {items.map(item => {
        // If the item contains nested sub menu items recursively
        // render the group of Menu Items.
        if (typeof item === 'object' && 'label' in item) {
          if (item.subItems.length === 0) {
            return null;
          }

          return (
            <Box as="li" listStyle="none">
              <Text
                position="sticky"
                top={(depth - 1) * 50}
                pl={depth * 4}
                zIndex={9999 - depth}
                fontWeight="bold"
                textTransform="uppercase"
                backgroundColor="navyblue-350"
                py={4}
              >
                {item.label}
              </Text>
              <Box as="ul">
                <MenuItemGroup depth={depth + 1} items={item.subItems} {...rest}></MenuItemGroup>
              </Box>
            </Box>
          );
        }

        // Recursion Base Case
        return (
          <MenuItem
            {...rest.getItemProps({ item, disabled: rest.disableItem(item) })}
            as="li"
            listStyle="none"
            pl={depth * 16}
            key={rest.itemToString(item)}
            selected={item === rest.selectedItem}
          >
            {rest.itemToString(item)}
          </MenuItem>
        );
      })}
    </>
  );
}

export default typedMemo(MenuItemGroup);

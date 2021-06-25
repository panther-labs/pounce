import React from 'react';
import { GetItemPropsOptions } from 'downshift';
import groupBy from 'lodash/groupBy';
import Box from 'components/Box';
import MenuItem from 'components/utils/MenuItem';

interface ComboboxItemsProps<T> {
  items: T[];
  disableItem: (item: T) => boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItemProps: (options: GetItemPropsOptions<any>) => any;
  itemToString: (item: T) => string;
  itemToGroup?: (item: T) => string;
  onChange?: (value: T[]) => void;
  selectedItems?: T[];
  allowMultipleSelection?: boolean;
}

/**
 * Acts as a wrapper of MenuItems in a list of dropdown options,
 * to allow grouping.
 */
function ComboboxItems<Item>({
  items,
  itemToGroup,
  getItemProps,
  itemToString,
  disableItem,
  selectedItems,
  allowMultipleSelection,
}: ComboboxItemsProps<Item>): React.ReactElement<ComboboxItemsProps<Item>> {
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
              withCheckMark={allowMultipleSelection}
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
      {Object.entries(groupedItems).map(([groupName, items]) => {
        const enabledItems = items.filter(i => !disableItem(i));
        const disabled = enabledItems.length === 0;

        return (
          <Box aria-label={`Group ${groupName}`} as="li" key={groupName} listStyle="none">
            <Box position="sticky" top={0} textTransform="uppercase" fontWeight="bold" zIndex={1}>
              <MenuItem
                {...(allowMultipleSelection && {
                  ...getItemProps({
                    item: enabledItems,
                    disabled,
                  }),
                })}
                selected={
                  allowMultipleSelection &&
                  !!selectedItems &&
                  !disabled &&
                  enabledItems.every(item =>
                    selectedItems.map(itemToString).includes(itemToString(item))
                  )
                }
                backgroundColor="navyblue-350"
                selectedBackgroundColor="navyblue-600"
                withCheckMark={allowMultipleSelection}
              >
                {groupName}
              </MenuItem>
            </Box>
            <Box as="ul" role="listbox">
              {items.map(item => (
                <MenuItem
                  {...getItemProps({ item, disabled: disableItem(item) })}
                  as="li"
                  listStyle="none"
                  nested
                  key={itemToString(item)}
                  selected={selectedItems
                    ?.map(item => itemToString(item))
                    .includes(itemToString(item))}
                  withCheckMark={allowMultipleSelection}
                >
                  {itemToString(item)}
                </MenuItem>
              ))}
            </Box>
          </Box>
        );
      })}
    </>
  );
}

export default ComboboxItems;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Downshift from 'downshift';
import { filter as fuzzySearch } from 'fuzzaldrin';
import Card from 'components/Card';
import Box, { BoxProps } from 'components/Box';
import MenuItem from 'components/MenuItem';
import { TextInputProps } from 'components/TextInput';
import IconButton from 'components/IconButton';
import Icon from 'components/Icon';
import Flex from 'components/Flex';
import {
  InputElementOuterBox,
  InputElementLabel,
  InputElementInnerBox,
} from 'components/BaseInputElement';

export interface RenderComboboxItemProps<T> {
  /** The item to render */
  item: T;

  /** Whether this item is selected **/
  selected: boolean;

  /** Whether this item is simply highlighted using the keyboard. This doesn't mean it's selected */
  highlighted: boolean;
}

export interface ComboboxProps<T> {
  /** Callback when the selection changes */
  onChange: (value: T | null) => void;

  /** A list of entries that the dropdown will have as options */
  items: T[];

  /**
   * A function that converts the an item to a string. This is the value that the dropdown will
   * expose to the user. This is also the value that the dropdown will use internally for comparisons
   * so it should be unique (which should be by default since you wouldn't want to expose duplicate
   * values to the user) */
  itemToString?: (item: T) => string;

  /**
   * An optional function to override the default way that each item renders. In a
   * MultiSelectCombobox, the `selected` is always going to be `false`, since the selected values
   * are not visible in the menu
   * */
  renderItem?: ({ item, selected, highlighted }: RenderComboboxItemProps<T>) => React.ReactElement;

  /**
   * The value of the item that is currently selected. The component is a controlled one,
   * so the the selected value should be provided explicitly to the dropdown
   * */
  value: T | null;

  /** The label associated with this dropdown form element */
  label?: string;

  /** Whether the Combobox should have an input to search results */
  searchable?: boolean;

  /** Whether the component should be disabled or not */
  disabled?: boolean;

  /** A set of props & attributes that will be given to the input */
  inputProps?: TextInputProps;

  /** A set of props & attributes to apply to the wrapping `Box` of the entire module */
  rootProps?: BoxProps;

  /** A set of props & attributes to apply to the container of the items (the Menu) */
  menuProps?: BoxProps;
}

/**
 * A simple Combobox can be thought of as a typical `<select>` component. Whenerever you would
 * use a normal select, you should now pass the `<Combobox>` component.
 */
const Combobox: <T = any>(props: ComboboxProps<T>) => React.ReactElement<ComboboxProps<T>> = ({
  onChange,
  value,
  items,
  renderItem,
  searchable = false,
  label = '',
  inputProps = {},
  rootProps = {},
  menuProps = {},
  disabled = false,
  itemToString = item => String(item),
}) => {
  return (
    <Box position="relative">
      <Downshift
        onChange={item => item && onChange(item)}
        selectedItem={value}
        itemToString={item => (item ? itemToString(item) : '')}
      >
        {({
          getRootProps,
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          toggleMenu,
          openMenu,
          getLabelProps,
        }) => {
          let results = items;

          // If it's searchable, only filter results by search term when the searching
          // functionality is available.
          if (searchable) {
            const strResults = fuzzySearch(results.map(itemToString), inputValue || '');

            // now convert those strings back to the original shape of the items
            results = items.filter(item => strResults.includes(itemToString(item)));
          }

          // Only show the items that have not been selected

          // We add 2 types of additional data to the input that is going to be renders:
          // 1. `inputProps` that the user asked us to add
          // 2. When the combobox is not searchable, we make the input "behave" like a div. We
          // still want an input though for placeholder, spacings, etc.
          const additionalInputProps = {
            ...inputProps,
            ...(!searchable && {
              style: { cursor: 'pointer' },
              onMouseDown: toggleMenu,
              onFocus: openMenu,
              readOnly: true,
              'aria-readonly': true,
            }),
          };

          return (
            <Box {...getRootProps()} {...rootProps}>
              {!!label && <InputElementLabel {...getLabelProps()}>{label}</InputElementLabel>}
              <InputElementOuterBox position="relative" pr={10} disabled={disabled}>
                <Flex alignItems="center" flexWrap="wrap">
                  <InputElementInnerBox
                    {...getInputProps(additionalInputProps)}
                    is="input"
                    type="text"
                    flex="1 0 auto"
                  />
                  <IconButton
                    variant="default"
                    position="absolute"
                    right={3}
                    onClick={() => toggleMenu()}
                    tabIndex={-1}
                  >
                    <Icon size="small" type={isOpen ? 'caret-up' : 'caret-down'} />
                  </IconButton>
                </Flex>
              </InputElementOuterBox>
              <Box {...getMenuProps()} {...menuProps}>
                {isOpen && (
                  <Card zIndex={1} mt={2} position="absolute" width={1}>
                    {results.map((item, index) => (
                      <Box {...getItemProps({ item })} key={itemToString(item)}>
                        {renderItem ? (
                          renderItem({
                            item,
                            selected: false,
                            highlighted: highlightedIndex === index,
                          })
                        ) : (
                          <MenuItem
                            variant="default"
                            highlighted={highlightedIndex === index}
                            selected={false}
                          >
                            {itemToString(item)}
                          </MenuItem>
                        )}
                      </Box>
                    ))}
                  </Card>
                )}
              </Box>
            </Box>
          );
        }}
      </Downshift>
    </Box>
  );
};

export default Combobox;

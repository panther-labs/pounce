/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Downshift, { DownshiftState, StateChangeOptions } from 'downshift';
import { filter as fuzzySearch } from 'fuzzaldrin';
import Card from 'components/Card';
import Box, { BoxProps } from 'components/Box';
import MenuItem from 'components/MenuItem';
import { TextInputProps } from 'components/TextInput';
import IconButton from 'components/IconButton';
import Icon from 'components/Icon';
import Chip from 'components/Chip';
import Flex from 'components/Flex';
import {
  InputElementOuterBox,
  InputElementLabel,
  InputElementInnerBox,
} from 'components/BaseInputElement';

export interface RenderMultiComboboxItemProps<T> {
  /** The item to render */
  item: T;

  /** Whether this item is selected **/
  selected: boolean;

  /** Whether this item is simply highlighted using the keyboard. This doesn't mean it's selected */
  highlighted: boolean;
}

export interface MultiComboboxProps<T> {
  /** Callback when the selection changes */
  onChange: (value: T[]) => void;

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
   * MultiSelectMultiCombobox, the `selected` is always going to be `false`, since the selected values
   * are not visible in the menu
   * */
  renderItem?: ({
    item,
    selected,
    highlighted,
  }: RenderMultiComboboxItemProps<T>) => React.ReactElement;

  /**
   * The value of the item that is currently selected. The component is a controlled one,
   * so the the selected value should be provided explicitly to the dropdown
   * */
  value: T[];

  /** The label associated with this dropdown form element */
  label?: string;

  /** Whether the MultiCombobox should have an input to search results */
  searchable?: boolean;

  /** Whether the component should be disabled or not */
  disabled?: boolean;

  /** A set of props & attributes that will be given to the input */
  inputProps?: TextInputProps;

  /**
   * Allow the user to add custom entries to the dropdown instead of limiting selections to the
   * predefined set of options. The `searchable` prop should be true in order for
   * this functionality to work.
   * */
  allowAdditions?: boolean;

  /**
   * A function that runs before a custom item is added by the user. If it returns `true`, then this
   * item will be added to the selection. If not, then this item won't be added
   * */
  validateAddition?: (userEnteredInput: string) => boolean;

  /** A set of props & attributes to apply to the wrapping `Box` of the entire module */
  rootProps?: BoxProps;

  /** A set of props & attributes to apply to the container of the items (the Menu) */
  menuProps?: BoxProps;
}

const stateReducer = (state: DownshiftState<any>, changes: StateChangeOptions<any>) => {
  switch (changes.type) {
    case Downshift.stateChangeTypes.keyDownEnter:
    case Downshift.stateChangeTypes.clickItem:
      // Whenever the user makes a selection, make sure to reset the input so that he can keep
      // searching for more. We also make sure to always highlight the first item
      return {
        ...changes,
        inputValue: '',
        highlightedIndex: state.highlightedIndex,
        isOpen: true,
      };
    case Downshift.stateChangeTypes.blurInput:
      return {
        ...changes,
        inputValue: '',
      };

    default:
      return changes;
  }
};

/**
 * A simple MultiCombobox can be thought of as a typical `<select>` component. Whenerever you would
 * use a normal select, you should now pass the `<MultiCombobox>` component.
 */
const MultiCombobox: <T = any>(
  props: MultiComboboxProps<T>
) => React.ReactElement<MultiComboboxProps<T>> = ({
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
  allowAdditions = false,
  validateAddition = () => true,
}) => {
  const removeItem = (item: any) => {
    onChange(value.filter(i => i !== item));
  };

  const addSelectedItem = (item: any) => {
    if (item !== null) {
      onChange([...value, item]);
    }
  };

  return (
    <Box position="relative">
      <Downshift
        stateReducer={stateReducer}
        onChange={addSelectedItem}
        selectedItem={null}
        itemToString={item => (item ? itemToString(item) : '')}
        initialInputValue=""
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
          selectItem,
        }) => {
          // If it's a multicombobox we DON'T WANT t oinclude the results already selected and also
          // we want to make sure that the results get filtered by the search term of the user
          const nonSelectedItems = items.filter(
            item => !value.map(itemToString).includes(itemToString(item))
          );

          // From the non-selected items, make sure to filter the ones that match the user's
          // search term. To do that we convert our items to their string representations
          const strResults = fuzzySearch(nonSelectedItems.map(itemToString), inputValue || '');

          // and then convert those strings back to the original shape of the items
          const results = items.filter(item => strResults.includes(itemToString(item)));

          // Only show the items that have not been selected

          // We add 3 types of additional data to the input that is going to be renders:
          // 1. `inputProps` that the user asked us to add
          // 2. A handler for the `Delete` button, so that you can delete tokens with a single key
          // 3. When the combobox is not searchable, we make the input "behave" like a div. We
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
            onKeyDown: (event: React.KeyboardEvent) => {
              // Allow deletions of selections by pressing backspace
              if (event.key === 'Backspace' && !inputValue) {
                removeItem(value[value.length - 1]);
              }

              // Allow the user to add custom selections if both `searchable` and `allowAdditions`
              // have a truthy value
              if (event.key === 'Enter' && searchable && allowAdditions && inputValue) {
                // By default validateAddition always returns true. Can be overriden by the user
                // for fine-grained addition
                if (validateAddition && validateAddition(inputValue)) {
                  selectItem(inputValue, { inputValue: '' });
                }
              }
            },
          };

          return (
            <Box {...getRootProps()} {...rootProps}>
              {!!label && <InputElementLabel {...getLabelProps()}>{label}</InputElementLabel>}
              <InputElementOuterBox position="relative" pr={10} disabled={disabled}>
                <Flex alignItems="center" flexWrap="wrap">
                  {value.map(selectedItem => (
                    <Chip
                      key={itemToString(selectedItem)}
                      content={itemToString(selectedItem)}
                      onClick={() => removeItem(selectedItem)}
                      m={1}
                    />
                  ))}
                  <InputElementInnerBox
                    {...getInputProps(additionalInputProps)}
                    is="input"
                    type="text"
                    flex="1 0 auto"
                  />
                  {items.length > 0 && (
                    <IconButton
                      variant="default"
                      position="absolute"
                      right={3}
                      onClick={() => toggleMenu()}
                      tabIndex={-1}
                    >
                      <Icon size="small" type={isOpen ? 'caret-up' : 'caret-down'} />
                    </IconButton>
                  )}
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

export default MultiCombobox;

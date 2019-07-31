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

export interface ComboboxItem {
  text: string;
  value: string | number | null;
}

export interface RenderItemProps<T> {
  /** The item to render */
  item: T;

  /** Whether this item is selected **/
  selected: boolean;

  /** Whether this item is simply highlighted using the keyboard. This doesn't mean it's selected */
  highlighted: boolean;
}

export interface AutocompleteProps<T extends ComboboxItem> {
  /** Callback when the selection changes */
  onChange: (value: T | T[] | null) => void;

  /** A list of <AutocompleteItem> that the dropdown will have as options */
  items: T[];

  /** An optional function to override the default way that each item renders. In a
   * MultiSelectCombobox, the `selected` is always going to be `false`, since the selected values
   * are not visible in the menu */
  renderItem?: ({ item, selected, highlighted }: RenderItemProps<T>) => React.ReactElement;

  /** An optional function to transform each item's shape to an object that contains a `text` and
   * a `value` prop that will be used by the combobox. This is useful if the original data is not
   * already in this format and you don't wanna re-format it on your own */
  transformItem?: (originalItem: T) => T;

  /** The value of the item that is currently selected. The component is a controlled one,
   * so the the selected value should be provided explicitly to the dropdown */
  value: T | T[];

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

const stateReducer = (
  state: DownshiftState<Required<ComboboxItem>>,
  changes: StateChangeOptions<Required<ComboboxItem>>
) => {
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
    default:
      return changes;
  }
};

/**
 * A simple Combobox can be thought of as a typical `<select>` component. Whenerever you would
 * use a normal select, you should now pass the `<Combobox>` component.
 */
const Combobox: React.FC<AutocompleteProps<Required<ComboboxItem>>> = ({
  onChange,
  value,
  items: originalItems,
  transformItem,
  renderItem,
  searchable,
  label,
  inputProps,
  rootProps,
  menuProps,
  disabled,
}) => {
  // Normally we would want to check if we have a multicombobox only once and store it in a const,
  // but Typescript wouldn't understand that, since it would view that const as a simple "boolean"
  // and not as a "check whether value is an array".
  // https://github.com/Microsoft/TypeScript/issues/24865
  // We use this alias for `Array.isArray` just so we can make it easier to the user to understand
  // the code below.
  const isMultiCombobox = Array.isArray;

  // When choosing to remove an item we behave differently depending on whether we have multiple
  // values or a single one
  const removeItem = (item: ComboboxItem) => {
    onChange(isMultiCombobox(value) ? value.filter(i => i !== item) : null);
  };

  // When choosing to add an item we behave differently depending on whether we have multiple
  // values that can be selected at a time or just a single one
  const addSelectedItem = (item: ComboboxItem) => {
    onChange(isMultiCombobox(value) ? [...value, item] : item);
  };

  return (
    <Box position="relative">
      <Downshift
        stateReducer={isMultiCombobox(value) ? stateReducer : undefined}
        onChange={addSelectedItem}
        selectedItem={value}
        itemToString={item => (item === null ? '' : item.text)}
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
          getLabelProps,
        }) => {
          // Make sure to get the original items and transform them into {text, value} nodes, based
          // on the `transformItem` function that was passed as an argument
          const items = originalItems.map(transformItem!);

          // Initially we set the results to be all the items available. Results are the entries
          // that will end up being visible to the user
          let results = items;

          // If it's a multicombobox we want to not include the results already selected and we want
          // to make sure that the results get filtered by the search term of the user
          if (isMultiCombobox(value)) {
            const nonSelectedItems = items.filter(
              item => !value.map(s => s.value).includes(item.value)
            );

            // From the non-selected items, make sure to filter the ones that match the user's
            // search term
            results = fuzzySearch(nonSelectedItems, inputValue || '', { key: 'text' });
          }

          // If it's not a multicombobox, only filter results by search term when the searching
          // functionality is available. If it's not searchable, then we *always* want to display
          // all results
          if (!isMultiCombobox(value) && searchable) {
            results = fuzzySearch(items, inputValue || '', { key: 'text' });
          }

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
              onClick: toggleMenu,
              readOnly: true,
              'aria-readonly': true,
            }),
            ...(isMultiCombobox(value) && {
              onKeyDown: (event: React.KeyboardEvent) => {
                if (event.key === 'Backspace' && !inputValue) {
                  removeItem(value[value.length - 1]);
                }
              },
            }),
          };

          return (
            <Box {...getRootProps()} {...rootProps}>
              {!!label && <InputElementLabel {...getLabelProps()}>{label}</InputElementLabel>}
              <InputElementOuterBox position="relative" pr={10} disabled={disabled}>
                <Flex alignItems="center" flexWrap="wrap">
                  {isMultiCombobox(value) &&
                    value.map(selectedItem => (
                      <Chip
                        key={String(selectedItem.value)}
                        content={selectedItem.text}
                        onClick={() => removeItem(selectedItem)}
                        m={1}
                      />
                    ))}
                  <InputElementInnerBox
                    {...getInputProps(additionalInputProps)}
                    as="input"
                    type="text"
                    flex="1 0 auto"
                  />
                  <IconButton position="absolute" right={3} onClick={toggleMenu}>
                    <Icon type={isOpen ? 'caret-up' : 'caret-down'} />
                  </IconButton>
                </Flex>
              </InputElementOuterBox>
              <Box {...getMenuProps()} {...menuProps}>
                {isOpen && (
                  <Card zIndex={1} mt={2} position="absolute" width={1}>
                    {results.map((item, index) => (
                      <Box {...getItemProps({ item })} key={item.value}>
                        {renderItem!({
                          item,
                          selected: false,
                          highlighted: highlightedIndex === index,
                        })}
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

Combobox.defaultProps = {
  label: undefined,
  searchable: false,
  disabled: false,
  inputProps: {},
  rootProps: {},
  menuProps: {},
  transformItem: ({ text, value }) => ({ text, value }),

  // eslint-disable-next-line react/display-name
  renderItem: ({ item, selected, highlighted }) => (
    <MenuItem highlighted={highlighted} selected={selected}>
      {item.text}
    </MenuItem>
  ),
};

export default React.memo(Combobox);

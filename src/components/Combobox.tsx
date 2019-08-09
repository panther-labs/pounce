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

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ComboboxItem
  extends Required<{
    text: string;
    value: any;
  }> {
  [key: string]: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface RenderItemProps {
  /** The item to render */
  item: ComboboxItem;

  /** Whether this item is selected **/
  selected: boolean;

  /** Whether this item is simply highlighted using the keyboard. This doesn't mean it's selected */
  highlighted: boolean;
}

export interface AutocompleteProps {
  /** Callback when the selection changes */
  onChange: (value: ComboboxItem[]) => void;

  /** A list of `AutocompleteItem` that the dropdown will have as options */
  items: ComboboxItem[];

  /**
   * An optional function to override the default way that each item renders. In a
   * MultiSelectCombobox, the `selected` is always going to be `false`, since the selected values
   * are not visible in the menu
   * */
  renderItem?: ({ item, selected, highlighted }: RenderItemProps) => React.ReactElement;

  /**
   * The value of the item that is currently selected. The component is a controlled one,
   * so the the selected value should be provided explicitly to the dropdown
   * */
  value: ComboboxItem[];

  /** The label associated with this dropdown form element */
  label?: string;

  /** Whether the Combobox should have an input to search results */
  searchable?: boolean;

  /** Whether the Combobox should accept more than one values*/
  multiple?: boolean;

  /** Whether the component should be disabled or not */
  disabled?: boolean;

  /** A set of props & attributes that will be given to the input */
  inputProps?: TextInputProps;

  /**
   * Allow the user to add custom entries to the dropdown instead of limiting selections to the
   * predefined set of options. The `searchable` & `multiple` prop should be true in order for
   * this functionality to work.
   * */
  allowAdditions?: boolean;

  /**
   * A function that runs before a custom item is added by the user. If it returns `true`, then this
   * item will be added to the selection. If not, then this item won't be added
   * */
  validateAddition?: (item: ComboboxItem) => boolean;

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
    case Downshift.stateChangeTypes.controlledPropUpdatedSelectedItem:
      return {
        ...changes,
        inputValue: '',
      };

    default:
      return changes;
  }
};

/**
 * A simple Combobox can be thought of as a typical `<select>` component. Whenerever you would
 * use a normal select, you should now pass the `<Combobox>` component.
 */
const Combobox: React.FC<AutocompleteProps> = ({
  onChange,
  value,
  items,
  renderItem,
  searchable,
  label,
  multiple,
  inputProps,
  rootProps,
  menuProps,
  disabled,
  allowAdditions,
  validateAddition,
}) => {
  // When choosing to remove an item we behave differently depending on whether we have multiple
  // values or a single one
  const removeItem = (item: ComboboxItem) => {
    onChange(value.filter(i => i !== item));
  };

  // When choosing to add an item we behave differently depending on whether we have multiple
  // values that can be selected at a time or just a single one
  const addSelectedItem = (item: ComboboxItem) => {
    if (item !== null) {
      onChange(multiple ? [...value, item] : [item]);
    }
  };

  return (
    <Box position="relative">
      <Downshift
        stateReducer={multiple ? stateReducer : undefined}
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
          openMenu,
          getLabelProps,
          selectItem,
        }) => {
          // Initially we set the results to be all the items available. Results are the entries
          // that will end up being visible to the user
          let results = items;

          // If it's a multicombobox we want to not include the results already selected and we want
          // to make sure that the results get filtered by the search term of the user
          if (multiple) {
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
          if (!multiple && searchable) {
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
              onMouseDown: toggleMenu,
              onFocus: openMenu,
              readOnly: true,
              'aria-readonly': true,
            }),
            ...(multiple && {
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
                  const itemToBeAdded: ComboboxItem = { text: inputValue, value: inputValue };
                  if (validateAddition && validateAddition(itemToBeAdded)) {
                    selectItem(itemToBeAdded);
                  }
                }
              },
            }),
          };

          return (
            <Box {...getRootProps()} {...rootProps}>
              {!!label && <InputElementLabel {...getLabelProps()}>{label}</InputElementLabel>}
              <InputElementOuterBox position="relative" pr={10} disabled={disabled}>
                <Flex alignItems="center" flexWrap="wrap">
                  {multiple &&
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
                  {items.length > 0 && (
                    <IconButton position="absolute" right={3} onClick={toggleMenu} tabIndex="-1">
                      <Icon size="small" type={isOpen ? 'caret-up' : 'caret-down'} />
                    </IconButton>
                  )}
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
  label: '',
  searchable: false,
  disabled: false,
  multiple: false,
  allowAdditions: false,
  validateAddition: () => true,
  inputProps: {},
  rootProps: {},
  menuProps: {},

  // eslint-disable-next-line react/display-name
  renderItem: ({ item, selected, highlighted }) => (
    <MenuItem highlighted={highlighted} selected={selected}>
      {item.text}
    </MenuItem>
  ),
};

export default React.memo(Combobox);

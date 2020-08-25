/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Downshift, { DownshiftState, StateChangeOptions } from 'downshift';
import { filter as fuzzySearch } from 'fuzzaldrin';
import Box from '../Box';
import MenuItem from '../utils/MenuItem';
import Icon from '../Icon';
import Flex from '../Flex';
import { InputControl, InputLabel, InputElement, InputElementProps } from '../utils/Input';
import Tag from './Tag';
import { typedMemo } from '../../utils/helpers';
import Menu from '../utils/Menu';

export type MultiComboboxProps<T> = {
  /** Callback when the selection changes */
  onChange: (value: T[]) => void;

  /** The label associated with this dropdown form element */
  label: string;

  /** A list of entries that the dropdown will have as options */
  items: T[];

  /**
   * A function that converts the an item to a string. This is the value that the dropdown will
   * expose to the user. This is also the value that the dropdown will use internally for comparisons
   * so it should be unique (which should be by default since you wouldn't want to expose duplicate
   * values to the user)
   *
   *
   * @default (item) => item
   *
   * */
  itemToString?: (item: T) => string;

  /**
   * A function that accepts an item as a parameteer and returns `true` if the item should be
   * disabled or `false` otherwise.
   *
   * @default () => false
   *
   */
  disableItem?: (item: T) => boolean;

  /**
   * The value of the item that is currently selected. The component is a controlled one,
   * so the the selected value should be provided explicitly to the dropdown
   * */
  value: T[];

  /** Whether the multi-combobox has an invalid value */
  invalid?: boolean;

  /** Whether the multi-combobox is required or not */
  required?: boolean;

  /** Whether the multi-combobox is disabled or not */
  disabled?: boolean;

  /** A placeholder that's visible when the user focuses on the Combobox */
  placeholder?: string;

  /** Whether the MultiCombobox should have an input to search results */
  searchable?: boolean;

  /** @ignore */
  hidden?: boolean;

  /**
   * Allow the user to add custom entries to the dropdown instead of limiting selections to the
   * predefined set of options. The `searchable` prop should be true in order for
   * this functionality to work.
   *
   * @default false
   *
   * */
  allowAdditions?: boolean;

  /**
   * The strategy for splitting tokens in the MultiCombobox
   *
   * @default 'none'
   *
   * */
  delimiter?: 'none' | 'enter' | 'space' | 'comma';

  /**
   * The maximum number of results that the MultiCombobox should show. By default it displays all of
   * them
   *
   * @default undefined
   *
   * */
  maxResults?: number;

  /** The maximum height (in pixels) of the MultiCombobox dropdown
   *
   * @default 300
   *
   * */
  maxHeight?: number;

  /**
   * A function that runs before a custom item is added by the user. If it returns `true`, then this
   * item will be added to the selection. If not, then this item won't be added
   *
   * @default (item) => true
   *
   * */
  validateAddition?: (userEnteredInput: string) => boolean;
};

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
function MultiCombobox<Item>({
  onChange,
  value,
  items,
  disableItem = () => false,
  searchable = false,
  label = '',
  disabled = false,
  placeholder = '',
  itemToString = item => String(item),
  allowAdditions = false,
  validateAddition = () => true,
  maxHeight = 300,
  maxResults,
  invalid,
  hidden,
  ...rest
}: MultiComboboxProps<Item>): React.ReactElement<MultiComboboxProps<Item>> {
  const removeItem = (item: any) => {
    onChange(value.filter(i => i !== item));
  };

  const addSelectedItem = (item: any) => {
    if (item !== null) {
      onChange([...value, item]);
    }
  };

  return (
    <Downshift<Item>
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
        getLabelProps,
        inputValue,
        isOpen,
        toggleMenu,
        openMenu,
        selectedItem,
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

        // and then convert those strings back to the original shape of the items, while making
        // sure to only display a (potentially) limited number of them
        const results = items
          .filter(item => strResults.includes(itemToString(item)))
          .slice(0, maxResults);

        // Only show the items that have not been selected

        // We add 2 types of additional data to the input that is going to be renders:
        // 1. A handler for the `Delete` button, so that you can delete tokens with a single key
        // 3. When the combobox is not searchable, we make the input "behave" like a div. We
        // still want an input though for placeholder, spacings, etc.
        const additionalInputProps = {
          ...rest,
          ...(!searchable && {
            cursor: 'pointer',
            onMouseDown: toggleMenu,
            readOnly: true,
            placeholder: !value.length ? placeholder : '',
            position: !value.length ? 'static' : 'absolute',
          }),
          ...(searchable && {
            placeholder: isOpen || (value.length && allowAdditions) ? placeholder : '',
            mt: (isOpen && value.length) || (isOpen && value.length && allowAdditions) ? -4 : 0,
            position: isOpen || (isOpen && value.length && allowAdditions) ? 'static' : 'absolute',
          }),
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          onFocus: openMenu,
          onKeyDown: (event: React.KeyboardEvent) => {
            // Allow deletions of selections by pressing backspace
            if (event.key === 'Backspace' && !inputValue) {
              removeItem(value[value.length - 1]);
            }

            // Allow the user to add custom selections if both `searchable` and `allowAdditions`
            // have a truthy value
            if (event.key === 'Enter' && searchable && allowAdditions && inputValue) {
              event.preventDefault();

              // By default validateAddition always returns true. Can be overriden by the user
              // for fine-grained addition
              if (validateAddition && validateAddition(inputValue)) {
                selectItem((inputValue as unknown) as Item, { inputValue: '', isOpen: true });
              }
            }
          },
        };

        return (
          <Box position="relative" {...getRootProps()}>
            <Box position="relative">
              <InputControl
                invalid={invalid}
                disabled={disabled}
                variant={isOpen && items.length ? 'solid' : 'outline'}
                hidden={hidden}
              >
                {value.length > 0 && (
                  <Flex as="ul" wrap="wrap" pl={3} pr={10} pt="19px" pb="2px">
                    {value.map(selectedItem => (
                      <Tag
                        as="li"
                        key={itemToString(selectedItem)}
                        m={1}
                        onRemove={() => removeItem(selectedItem)}
                      >
                        {itemToString(selectedItem)}
                      </Tag>
                    ))}
                  </Flex>
                )}
                <InputElement
                  as="input"
                  type="text"
                  {...(getInputProps(additionalInputProps) as Omit<InputElementProps, 'ref'>)}
                />
                <InputLabel raised={!!value.length} {...getLabelProps()}>
                  {label}
                </InputLabel>
              </InputControl>

              {items.length > 0 && (
                <Icon
                  type={isOpen ? 'caret-up' : 'caret-down'}
                  position="absolute"
                  pointerEvents="none"
                  my="auto"
                  top={0}
                  bottom={0}
                  right={4}
                />
              )}
            </Box>
            <Menu
              as="ul"
              maxHeight={maxHeight}
              isOpen={isOpen && results.length > 0}
              {...getMenuProps()}
            >
              {results.map(item => (
                <MenuItem
                  {...getItemProps({ item, disabled: disableItem(item) })}
                  as="li"
                  listStyle="none"
                  key={itemToString(item)}
                  selected={item === selectedItem}
                >
                  {itemToString(item)}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        );
      }}
    </Downshift>
  );
}

export default typedMemo(MultiCombobox);


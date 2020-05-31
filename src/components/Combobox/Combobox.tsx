/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Downshift from 'downshift';
import { filter as fuzzySearch } from 'fuzzaldrin';
import Box from '../Box';
import MenuItem from '../utils/MenuItem';
import Icon from '../Icon';
import { InputControl, InputElement, InputLabel, InputElementProps } from '../utils/Input';

export type ComboboxProps<T> = {
  /** Callback when the selection changes */
  onChange: (value: T | null) => void;

  /** A list of entries that the dropdown will have as options */
  items: T[];

  /** The label that is associated with this combobox */
  label: string;

  /**
   * A function that converts the an item to a string. This is the value that the dropdown will
   * expose to the user. This is also the value that the dropdown will use internally for comparisons
   * so it should be unique (which should be by default since you wouldn't want to expose duplicate
   * values to the user) */
  itemToString?: (item: T) => string;

  /**
   * A function that accepts an item as a parameteer and returns `true` if the item should be
   * disabled or `false` otherwise. Defaults to `() => false`.
   */
  disableItem?: (item: T) => boolean;

  /** Whether the combobox has an invalid value */
  invalid?: boolean;

  /** Whether the combobox is required or not */
  required?: boolean;

  /** Whether the combobox is disabled or not */
  disabled?: boolean;

  /** A placeholder that's visible when the user focuses on the Combobox */
  placeholder?: string;

  /**
   * The value of the item that is currently selected. The component is a controlled one,
   * so the the selected value should be provided explicitly to the dropdown
   * */
  value: T | null;

  /** Whether the Combobox should have an input to search results */
  searchable?: boolean;

  /**
   * The maximum number of results that the MultiCombobox should show. Default value is
   * `undefined` to display which displays all of them.
   * */
  maxResults?: number;

  /** The maximum height (in pixels) of the MultiCombobox dropdown. Defaults to 300. */
  maxHeight?: number;
};

/**
 * A simple Combobox can be thought of as a typical `<select>` component. Whenerever you would
 * use a normal select, you should now pass the `<Combobox>` component.
 */
function Combobox<Item>({
  onChange,
  value,
  items,
  searchable = false,
  label = '',
  disabled = false,
  disableItem = () => false,
  itemToString = item => String(item),
  maxHeight = 300,
  maxResults,
  invalid,
  required,
  ...rest
}: ComboboxProps<Item>): React.ReactElement<ComboboxProps<Item>> {
  // convert item to a string with a fallback of empty string
  const safeItemToString = (item: Item | null) => (item != undefined ? itemToString(item) : '');

  // Due to the way we want our Combobox to behave, we want to control the input value ourselves.
  // We make sure to update it on every selection made, on every keystroke within the search input,
  // plus some focus/blur events that are tied to the searchable behaviour (see below)
  const [inputValue, setInputValue] = React.useState('');

  React.useLayoutEffect(() => {
    setInputValue(safeItemToString(value));
  }, [value]);

  return (
    <Downshift<Item>
      onSelect={selectedItem => setInputValue(safeItemToString(selectedItem))}
      onChange={onChange}
      selectedItem={value}
      inputValue={inputValue}
      itemToString={safeItemToString}
    >
      {({
        getRootProps,
        getInputProps,
        getItemProps,
        getMenuProps,
        getLabelProps,
        highlightedIndex,
        selectedItem,
        isOpen,
        toggleMenu,
        openMenu,
        closeMenu,
      }) => {
        let results = items;

        // If it's searchable, only filter results by search term when the searching
        // functionality is available.
        if (searchable) {
          const strResults = fuzzySearch(results.map(itemToString), inputValue);

          // convert those strings back to the original shape of the items, while making
          // sure to only display a (potentially) limited number of them
          results = items
            .filter(item => strResults.includes(itemToString(item)))
            .slice(0, maxResults);
        }

        // Only show the items that have not been selected

        // We add 2 types of additional data to the input that is going to be renders:
        // 1. When the combobox is not searchable, we make the input "behave" like a div. We
        // still want an input though for placeholder, spacings, etc.
        // 2. When the combobox is searchable, we want it to behave like an empty input when
        // focused (showcasing the current value through the placeholder) so that the user can
        // see all the options even if he has already selected an option (to do that we need to
        // clear the input). If the user blurs, then we revert back to a normal behaviour
        const additionalInputProps = {
          ...rest,
          ...(!searchable && {
            cursor: 'pointer',
            onMouseDown: toggleMenu,
            onFocus: openMenu,
            readOnly: true,
          }),
          ...(searchable && {
            placeholder: value != undefined ? itemToString(value) : rest.placeholder,
            onChange: (e: React.FormEvent<HTMLInputElement>) =>
              setInputValue(e.currentTarget.value),
            onFocus: () => {
              openMenu();
              setInputValue('');
            },
            onBlur: () => {
              closeMenu();
              setInputValue(safeItemToString(value));
            },
          }),
        };

        return (
          <Box position="relative" {...getRootProps()}>
            <Box position="relative">
              <InputControl
                invalid={invalid}
                disabled={disabled}
                required={required}
                variant={isOpen ? 'solid' : 'outline'}
              >
                <InputElement
                  as="input"
                  type="text"
                  truncated
                  {...(getInputProps(additionalInputProps) as InputElementProps)}
                />
                <InputLabel raised={!!value} {...getLabelProps()}>
                  {label}
                </InputLabel>
              </InputControl>
              <Icon
                opacity={disabled ? 0.3 : 1}
                type={isOpen ? 'caret-up' : 'caret-down'}
                position="absolute"
                pointerEvents="none"
                my="auto"
                top={0}
                bottom={0}
                right={4}
                color="gray-50"
              />
            </Box>
            <Box as="ul" mt="-3px" {...getMenuProps()}>
              {isOpen && (
                <Box
                  as="li"
                  border="1px solid"
                  borderLeftColor="blue-600"
                  borderRightColor="blue-600"
                  borderBottomColor="blue-600"
                  borderTopColor="navyblue-600"
                  borderBottomLeftRadius="medium"
                  borderBottomRightRadius="medium"
                  backgroundColor="navyblue-450"
                  zIndex={1}
                  position="absolute"
                  width={1}
                  maxHeight={maxHeight}
                  overflow="auto"
                >
                  {results.map((item, index) => (
                    <MenuItem
                      {...getItemProps({ item, disabled: disableItem(item) })}
                      key={itemToString(item)}
                      highlighted={highlightedIndex === index}
                      selected={item === selectedItem}
                      disabled={disableItem(item)}
                    >
                      {itemToString(item)}
                    </MenuItem>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        );
      }}
    </Downshift>
  );
}

export default Combobox;

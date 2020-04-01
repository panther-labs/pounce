/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Downshift from 'downshift';
import { filter as fuzzySearch } from 'fuzzaldrin';
import Card from './Card';
import Box, { BoxProps } from './Box';
import MenuItem from './MenuItem';
import { TextInputProps } from './TextInput';
import IconButton from './IconButton';
import Icon from './Icon';
import Flex from './Flex';
import { InputElementOuterBox, InputElementLabel, InputElementInnerBox } from './BaseInputElement';

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

  /**
   * The maximum number of results that the MultiCombobox should show. Default value is
   * `undefined` to display which displays all of them.
   * */
  maxResults?: number;

  /** The maximum height (in pixels) of the MultiCombobox dropdown. Defaults to 300. */
  maxHeight?: number;

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
function Combobox<ItemShape>({
  onChange,
  value,
  items,
  renderItem,
  searchable = false,
  label = '',
  inputProps = {},
  rootProps: userRootProps = {},
  menuProps: userMenuProps = {},
  disabled = false,
  itemToString = item => String(item),
  maxHeight = 300,
  maxResults,
}: ComboboxProps<ItemShape>): React.ReactElement<ComboboxProps<ItemShape>> {
  // convert item to a string with a fallback of empty string
  const safeItemToString = (item: ItemShape | null) => (item ? itemToString(item) : '');

  // Due to the way we want our Combobox to behave, we want to control the input value ourselves.
  // We make sure to update it on every selection made, on every keystroke within the search input,
  // plus some focus/blur events that are tied to the searchable behaviour (see below)
  const [inputValue, setInputValue] = React.useState('');

  React.useLayoutEffect(() => {
    setInputValue(safeItemToString(value));
  }, [value]);

  return (
    <Box position="relative">
      <Downshift
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
          highlightedIndex,
          isOpen,
          toggleMenu,
          openMenu,
          closeMenu,
          getLabelProps,
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

          // We add 3 types of additional data to the input that is going to be renders:
          // 1. `inputProps` that the user asked us to add
          // 2. When the combobox is not searchable, we make the input "behave" like a div. We
          // still want an input though for placeholder, spacings, etc.
          // 3. When the combobox is searchable, we want it to behave like an empty input when
          // focused (showcasing the current value through the placeholder) so that the user can
          // see all the options even if he has already selected an option (to do that we need to
          // clear the input). If the user blurs, then we revert back to a normal behaviour
          const additionalInputProps = {
            ...inputProps,
            ...(!searchable && {
              style: { cursor: 'pointer' },
              onMouseDown: toggleMenu,
              onFocus: openMenu,
              readOnly: true,
              'aria-readonly': true,
            }),
            ...(searchable && {
              placeholder: value ? itemToString(value) : inputProps.placeholder,
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

          const { innerRootRef, ...downshiftRootProps } = getRootProps(
            { refKey: 'innerRootRef' },
            { suppressRefError: true }
          );
          const { innerMenuRef, ...downshiftMenuProps } = getMenuProps(
            { refKey: 'innerMenuRef' },
            { suppressRefError: true }
          );

          return (
            <Box {...downshiftRootProps} {...userRootProps} innerRef={innerRootRef}>
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
                    type="button"
                    variant="default"
                    position="absolute"
                    right={3}
                    onClick={() => toggleMenu()}
                    tabIndex={-1}
                    p={2}
                  >
                    <Icon size="small" type={isOpen ? 'caret-up' : 'caret-down'} />
                  </IconButton>
                </Flex>
              </InputElementOuterBox>
              <Box {...downshiftMenuProps} {...userMenuProps} innerRef={innerMenuRef}>
                {isOpen && (
                  <Card
                    zIndex={1}
                    mt={2}
                    position="absolute"
                    width={1}
                    maxHeight={maxHeight}
                    style={{ overflow: 'auto' }}
                  >
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
}

export default Combobox;

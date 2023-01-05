/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Downshift, { DownshiftState, StateChangeOptions } from 'downshift';
import { filter as fuzzySearch } from 'fuzzaldrin';
import Box, { NativeAttributes } from '../Box';
import IconButton from '../IconButton';
import Flex from '../Flex';
import { InputControl, InputLabel, InputElement } from '../utils/Input';
import Tag from './Tag';
import { typedMemo } from '../../utils/helpers';
import Menu from '../utils/Menu';
import AbstractButton from '../AbstractButton';
import ComboBoxItems from '../utils/ComboBoxItems/ComboBoxItems';
import Icon from '../Icon';

type DefaultContentProps<T> = {
  itemToString: (item: T) => string;
  removeItem: (item: T) => void;
  value: T[];
  isOpen: boolean;
};

export type MultiComboboxProps<T> = Omit<NativeAttributes<'input'>, 'value' | 'onChange'> & {
  /** Callback when the selection changes */
  onChange: (value: T[]) => void;

  /** The label associated with this dropdown form element */
  label: string;

  /** The variant of the component that decides the colors */
  variant?: 'solid' | 'outline';

  /** Whether the label should get visually hidden */
  hideLabel?: boolean;

  /** A list of entries that the dropdown will have as options */
  items: T[];

  /**
   * A function that converts the an item to a string. This is the value that the dropdown will
   * expose to the user. This is also the value that the dropdown will use internally for comparisons
   * so it should be unique (which should be by default since you wouldn't want to expose duplicate
   * values to the user) */
  itemToString?: (item: T) => string;

  /**
   * A function used to group the Menu Items.
   */
  itemToGroup?: (item: T) => string;

  /**
   * A function that accepts an item as a parameter and returns `true` if the item should be
   * disabled or `false` otherwise. Defaults to `() => false`.
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

  /** Override the default tag content */
  renderContent?: ({
    itemToString,
    removeItem,
    value,
    isOpen,
  }: DefaultContentProps<T>) => React.ReactNode;

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
   * */
  allowAdditions?: boolean;

  /**
   * The maximum number of results that the MultiCombobox should show. Default value is
   * `undefined` to display which displays all of them.
   * */
  maxResults?: number;

  /** The maximum height (in pixels) of the MultiCombobox dropdown. Defaults to 300. */
  maxHeight?: number;

  /** The maximum width (in pixels) of the MultiCombobox dropdown. Defaults to 800. */
  maxWidth?: number;

  /**
   * A function that runs before a custom item is added by the user. If it returns `true`, then this
   * item will be added to the selection. If not, then this item won't be added
   * */
  validateAddition?: (userEnteredInput: string, existing: T[]) => boolean;

  /**
   * This variable is used to determine if and when we are going show users the ability to clear
   * everything they have added to the MultiCombobox
   */
  canClearAllAfter?: number;
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

function DefaultContent<T>({ value, itemToString, removeItem }: DefaultContentProps<T>) {
  return value.map(selectedItem => (
    <Tag as="li" key={itemToString(selectedItem)} m={1} onRemove={() => removeItem(selectedItem)}>
      {itemToString(selectedItem)}
    </Tag>
  ));
}

/**
 * A simple MultiCombobox can be thought of as a typical `<select>` component. Whenever you would
 * use a normal select, you should now pass the `<MultiCombobox>` component.
 */
function MultiCombobox<Item>({
  onChange,
  onBlur,
  value,
  variant = 'outline',
  items,
  disableItem = () => false,
  searchable = false,
  label = '',
  hideLabel,
  disabled = false,
  placeholder = '',
  itemToString = item => String(item),
  itemToGroup,
  allowAdditions = false,
  validateAddition = () => true,
  maxHeight = 300,
  maxWidth = 800,
  maxResults,
  canClearAllAfter,
  invalid,
  hidden,
  renderContent = DefaultContent,
  ...rest
}: MultiComboboxProps<Item>): React.ReactElement<MultiComboboxProps<Item>> {
  const anchorRef = React.useRef<HTMLElement>(null);

  const getVariant = React.useCallback(
    isOpen => {
      if (variant === 'solid') {
        return 'solid';
      }
      return isOpen ? 'solid' : 'outline';
    },
    [variant]
  );

  const removeItem = (item: Item) => {
    onChange(value.filter(i => i !== item));
  };

  const handleChange = (item: Item | Item[] | null) => {
    if (item === null) {
      return;
    }
    const changedItems = Array.isArray(item) ? item : [item];
    // If items are already added, remove them from the selected items list
    if (changedItems.every(item => value.map(itemToString).includes(itemToString(item)))) {
      return onChange(value.filter(i => !changedItems.map(itemToString).includes(itemToString(i))));
    }
    // Append non existing items to the list of selected items
    const newItems = changedItems.filter(i => !value.map(itemToString).includes(itemToString(i)));
    return onChange([...value, ...newItems]);
  };

  const clearSelectedItems = () => {
    onChange([]);
  };

  const itemsPt = hideLabel ? 3 : '19px';

  return (
    <Downshift<Item | Item[]>
      stateReducer={stateReducer}
      onChange={handleChange}
      selectedItem={null}
      itemToString={item => (item && !Array.isArray(item) ? itemToString(item) : '')}
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
        selectItem,
      }) => {
        const processUserValue = (inputVal: string | null) => (inputVal || '').trim();
        const validateUserValue = (inputVal: string) =>
          inputVal !== '' && validateAddition(inputVal, value);

        const multiComboboxVariant = getVariant(isOpen);

        let results = items.slice(0, maxResults);
        // If it's searchable, only filter results by search term when the searching
        // functionality is available.
        if (searchable) {
          // We map the items to a new type in order to feed it to the fuzzySearch generic function.
          const itemsToSearch = items.map(i => ({
            // Contains the string representation of the item that will be tested.
            searchString: itemToGroup ? `${itemToGroup(i)}${itemToString(i)}` : itemToString(i),
            // Include the actual item in the object so we can map it back after we are done with the search.
            item: i,
          }));
          results = fuzzySearch(itemsToSearch, inputValue || '', {
            key: 'searchString',
            maxResults,
          }).map(i => i.item);
        }

        // We add 2 types of additional data to the input that is going to be rendered:
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
          }),
          ...(searchable && {
            placeholder:
              (hideLabel && value && value.length && !isOpen) || (value && value.length)
                ? ''
                : placeholder,
            p: isOpen ? 1 : null,
          }),
          position: 'absolute',
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
            if ((event.key === 'Enter' || event.key === ',') && allowAdditions) {
              event.preventDefault();

              // By default validateAddition always returns true. Can be overriden by the user
              // for fine-grained addition
              const processedUserValue = processUserValue(inputValue);
              if (validateUserValue(processedUserValue)) {
                selectItem((processedUserValue as unknown) as Item, {
                  inputValue: '',
                  isOpen: true,
                });
              }
            }
          },
          onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
            const processedUserValue = processUserValue(inputValue);
            if (allowAdditions && validateUserValue(processedUserValue)) {
              selectItem((processedUserValue as unknown) as Item, { inputValue: '' });
            }
            if (onBlur) {
              onBlur(e);
            }
          },
          onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => {
            // prevent it when we can only select values from the dropdown
            if (!allowAdditions) {
              return;
            }

            // Get clipboard data and split them based on newline and/or commas
            const clipboardData = e.clipboardData.getData('Text');
            const items = (clipboardData
              .replace(/\r?\n/g, ',')
              .split(',')
              .map(processUserValue)
              .filter(validateUserValue) as unknown) as Item[];

            if (items.length > 1) {
              // Prevent the text from actually being pasted to the underlying input
              e.preventDefault();
              e.stopPropagation();

              // extend existing values with new ones
              onChange([...value, ...items]);
            }
          },
        };

        return (
          <Box {...getRootProps()}>
            <Box position="relative" ref={anchorRef}>
              <InputControl
                invalid={invalid}
                disabled={disabled}
                variant={multiComboboxVariant}
                hidden={hidden}
              >
                <Flex as="ul" wrap="wrap" align="baseline" pl={3} pr={10} pt={itemsPt} pb="2px">
                  <>
                    {renderContent({ itemToString, removeItem, value, isOpen })}
                    <Box
                      as="li"
                      maxWidth="100%"
                      flexGrow={1}
                      position={isOpen && searchable ? 'relative' : 'initial'}
                    >
                      {isOpen && searchable && (
                        <InputElement
                          as="span"
                          px={1}
                          py={0}
                          standalone={hideLabel}
                          visibility="hidden"
                          color="transparent"
                          whiteSpace="pre"
                        >
                          {inputValue}
                        </InputElement>
                      )}
                      <InputElement
                        type="text"
                        standalone={hideLabel}
                        {...getInputProps(additionalInputProps)}
                      />
                    </Box>
                  </>
                </Flex>

                <InputLabel
                  visuallyHidden={hideLabel}
                  raised={!!value.length || isOpen}
                  {...getLabelProps()}
                >
                  {label}
                </InputLabel>
              </InputControl>
              {items.length > 0 && (
                <Flex
                  opacity={disabled ? 0.3 : 1}
                  position="absolute"
                  top={0}
                  bottom={0}
                  right={2}
                  align="center"
                  justify="center"
                  pointerEvents={isOpen ? 'auto' : 'none'}
                >
                  <IconButton
                    tabIndex={-1}
                    icon={isOpen ? 'caret-up' : 'caret-down'}
                    size="medium"
                    aria-label="Toggle Menu"
                    onClick={() => toggleMenu({ inputValue: '' })}
                    variant="unstyled"
                  />
                </Flex>
              )}
            </Box>
            <Menu
              as="ul"
              maxHeight={maxHeight}
              maxWidth={maxWidth}
              isOpen={isOpen && results.length > 0}
              anchorRef={anchorRef}
              {...getMenuProps()}
            >
              {isOpen && canClearAllAfter && value.length >= canClearAllAfter && (
                <Box
                  as="li"
                  listStyle="none"
                  backgroundColor="navyblue-350"
                  position="sticky"
                  top={0}
                  zIndex={1}
                >
                  <AbstractButton
                    width="100%"
                    onClick={clearSelectedItems}
                    fontSize="x-small"
                    color="teal-200"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    <Flex as="span" align="center" spacing="6px" py="6px" px={4}>
                      <Icon size="small" type="close-circle" />
                      <Box as="span">Clear Selection</Box>
                    </Flex>
                  </AbstractButton>
                </Box>
              )}
              <ComboBoxItems
                items={results}
                disableItem={disableItem}
                getItemProps={getItemProps}
                itemToString={itemToString}
                itemToGroup={itemToGroup}
                selectedItems={value}
                allowMultipleSelection
              />
            </Menu>
          </Box>
        );
      }}
    </Downshift>
  );
}

export default typedMemo(MultiCombobox);

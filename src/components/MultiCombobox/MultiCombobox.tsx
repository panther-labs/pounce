/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import Downshift, { DownshiftState, StateChangeOptions } from 'downshift';
import { filter as fuzzySearch } from 'fuzzaldrin';
import Box from '../Box';
import Icon from '../Icon';
import Flex from '../Flex';
import { InputControl, InputLabel, InputElement, InputElementProps } from '../utils/Input';
import Tag from './Tag';
import { typedMemo } from '../../utils/helpers';
import Menu from '../utils/Menu';
import AbstractButton from '../AbstractButton';
import MenuItemGroup from './MenuItemGroup';

export type TreeNode<T> = {
  label: string;
  subItems: Array<T | TreeNode<T>>;
};

export type MultiComboboxProps<T> = {
  /** Callback when the selection changes */
  onChange: (value: T[]) => void;

  /** The label associated with this dropdown form element */
  label: string;

  /** The variant of the component that decides the colors */
  variant?: 'solid' | 'outline';

  /** Whether the label should get visually hidden */
  hideLabel?: boolean;

  /** A list of entries that the dropdown will have as options. */
  items: Array<T | TreeNode<T>>;

  /**
   * A function that converts the an item to a string. This is the value that the dropdown will
   * expose to the user. This is also the value that the dropdown will use internally for comparisons
   * so it should be unique (which should be by default since you wouldn't want to expose duplicate
   * values to the user) */
  itemToString?: (item: T) => string;

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

/**
 * Function that recursively flattens the provided array of Menu Items.
 *
 * @param items An array that contains sub-array items
 * @returns A new array with all sub-array items concatenated into it
 */
const flattenItems = <T,>(items: Array<T | TreeNode<T>>): T[] => {
  const flatItems: T[] = [];
  items.forEach(item => {
    if (typeof item === 'object' && 'label' in item) {
      flatItems.push(...flattenItems(item.subItems));
    } else {
      flatItems.push(item);
    }
  });

  return flatItems;
};

/**
 * Function that recursively filters the provided array of Menu Items.
 *
 * @param items An array that contains sub-array items
 * @param allowedItemNames Array containing the names of the items that should be filtered
 * @param itemToString A function that converts an item to a string.
 * @returns A new array containing only the filtered elements
 */
const filterItems = <T,>(
  items: Array<T | TreeNode<T>>,
  allowedItemNames: string[],
  itemToString: (item: T) => string
): Array<T | TreeNode<T>> => {
  const availableItems: Array<T | TreeNode<T>> = [];
  items.forEach(item => {
    if (typeof item === 'object' && 'label' in item) {
      const subItems = filterItems(item.subItems, allowedItemNames, itemToString);
      if (subItems.length > 0) {
        availableItems.push({
          label: item.label,
          subItems,
        });
      }
    } else {
      if (allowedItemNames.includes(itemToString(item))) {
        availableItems.push(item);
      }
    }
  });
  return availableItems;
};

/**
 * A simple MultiCombobox can be thought of as a typical `<select>` component. Whenerever you would
 * use a normal select, you should now pass the `<MultiCombobox>` component.
 */
function MultiCombobox<Item>({
  onChange,
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
  allowAdditions = false,
  validateAddition = () => true,
  maxHeight = 300,
  maxResults,
  canClearAllAfter,
  invalid,
  hidden,
  ...rest
}: MultiComboboxProps<Item>): React.ReactElement<MultiComboboxProps<Item>> {
  const getVariant = React.useCallback(
    isOpen => {
      if (variant === 'solid') {
        return 'solid';
      }
      return isOpen ? 'solid' : 'outline';
    },
    [variant]
  );
  const removeItem = (item: any) => {
    onChange(value.filter(i => i !== item));
  };

  const addSelectedItem = (item: any) => {
    if (item !== null) {
      onChange([...value, item]);
    }
  };

  const clearSelectedItems = () => {
    onChange([]);
  };

  const availableItems = useMemo(() => {
    return flattenItems(items);
  }, [items]);

  const itemsPt = hideLabel ? 3 : '19px';

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
        const processUserValue = (inputVal: string | null) => (inputVal || '').trim();
        const validateUserValue = (inputVal: string) =>
          inputVal !== '' && validateAddition(inputVal, value);

        const multiComboboxVariant = getVariant(isOpen);

        // If it's a multicombobox we DON'T WANT to include the results already selected and also
        // we want to make sure that the results get filtered by the search term of the user
        const nonSelectedItems = availableItems.filter(
          item => !value.map(itemToString).includes(itemToString(item))
        );

        // From the non-selected items, make sure to filter the ones that match the user's
        // search term. To do that we convert our items to their string representations
        const strResults = fuzzySearch(nonSelectedItems.map(itemToString), inputValue || '').slice(
          0,
          maxResults
        );

        // and then convert those strings back to the original shape of the items, while making
        // sure to only display a (potentially) limited number of them
        const filteredItems = filterItems(items, strResults, itemToString);
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
            placeholder,
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
          onBlur: () => {
            const processedUserValue = processUserValue(inputValue);
            if (allowAdditions && validateUserValue(processedUserValue)) {
              selectItem((processedUserValue as unknown) as Item, { inputValue: '' });
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
          <Box position="relative" {...getRootProps()}>
            <Box position="relative">
              <InputControl
                invalid={invalid}
                disabled={disabled}
                variant={multiComboboxVariant}
                hidden={hidden}
              >
                {value.length > 0 && (
                  <Flex as="ul" wrap="wrap" pl={3} pr={10} pt={itemsPt} pb="2px">
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
                {canClearAllAfter && value.length >= canClearAllAfter && (
                  <AbstractButton
                    color="teal-300"
                    zIndex={2}
                    position="absolute"
                    bottom={0}
                    right={18}
                    mb={1}
                    onClick={clearSelectedItems}
                    fontStyle="italic"
                    textDecoration="underline"
                    fontSize="small"
                  >
                    Clear all
                  </AbstractButton>
                )}

                <InputElement
                  as="input"
                  type="text"
                  standalone={hideLabel}
                  {...(getInputProps(additionalInputProps) as Omit<InputElementProps, 'ref'>)}
                />
                <InputLabel visuallyHidden={hideLabel} raised={!!value.length} {...getLabelProps()}>
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
              isOpen={isOpen && filteredItems.length > 0}
              {...getMenuProps()}
            >
              <MenuItemGroup
                items={filteredItems}
                disableItem={disableItem}
                getItemProps={getItemProps}
                itemToString={itemToString}
                selectedItem={selectedItem}
              />
            </Menu>
          </Box>
        );
      }}
    </Downshift>
  );
}

export default typedMemo(MultiCombobox);

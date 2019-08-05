import React from 'react';
import Label from 'components/Label';
import Box from 'components/Box';
import { css } from 'styled-components';
import Flex, { FlexProps } from 'components/Flex';
import Text from 'components/Text';
import BaseButton from 'components/BaseButton';
import Icon from 'components/Icon';

export type TableItem = { [key: string]: string | number | null | undefined };

export type TableItemKeyShape = number | string;

export type ColumnProps = {
  /** A unique identifier for this particular column */
  key: string;

  /**
   * The text that is going to be put as header for this column.
   * Mutually exclusive with `renderColumnHeader`
   * */
  header?: string;

  /** The `flex` value of the column. This is the only way to dictate the width of a certain column.
   * For example a flex value of `1 0 500` makes sure that a column is at least 500 and occupies the
   * remaining space. A flex value of `0 1 200` makes sure that the item is 200 and can shrink if
   * needed.
   */
  flex?: string;

  /** Whether the column should display a "caret", indicating that it is sortable */
  sortable?: boolean;
  /**
   * A function that takes the potential `sortKey` and `sortDir` as parameters (the values are
   * `undefined` if the table is not sortable) and returns a React element that will be put as the
   * header of this particular column. Mutually exclusive with `header`
   * */
  renderColumnHeader?: (hasActiveSortKey: boolean) => React.ReactNode;

  /**
   * A function that takes an `item` and `index` as parameters and returns a React element that
   * will be put as the content of each cell in the column. If it's not defined then Table will use
   * the value of `item[key]`
   * */
  renderCell?: (item: TableItem, index: number) => React.ReactNode;
};

export type TableProps = {
  /**
   * A list of items that are going to be showcased by the Table. TableItem extends the basic JS
   * object, thus the shape of these items can by anything. Usually they keep the same
   * shape as the one that was returned from the API.
   */
  items: TableItem[];

  /** A function that gets an item as param and should return a unique identifier for each item. This
   * prop helps with uniquely identifying an item in the Table in order to optimise re-renders. If
   * omitted, the index of the item will be used as a fallback
   *
   * As a general rule, always try to define this prop
   * */
  getItemKey?: (item: TableItem) => TableItemKeyShape;

  /**
   * A list of column object that describe each column. More info on the shape of these objects
   * follows down below
   * */
  columns: ColumnProps[];

  /** Whether the table should show the table's headers or not. */
  showHeaders?: boolean;

  /** Whether the background of each row should alternate between grey & transparent */
  alternateBg?: boolean;

  /**
   * This is a callback for when the user clicks on one of the headers of the columns that are
   * sortable. If the column is not sortable, then nothing happens.
   */
  onSort?: (key: ColumnProps['key']) => void;

  /**
   * The currently active sort key. This should match the `key` prop defined in each column
   * object
   * */
  sortKey?: ColumnProps['key'] | null;

  /**
   * The currently active sort direction. This can be ascending (asc), descending (desc) or original
   * order (null). You can of course choose to only use `asc` and `desc`
   * */
  sortDir?: 'ascending' | 'descending' | undefined;

  /**
   * Callback that fires whenever the row is selected either through a click event. There are
   * plans to support keyboard navigation.
   * */
  onSelect?: (item: TableItem) => void;
};

/**
 * @private
 * Utility component to help code duplication
 * */
const Cell: React.FC<FlexProps> = ({ children, flex, ...rest }) => (
  <Flex alignItems="center" flexWrap="wrap" p={4} flex={flex || '1 0 0'} {...rest}>
    {children}
  </Flex>
);

/**
 * @private
 * Utility component to help code duplication
 * */
const Row: React.FC<FlexProps> = ({ children, ...rest }) => (
  <Flex role="row" minHeight="50px" {...rest}>
    {children}
  </Flex>
);

/** The typical Table component with additional functionality */
const Table: React.FC<TableProps> = ({
  items,
  columns,
  getItemKey,
  showHeaders,
  onSort = () => {},
  alternateBg,
  sortKey,
  sortDir,
  onSelect,
}) => {
  const renderTableHeader = (column: ColumnProps) => {
    // Get the base component
    let content = column.renderColumnHeader ? (
      column.renderColumnHeader(sortKey === column.key)
    ) : (
      <Label as="h4" size="small" color="grey400">
        {(column.header || '').toUpperCase()}
      </Label>
    );

    // wrap it in a button if we have a clickable column
    if (column.sortable) {
      content = (
        <BaseButton onClick={() => onSort(column.key)}>
          <Flex alignItems="center">
            {content}
            {sortKey === column.key && sortDir && (
              <Icon color="grey400" type={sortDir === 'ascending' ? 'caret-up' : 'caret-down'} />
            )}
          </Flex>
        </BaseButton>
      );
    }

    // Finally wrap it in a flex so that we can center it vertically
    return (
      <Cell key={column.key} role="columnheader" aria-sort={sortDir} flex={column.flex}>
        {content}
      </Cell>
    );
  };

  const renderTableItem = (column: ColumnProps, item: TableItem, index: number) => {
    return (
      <Cell key={column.key} role="cell" flex={column.flex}>
        {column.renderCell ? (
          column.renderCell(item, index)
        ) : (
          <Text size="medium">{item[column.key]}</Text>
        )}
      </Cell>
    );
  };

  return (
    <Box flex="1 0 0" role="table">
      {showHeaders && <Row>{columns.map(renderTableHeader)}</Row>}
      {items.map((item, itemIndex) => (
        <Row
          onClick={() => onSelect && onSelect(item)}
          key={getItemKey ? getItemKey(item) : itemIndex}
          bg={alternateBg && itemIndex % 2 === 0 ? 'grey50' : 'transparent'}
          css={css`
            cursor: pointer;
          `}
        >
          {columns.map(column => renderTableItem(column, item, itemIndex))}
        </Row>
      ))}
    </Box>
  );
};

Table.defaultProps = {
  showHeaders: true,
  alternateBg: true,
};

export default React.memo(Table);

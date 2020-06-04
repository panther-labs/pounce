import React from 'react';
import Flex from '../Flex';
import PseudoBox from '../PseudoBox';
import Icon from '../Icon';
import TableHeaderCell, { TableHeaderCellProps } from './TableHeaderCell';

const sortableHoverStyle = {
  opacity: 0.75,
  svg: {
    opacity: 0.75,
  },
};

export type TableSortableHeaderCellProps = TableHeaderCellProps &
  Required<Pick<TableHeaderCellProps, 'sortDir' | 'onClick'>>;

const TableSortableHeaderCell = React.forwardRef<HTMLTableHeaderCellElement, TableHeaderCellProps>(
  function TableSortLabel({ sortDir, children, align, onClick, ...rest }, ref) {
    const isActive = sortDir !== false;
    const shouldIconBeRightAligned = align !== 'right';

    return (
      <TableHeaderCell ref={ref} sortDir={sortDir} align={align} {...rest}>
        <PseudoBox
          display="inline-flex"
          verticalAlign="middle"
          cursor="pointer"
          _hover={!isActive ? sortableHoverStyle : undefined}
          onClick={onClick}
        >
          <Flex
            as="span"
            inline
            align="center"
            direction={shouldIconBeRightAligned ? 'row-reverse' : 'row'}
            justify={shouldIconBeRightAligned ? 'flex-end' : 'flex-start'}
          >
            <Icon
              type="chevron-down"
              size="small"
              transition="all 0.075s linear"
              transform={`rotate(${sortDir === 'ascending' ? 180 : 0}deg)`}
              opacity={isActive ? 1 : 0}
              aria-hidden={!isActive}
              mr={shouldIconBeRightAligned ? 0 : 1}
              ml={shouldIconBeRightAligned ? 1 : 0}
            />
            {children}
          </Flex>
        </PseudoBox>
      </TableHeaderCell>
    );
  }
);

export default React.memo(TableSortableHeaderCell);

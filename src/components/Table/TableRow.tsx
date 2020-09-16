import React from 'react';
import Box, { NativeAttributes } from '../Box';
import { useTable } from './Table';

export interface TableRowProps extends NativeAttributes<'tr'> {
  /** Whether the row should appear as selected. Defaults to `false` */
  selected?: boolean;

  /** @ignore */
  children: React.ReactNode;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { selected = false, ...rest },
  ref
) {
  const tableProps = useTable();

  const rowStyles = React.useMemo(() => {
    let styles = {};
    if (tableProps.rowSeparationStrategy === 'background') {
      styles = {
        ...styles,
        'tbody > &:nth-of-type(odd)': {
          backgroundColor: !selected ? ('navyblue-500' as const) : undefined,
        },
      };
    }

    if (tableProps.rowSeparationStrategy === 'border') {
      styles = {
        ...styles,
        borderBottom: '1px solid',
        borderColor: 'navyblue-300' as const,
      };
    }

    if (tableProps.hoverable) {
      styles = {
        ...styles,
        transition: 'all 0.05s linear',
        _hover: {
          backgroundColor: 'navyblue-500' as const,
        },
      };
    }

    if (selected) {
      styles = {
        ...styles,
        backgroundColor: 'navyblue-600' as const,
        borderColor: 'navyblue-600' as const,
        _hover: {
          backgroundColor: 'navyblue-600' as const,
          borderColor: 'navyblue-600' as const,
        },
      };
    }

    return styles;
  }, [tableProps, selected]);

  return <Box as="tr" role="row" ref={ref} sx={rowStyles} {...rest} />;
});

export default React.memo(TableRow);

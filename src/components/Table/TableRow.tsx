import React from 'react';
import css, { CSSObject } from '@styled-system/css';
import Box, { NativeHTMLAttributes } from '../Box';
import { useTable } from './Table';

export interface TableRowProps extends NativeHTMLAttributes<React.AllHTMLAttributes<HTMLElement>> {
  /** Whether the row should appear as selected. Defaults to `false` */
  selected?: boolean;
}

const TableRow: React.FC<TableRowProps> = React.forwardRef<HTMLElement, TableRowProps>(
  function TableRow({ selected = false, ...rest }, ref) {
    const tableProps = useTable();

    const rowStyles = React.useMemo(() => {
      let styles = {};
      if (tableProps.rowSeparationStrategy === 'background') {
        styles = {
          ...styles,
          'tbody > &:nth-of-type(odd)': {
            backgroundColor: 'grey50' as const,
          },
        };
      }

      if (tableProps.rowSeparationStrategy === 'border') {
        styles = {
          ...styles,
          borderBottom: '1px solid',
          borderColor: 'grey100' as const,
        };
      }

      if (tableProps.hoverable) {
        styles = {
          ...styles,
          transition: 'all 0.1s linear',
          '&:hover': {
            backgroundColor: 'grey50' as const,
          },
        };
      }

      if (selected) {
        styles = {
          ...styles,
          '&, &:hover': {
            backgroundColor: 'primary50' as const,
            borderColor: 'primary50' as const,
          },
        };
      }

      return styles;
    }, [tableProps, selected]);

    return <Box as="tr" role="row" ref={ref} css={css(rowStyles)} {...rest} />;
  }
);

export default React.memo(TableRow);

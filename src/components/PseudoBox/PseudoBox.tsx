import React from 'react';
import Box, { BoxProps } from '../Box';
import { SystemProps } from '../../system';

export interface PseudoBoxProps extends BoxProps {
  /**
   * Styles for CSS selector `&:after`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <PseudoBox _after={{content:`""` }}/>
   * ```
   */
  _after?: SystemProps['sx'];
  /**
   * Styles for CSS selector `&:before`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <PseudoBox _before={{content:`""` }}/>
   * ```
   */
  _before?: SystemProps['sx'];
  /**
   * Styles for CSS selector `&:focus`
   *
   */
  _focus?: SystemProps['sx'];
  /**
   * Styles for CSS selector `&:hover`
   */
  _hover?: SystemProps['sx'];
  /**
   * Styles for CSS Selector `&:active`
   */
  _active?: SystemProps['sx'];
  /**
   * Styles for CSS Selector `&[aria-pressed=true]`
   * Typically used to style the current "pressed" state of toggle buttons
   */
  _pressed?: SystemProps['sx'];
  /**
   * Styles to apply when the ARIA attribute `aria-selected` is `true`
   * - CSS selector `&[aria-selected=true]`
   */
  _selected?: SystemProps['sx'];
  /**
   * Styles to apply when a child of this element has received focus
   * - CSS Selector `&:focus-within`
   */
  _focusWithin?: SystemProps['sx'];

  /**
   * Styles to apply when the ARIA attribute `aria-invalid` is `true`
   * - CSS selector `&[aria-invalid=true]`
   */
  _invalid?: SystemProps['sx'];
  /**
   * Styles to apply when this element is disabled. The passed styles are applied to these CSS selectors:
   * - `&[aria-disabled=true]`
   * - `&:disabled`
   * - `&:disabled:focus`
   * - `&:disabled:hover`
   * - `&:focus[aria-disabled=true]`
   * - `&:hover[aria-disabled=true]`
   */
  _disabled?: SystemProps['sx'];
  /**
   * Styles to apply when the ARIA attribute `aria-grabbed` is `true`
   * - CSS selector `&[aria-grabbed=true]`
   */
  _grabbed?: SystemProps['sx'];
  /**
   * Styles to apply when the ARIA attribute `aria-expanded` is `true`
   * - CSS selector `&[aria-expanded=true]`
   */
  _expanded?: SystemProps['sx'];
  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `true`
   * - CSS selector `&[aria-checked=true]`
   */
  _checked?: SystemProps['sx'];
  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `mixed`
   * - CSS selector `&[aria-checked=mixed]`
   */
  _mixed?: SystemProps['sx'];
  /**
   * Styles for CSS Selector `&:nth-child(odd)`
   */
  _odd?: SystemProps['sx'];
  /**
   * Styles for CSS Selector `&:nth-child(even)`
   */
  _even?: SystemProps['sx'];
  /**
   * Styles for CSS Selector `&:visited`
   */
  _visited?: SystemProps['sx'];
  /**
   * Styles for CSS Selector `&:readonly`
   */
  _readOnly?: SystemProps['sx'];
  /**
   * Styles for CSS Selector `&:first-of-type`
   */
  _first?: SystemProps['sx'];
  /**
   * Styles for CSS Selector `&:last-of-type`
   */
  _last?: SystemProps['sx'];
  /**
   * Styles to apply when you hover on a parent that has `role=group`.
   */
  _groupHover?: SystemProps['sx'];
  /**
   * Styles for CSS Selector `&:not(:first-of-type)`
   */
  _notFirst?: SystemProps['sx'];
  /**
   * Styles for CSS Selector `&:not(:last-of-type)`
   */
  _notLast?: SystemProps['sx'];
  /**
   * Styles for CSS Selector `&::placeholder`.
   * Useful for inputs
   */
  _placeholder?: SystemProps['sx'];
  /**
   * Styles for CSS Selector `&::webkit-autofill`.
   * Useful for inputs
   */
  _autofill?: SystemProps['sx'];
}

/**
 * The selectors are based on [WAI-ARIA state properties](https://www.w3.org/WAI/PF/aria-1.1/states_and_properties) and common CSS Selectors
 */
const hover = '&:hover';
const active = '&:active, &[data-active=true]';
const focus = '&:focus';
const visited = '&:visited';
const even = '&:nth-of-type(even)';
const odd = '&:nth-of-type(odd)';
const disabled =
  '&:disabled, &:disabled:focus, &:disabled:hover, &[aria-disabled=true], &[aria-disabled=true]:focus, &[aria-disabled=true]:hover';
const checked = '&[aria-checked=true]';
const mixed = '&[aria-checked=mixed]';
const selected = '&[aria-selected=true], [data-selected] > &';
const invalid = '&[aria-invalid=true]';
const pressed = '&[aria-pressed=true]';
const readOnly = '&[aria-readonly=true], &[readonly]';
const first = '&:first-of-type';
const last = '&:last-of-type';
const expanded = '&[aria-expanded=true]';
const grabbed = '&[aria-grabbed=true]';
const notFirst = '&:not(:first-of-type)';
const notLast = '&:not(:last-of-type)';
const groupHover = '[role=group]:hover &';
const autofill = '&:-webkit-autofill';

export const PseudoBox = React.forwardRef<HTMLElement, PseudoBoxProps>(function PseudoBox(
  {
    _after,
    _focus,
    _selected,
    _focusWithin,
    _hover,
    _invalid,
    _active,
    _disabled,
    _grabbed,
    _pressed,
    _expanded,
    _visited,
    _before,
    _readOnly,
    _first,
    _notFirst,
    _notLast,
    _last,
    _placeholder,
    _checked,
    _groupHover,
    _mixed,
    _odd,
    _even,
    _autofill,
    ...rest
  },
  ref
) {
  return (
    <Box
      ref={ref}
      sx={{
        [hover]: _hover,
        [focus]: _focus,
        [active]: _active,
        [visited]: _visited,
        [disabled]: {
          opacity: 0.3,
          pointerEvents: 'none',
          cursor: 'default',
          ..._disabled,
        },
        [selected]: _selected,
        [invalid]: _invalid,
        [expanded]: _expanded,
        [grabbed]: _grabbed,
        [readOnly]: _readOnly,
        [first]: _first,
        [notFirst]: _notFirst,
        [notLast]: _notLast,
        [last]: _last,
        [odd]: _odd,
        [even]: _even,
        [mixed]: _mixed,
        [checked]: _checked,
        [pressed]: _pressed,
        [groupHover]: _groupHover,
        [autofill]: _autofill,
        '&::before': _before,
        '&::after': _after,
        '&:focus-within': _focusWithin,
        '&::placeholder': _placeholder ?? {},
      }}
      {...rest}
    />
  );
});

export default PseudoBox;

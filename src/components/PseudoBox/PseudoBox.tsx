import React from 'react';
import css from '@styled-system/css';
import Box, { BoxProps, transformAliasProps as tx } from '../Box';

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
  _after?: BoxProps;
  /**
   * Styles for CSS selector `&:before`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <PseudoBox _before={{content:`""` }}/>
   * ```
   */
  _before?: BoxProps;
  /**
   * Styles for CSS selector `&:focus`
   *
   */
  _focus?: BoxProps;
  /**
   * Styles for CSS selector `&:hover`
   */
  _hover?: BoxProps;
  /**
   * Styles for CSS Selector `&:active`
   */
  _active?: BoxProps;
  /**
   * Styles for CSS Selector `&[aria-pressed=true]`
   * Typically used to style the current "pressed" state of toggle buttons
   */
  _pressed?: BoxProps;
  /**
   * Styles to apply when the ARIA attribute `aria-selected` is `true`
   * - CSS selector `&[aria-selected=true]`
   */
  _selected?: BoxProps;
  /**
   * Styles to apply when a child of this element has received focus
   * - CSS Selector `&:focus-within`
   */
  _focusWithin?: BoxProps;

  /**
   * Styles to apply when the ARIA attribute `aria-invalid` is `true`
   * - CSS selector `&[aria-invalid=true]`
   */
  _invalid?: BoxProps;
  /**
   * Styles to apply when this element is disabled. The passed styles are applied to these CSS selectors:
   * - `&[aria-disabled=true]`
   * - `&:disabled`
   * - `&:disabled:focus`
   * - `&:disabled:hover`
   * - `&:focus[aria-disabled=true]`
   * - `&:hover[aria-disabled=true]`
   */
  _disabled?: BoxProps;
  /**
   * Styles to apply when the ARIA attribute `aria-grabbed` is `true`
   * - CSS selector `&[aria-grabbed=true]`
   */
  _grabbed?: BoxProps;
  /**
   * Styles to apply when the ARIA attribute `aria-expanded` is `true`
   * - CSS selector `&[aria-expanded=true]`
   */
  _expanded?: BoxProps;
  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `true`
   * - CSS selector `&[aria-checked=true]`
   */
  _checked?: BoxProps;
  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `mixed`
   * - CSS selector `&[aria-checked=mixed]`
   */
  _mixed?: BoxProps;
  /**
   * Styles for CSS Selector `&:nth-child(odd)`
   */
  _odd?: BoxProps;
  /**
   * Styles for CSS Selector `&:nth-child(even)`
   */
  _even?: BoxProps;
  /**
   * Styles for CSS Selector `&:visited`
   */
  _visited?: BoxProps;
  /**
   * Styles for CSS Selector `&:readonly`
   */
  _readOnly?: BoxProps;
  /**
   * Styles for CSS Selector `&:first-of-type`
   */
  _first?: BoxProps;
  /**
   * Styles for CSS Selector `&:last-of-type`
   */
  _last?: BoxProps;
  /**
   * Styles to apply when you hover on a parent that has `role=group`.
   */
  _groupHover?: BoxProps;
  /**
   * Styles for CSS Selector `&:not(:first-of-type)`
   */
  _notFirst?: BoxProps;
  /**
   * Styles for CSS Selector `&:not(:last-of-type)`
   */
  _notLast?: BoxProps;
  /**
   * Styles for CSS Selector `&::placeholder`.
   * Useful for inputs
   */
  _placeholder?: BoxProps;
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
const selected = '&[aria-selected=true]';
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

const PseudoBox: React.FC<PseudoBoxProps> = React.forwardRef(function PseudoBox(
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
    ...rest
  },
  ref
) {
  return (
    <Box
      ref={ref}
      css={css({
        [hover]: tx(_hover),
        [focus]: tx(_focus),
        [active]: tx(_active),
        [visited]: tx(_visited),
        [disabled]: tx(_disabled),
        [selected]: tx(_selected),
        [invalid]: tx(_invalid),
        [expanded]: tx(_expanded),
        [grabbed]: tx(_grabbed),
        [readOnly]: tx(_readOnly),
        [first]: tx(_first),
        [notFirst]: tx(_notFirst),
        [notLast]: tx(_notLast),
        [last]: tx(_last),
        [odd]: tx(_odd),
        [even]: tx(_even),
        [mixed]: tx(_mixed),
        [checked]: tx(_checked),
        [pressed]: tx(_pressed),
        [groupHover]: tx(_groupHover),
        '&:before': tx(_before),
        '&:after': tx(_after),
        '&:focus-within': tx(_focusWithin),
        '&::placeholder': _placeholder ?? {},
      })}
      {...rest}
    />
  );
});

export default PseudoBox;

/**
 * The selectors are based on [WAI-ARIA state properties](https://www.w3.org/WAI/PF/aria-1.1/states_and_properties) and common CSS Selectors
 */

/*
{
    opacity: 0.3,
    pointerEvents: 'none',
    cursor: 'default',
    ..._disabled,
  }
 */

export const pseudoSelectors = {
  _hover: '&:hover',
  _focus: '&:focus',
  _active: '&:active, &[data-active=true]',
  _visited: '&:visited',
  disabled:
    '&:disabled, &:disabled:focus, &:disabled:hover, &[aria-disabled=true], &[aria-disabled=true]:focus, &[aria-disabled=true]:hover',
  _selected: '&[aria-selected=true], [data-selected] > &',
  _invalid: '&[aria-invalid=true]',
  _expanded: '&[aria-expanded=true]',
  _grabbed: '&[aria-grabbed=true]',
  _readOnly: '&[aria-readonly=true], &[readonly]',
  _first: '&:first-of-type',
  _notFirst: '&:not(:first-of-type)',
  _notLast: '&:not(:last-of-type)',
  _last: '&:last-of-type',
  _odd: '&:nth-of-type(odd)',
  _even: '&:nth-of-type(even)',
  _mixed: '&[aria-checked=mixed]',
  _checked: '&[aria-checked=true]',
  _pressed: '&[aria-pressed=true]',
  _autofill: '&:-webkit-autofill',
  _before: '&::before',
  _after: '&::after',
  _focusWithin: '&:focus-within',
  _placeholder: '&::placeholder',
};

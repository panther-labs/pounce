/* eslint-disable @typescript-eslint/no-explicit-any */
import css from '@styled-system/css';
import { SxProp } from './utility';

export interface PseudoSelectors {
  /**
   * Styles for CSS selector `&:after`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _after={{content:`""` }}/>
   * ```
   */
  _after?: SxProp;
  /**
   * Styles for CSS selector `&:before`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _before={{content:`""` }}/>
   * ```
   */
  _before?: SxProp;
  /**
   * Styles for CSS selector `&:focus`
   *
   */
  _focus?: SxProp;
  /**
   * Styles for CSS selector `&:hover`
   */
  _hover?: SxProp;
  /**
   * Styles for CSS Selector `&:active`
   */
  _active?: SxProp;
  /**
   * Styles for CSS Selector `&[aria-pressed=true]`
   * Typically used to style the current "pressed" state of toggle buttons
   */
  _pressed?: SxProp;
  /**
   * Styles to apply when the ARIA attribute `aria-selected` is `true`
   * - CSS selector `&[aria-selected=true]`
   */
  _selected?: SxProp;
  /**
   * Styles to apply when a child of this element has received focus
   * - CSS Selector `&:focus-within`
   */
  _focusWithin?: SxProp;

  /**
   * Styles to apply when the ARIA attribute `aria-invalid` is `true`
   * - CSS selector `&[aria-invalid=true]`
   */
  _invalid?: SxProp;
  /**
   * Styles to apply when this element is disabled. The passed styles are applied to these CSS selectors:
   * - `&[aria-disabled=true]`
   * - `&:disabled`
   * - `&:disabled:focus`
   * - `&:disabled:hover`
   * - `&:focus[aria-disabled=true]`
   * - `&:hover[aria-disabled=true]`
   */
  _disabled?: SxProp;
  /**
   * Styles to apply when the ARIA attribute `aria-grabbed` is `true`
   * - CSS selector `&[aria-grabbed=true]`
   */
  _grabbed?: SxProp;
  /**
   * Styles to apply when the text content of an HTML node is empty (i.e. no child content exists`)
   * - CSS selector `&:empty`
   */
  _empty?: SxProp;
  /**
   * Styles to apply when the ARIA attribute `aria-expanded` is `true`
   * - CSS selector `&[aria-expanded=true]`
   */
  _expanded?: SxProp;
  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `true`
   * - CSS selector `&[aria-checked=true]`
   */
  _checked?: SxProp;
  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `mixed`
   * - CSS selector `&[aria-checked=mixed]`
   */
  _mixed?: SxProp;
  /**
   * Styles for CSS Selector `&:nth-child(odd)`
   */
  _odd?: SxProp;
  /**
   * Styles for CSS Selector `&:nth-child(even)`
   */
  _even?: SxProp;
  /**
   * Styles for CSS Selector `&:visited`
   */
  _visited?: SxProp;
  /**
   * Styles for CSS Selector `&:readonly`
   */
  _readOnly?: SxProp;
  /**
   * Styles for CSS Selector `&:first-of-type`
   */
  _first?: SxProp;
  /**
   * Styles for CSS Selector `&:last-of-type`
   */
  _last?: SxProp;
  /**
   * Styles to apply when you hover on a parent that has `role=group`.
   */
  _groupHover?: SxProp;
  /**
   * Styles for CSS Selector `&:not(:first-of-type)`
   */
  _notFirst?: SxProp;
  /**
   * Styles for CSS Selector `&:not(:last-of-type)`
   */
  _notLast?: SxProp;
  /**
   * Styles for CSS Selector `&::placeholder`.
   * Useful for inputs
   */
  _placeholder?: SxProp;
  /**
   * Styles for CSS Selector `&::webkit-autofill`.
   * Useful for inputs
   */
  _autofill?: SxProp;
}

/**
 * The selectors are based on [WAI-ARIA state properties](https://www.w3.org/WAI/PF/aria-1.1/states_and_properties)
 * and common CSS Selectors
 */
export const pseudoSelectors: Record<keyof PseudoSelectors, string> = {
  _before: '&::before',
  _after: '&::after',
  _hover: '&:hover',
  _active: '&:active, &[data-active=true]',
  _focus: '&:focus',
  _focusWithin: '&:focus-within',
  _visited: '&:visited',
  _empty: '&:empty',
  _even: '&:nth-of-type(even)',
  _odd: '&:nth-of-type(odd)',
  _disabled: '&:disabled, &:disabled:focus, &:disabled:hover, &[aria-disabled=true], &[aria-disabled=true]:focus, &[aria-disabled=true]:hover', // prettier-ignore
  _checked: '&[aria-checked=true]',
  _mixed: '&[aria-checked=mixed]',
  _selected: '&[aria-selected=true], [data-selected] > &',
  _invalid: '&[aria-invalid=true]',
  _pressed: '&[aria-pressed=true]',
  _readOnly: '&[aria-readonly=true], &[readonly]',
  _first: '&:first-of-type',
  _last: '&:last-of-type',
  _expanded: '&[aria-expanded=true]',
  _grabbed: '&[aria-grabbed=true]',
  _notFirst: '&:not(:first-of-type)',
  _notLast: '&:not(:last-of-type)',
  _groupHover: '[role=group]:hover &',
  _autofill: '&:-webkit-autofill',
  _placeholder: '&::placeholder',
};

type ContentProp = {
  /**
   * The CSS `content` property.
   *
   * @example
   * content: `"/"`
   */
  content?: string;
};

export type PseudoProps = {
  [K in keyof PseudoSelectors]?: K extends '_before' | '_after'
    ? (SxProp & ContentProp) | PseudoProps
    : SxProp | PseudoProps;
};

export const pseudoProps = ({ theme, ...props }: any) => {
  let result = {};
  for (const prop in props) {
    if (prop in pseudoSelectors) {
      const pseudoProp = prop as keyof PseudoSelectors;
      const style = css({ [pseudoSelectors[pseudoProp]]: props[pseudoProp] })(theme);
      result = { ...result, ...style };
    }
  }
  return result;
};

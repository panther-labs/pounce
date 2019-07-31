import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    line-height: ${({ theme }) => theme.lineHeights[0]};
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video, button {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-family: ${({ theme }) => theme.fonts.primary};
    color: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  svg {
    fill: currentColor;
  }
  
  input, textarea {
    outline: none;
  }
  
  /* These commands can't be grouped into a single one. It's a browser limitation */
  input::-webkit-input-placeholder { 
    color: ${({ theme }) => theme.colors.grey200};
  }
  input:-ms-input-placeholder { 
    color: ${({ theme }) => theme.colors.grey200};
  }
  input::placeholder { 
    color: ${({ theme }) => theme.colors.grey200};
  }
  textarea::-webkit-input-placeholder { 
    color: ${({ theme }) => theme.colors.grey200};
  }
  textarea:-ms-input-placeholder { 
    color: ${({ theme }) => theme.colors.grey200};
  }
  textarea::placeholder { 
    color: ${({ theme }) => theme.colors.grey200};
  }

/* ***************** react-day-picker ***************** */


.DayPicker {
  display: inline-block;
  font-size: ${({ theme }) => `${theme.fontSizes[3]}px`};
}

.DayPicker-Months {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.DayPicker-NavButton {
  position: absolute;
  top: ${({ theme }) => `${theme.space[1]}px`};

  display: inline-block;
  width: ${({ theme }) => `${theme.space[8]}px`};
  height: ${({ theme }) => `${theme.space[8]}px`};
  background-position: center;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
}

.DayPicker-NavButton--prev {
  left: ${({ theme }) => `${theme.space[5]}px`};
  background-image: url('data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0xNCA3TDkgMTJMMTQgMTdWN1oiIGZpbGw9IiM0RjRGNEYiLz4NCjwvc3ZnPg==');
}

.DayPicker-NavButton--next {
  right: ${({ theme }) => `${theme.space[5]}px`};
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0xMCAxN0wxNSAxMkwxMCA3VjE3WiIgZmlsbD0iIzRGNEY0RiIvPg0KPC9zdmc+DQo=');
}

.DayPicker-NavButton--interactionDisabled {
  display: none;
}

.DayPicker-Caption {
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => `${theme.space[3]}px ${theme.space[0]}px`};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.grey100}`};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
}

.DayPicker-Weekdays {
 display: none;
}

.DayPicker-Body {
  display: table-row-group;
}

.DayPicker-Week {
  display: table-row;
}

.DayPicker-Day {
  display: table-cell;
  padding: ${({ theme }) => `${theme.space[3]}px`};
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.grey400};  
  border-right: ${({ theme }) => `1px solid ${theme.colors.grey100}`};  
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.grey100}`};  
  
}

.DayPicker--interactionDisabled .DayPicker-Day {
  cursor: default;
}

.DayPicker-Day--today {
  color: ${({ theme }) => theme.colors.red300};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
}

.DayPicker-Day--outside {
  color: ${({ theme }) => theme.colors.grey300};
  cursor: default;
}

.DayPicker-Day--disabled {
  color: #DCE0E0;
  cursor: default;
}

.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
  background-color: ${({ theme }) => theme.colors.primary300};
  color: ${({ theme }) => theme.colors.white};
}

.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
  background-color: ${({ theme }) => theme.colors.primary300};
  color: ${({ theme }) => theme.colors.white};
}

.DayPicker:not(.DayPicker--interactionDisabled)
  .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
  background-color: ${({ theme }) => theme.colors.primary50};
}

.DayPickerInput-OverlayWrapper {
  position: relative;
}

.DayPickerInput-Overlay {
  position: absolute;
  left: 0;
  z-index: 100;

  background: white;
  box-shadow: ${({ theme }) => theme.shadows[3]};
  border-radius: ${({ theme }) => `${theme.radii.small}px`};
}

/* ***************** @reach/menu-button ***************** */

/* Used to detect in JavaScript if apps have loaded styles or not. */
:root {
  --reach-menu-button: 1;
}

[data-reach-menu] {
  position: absolute;
}

[data-reach-menu-list] {
  white-space: nowrap;
}

[data-reach-menu-item] {
  outline: none;
  
  &[data-selected] {
    background: ${({ theme }) => theme.colors.grey50};;
  }
}
`;

export default GlobalStyles;

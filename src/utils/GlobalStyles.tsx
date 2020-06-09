import React from 'react';
import { Global, css, useTheme } from '@emotion/react';

const GlobalStyles: React.FC = () => {
  const theme = useTheme();

  const globalStyles = css`
    * {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: ${theme.lineHeights.normal};
    }

    html {
      color: ${theme.colors['gray-50']};
      font-family: ${theme.fonts.primary};
    }

    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    hr,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video,
    button {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      vertical-align: baseline;
    }

    button,
    input,
    select,
    textarea {
      font-family: inherit;
    }

    a {
      color: inherit;
      text-decoration: inherit;
    }

    /* HTML5 display-role reset for older browsers */
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
      display: block;
    }
    body {
      line-height: ${theme.lineHeights.none};
    }
    ol,
    ul {
      list-style: none;
    }
    blockquote,
    q {
      quotes: none;
    }
    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
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

    input,
    textarea {
      outline: none;
    }

    input[type='number'] {
      -webkit-appearance: textfield;
      -moz-appearance: textfield;
      appearance: initial;
    }
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }

    /* ***************** react-day-picker ***************** */

    .DayPicker {
      display: inline-block;
      font-size: ${theme.fontSizes.medium};
    }

    .DayPicker-Months {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .DayPicker-NavButton {
      position: absolute;
      top: ${`${theme.space[1]}px`};

      display: inline-block;
      width: ${`${theme.space[8]}px`};
      height: ${`${theme.space[8]}px`};
      background-position: center;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    .DayPicker-NavButton--prev {
      left: 23px;
      top: 23px;
      opacity: 0;
      outline: none;
    }

    .DayPicker-NavButton--next {
      right: 23px;
      top: 23px;
      opacity: 0;
      outline: none;
    }

    .DayPicker-NavButton--interactionDisabled {
      display: none;
    }

    .DayPicker-Caption {
      display: none;
    }

    .DayPicker-WeekdaysRow {
      display: flex;
      justify-content: space-around;
      width: 100%;

      padding: ${`${theme.space[2]}px ${theme.space[0]}px`};
      margin-bottom: ${theme.space[2]}px;
      border-top: ${`1px solid ${theme.colors['navyblue-500']}`};
      border-bottom: ${`1px solid ${theme.colors['navyblue-500']}`};

      abbr {
        text-decoration: none;
        font-size: ${theme.fontSizes.small};
        font-weight: ${theme.fontWeights.bold};
      }
    }

    .DayPicker-Body {
      display: table-row-group;
    }

    .DayPicker-Week {
      display: table-row;
    }

    .DayPicker-Day {
      display: table-cell;
      padding: ${`${theme.space[2]}px`};
      vertical-align: middle;
      text-align: center;
      cursor: pointer;
      border-radius: 50%;
    }

    .DayPicker--interactionDisabled .DayPicker-Day {
      cursor: default;
    }

    .DayPicker-Day--today {
      color: ${theme.colors['red-200']};
      font-weight: ${theme.fontWeights.medium};
    }

    .DayPicker-Day--outside {
      color: ${theme.colors.grey300};
      cursor: default;
    }

    .DayPicker-Day--disabled {
      opacity: 0.3;
      cursor: default;
    }

    .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
      background-color: ${theme.colors['blue-600']};
      color: ${theme.colors.white};
    }

    .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
      background-color: ${theme.colors['blue-600']};
      color: ${theme.colors.white};
    }

    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
      background-color: ${theme.colors['navyblue-450']};
    }

    /* Let reach-ui know that we took care of the styles */
    :root {
      --reach-menu-button: 1;
      --reach-tooltip: 1;
      --reach-dialog: 1;
      --reach-tabs: 1;
    }

    [data-reach-dialog-overlay] {
      background: hsla(0, 0%, 0%, 0.33);
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: auto;
    }

    [data-reach-tabs][data-orientation='vertical'] {
      display: flex;
    }

    [data-reach-tab-list][aria-orientation='vertical'] {
      flex-direction: column;
    }
  `;

  return <Global styles={globalStyles} />;
};

export default GlobalStyles;

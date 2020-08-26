import React from 'react';
import { Global, css, useTheme } from '@emotion/react';
import { pseudoSelectors } from '../system';

const GlobalStyles: React.FC = () => {
  const theme = useTheme();

  const globalStyles = css`
    * {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: ${theme.lineHeights.normal};
    }

    *::-webkit-scrollbar {
      width: 8px;
      background: transparent;
    }

    *::-webkit-scrollbar-thumb {
      background: ${theme.colors['navyblue-200']};
      border-radius: ${theme.radii.pill}px;
    }

    *::-webkit-scrollbar:horizontal {
      height: 8px;
    }

    ${pseudoSelectors._disabled} {
      opacity: 0.3;
      pointer-events: none;
      cursor: default;

      /* correct any nested disabled items, so that 'opacity: 0.3' isn't applied multiple times */
      * {
        opacity: 1;
      }
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

    [data-reach-tab-panels] {
      outline: none;
    }
  `;

  return <Global styles={globalStyles} />;
};

export default GlobalStyles;

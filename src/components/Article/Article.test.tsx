import React from 'react';
import { renderWithTheme } from '../../../jest/utils';
import H from '.';
import Article from '../Article';

describe('Article', () => {
  it('increases heading levels by 1', () => {
    const { container, getByText } = renderWithTheme(
      <Article>
        <H>h3</H>
      </Article>
    );

    expect(container.querySelector('h2')).not.toBeInTheDocument();
    expect(getByText('h3').tagName).toEqual('H3');
  });
});

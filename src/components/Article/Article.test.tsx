import React from 'react';
import { renderWithTheme } from '../../../jest/utils';
import Article from '../Article';
import Heading from '../Heading';

describe('Article', () => {
  it('increases heading levels by 1', () => {
    const { container, getByText } = renderWithTheme(
      <Article>
        <Heading>h3</Heading>
      </Article>
    );

    expect(container.querySelector('h2')).not.toBeInTheDocument();
    expect(getByText('h3').tagName).toEqual('H3');
  });
});

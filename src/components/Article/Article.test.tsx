import React from 'react';
import { renderWithTheme } from '../../../jest/utils';
import Article from '../Article';
import Heading from '../Heading';

describe('Article', () => {
  it('increases heading levels by 1', () => {
    const { getByText } = renderWithTheme(
      <Article>
        <Heading>h2</Heading>
        <Article>
          <Heading>h3</Heading>
        </Article>
      </Article>
    );

    expect(getByText('h2').tagName).toEqual('H2');
    expect(getByText('h3').tagName).toEqual('H3');
  });
});

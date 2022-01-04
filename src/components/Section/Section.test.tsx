import React from 'react';
import { renderWithTheme } from '../../../jest/utils';
import H from '.';
import Section from '../Section';

describe('Section', () => {
  it('increases heading levels by 1', () => {
    const { container, getByText } = renderWithTheme(
      <Section>
        <H>h3</H>
      </Section>
    );

    expect(container.querySelector('h2')).not.toBeInTheDocument();
    expect(getByText('h3').tagName).toEqual('H3');
  });
});

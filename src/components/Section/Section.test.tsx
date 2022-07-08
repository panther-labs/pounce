import React from 'react';
import { renderWithTheme } from '../../../jest/utils';
import Heading from '../Heading';
import Section from '../Section';

describe('Section', () => {
  it('defaults to h2 if not within a heading context', () => {
    const { getByText } = renderWithTheme(
      <Section>
        <Heading>h2</Heading>
      </Section>
    );

    expect(getByText('h2').tagName).toEqual('H2');
  });

  it('increases heading levels by 1 if within a heading context', () => {
    const { getByText } = renderWithTheme(
      <Section>
        <Heading>h2</Heading>
        <Section>
          <Heading>h3</Heading>
        </Section>
      </Section>
    );

    expect(getByText('h2').tagName).toEqual('H2');
    expect(getByText('h3').tagName).toEqual('H3');
  });
});

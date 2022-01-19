import React from 'react';
import { renderWithTheme } from '../../../jest/utils';
import Heading from '.';
import Section from '../Section';

describe('Heading', () => {
  it('renders as a h2 by default', () => {
    const { getByText } = renderWithTheme(<Heading>Hello</Heading>);
    expect(getByText('Hello').tagName).toEqual('H2');
  });

  it('allows rendering a h1', () => {
    const { getByText } = renderWithTheme(<Heading as="h1">Hello</Heading>);
    expect(getByText('Hello').tagName).toEqual('H1');
  });

  it('does not render above an h6', () => {
    const { getByText } = renderWithTheme(
      <div>
        <Heading>h2</Heading>
        <Section>
          <Heading>h3</Heading>
          <Section>
            <Heading>h4</Heading>
            <Section>
              <Heading>h5</Heading>
              <Section>
                <Heading>h6</Heading>
                <Section>
                  <Heading>still h6</Heading>
                </Section>
              </Section>
            </Section>
          </Section>
        </Section>
      </div>
    );

    expect(getByText('h2').tagName).toEqual('H2');
    expect(getByText('h3').tagName).toEqual('H3');
    expect(getByText('h4').tagName).toEqual('H4');
    expect(getByText('h5').tagName).toEqual('H5');
    expect(getByText('h6').tagName).toEqual('H6');
    expect(getByText('still h6').tagName).toEqual('H6');
  });

  it('allows increasing the heading context with custom markup', () => {
    const { container, getByText } = renderWithTheme(
      <Section as="header">
        <Heading>h3</Heading>
      </Section>
    );
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(getByText('h3').tagName).toEqual('H3');
  });
});

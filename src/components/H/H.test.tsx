import React from 'react';
import { renderWithTheme } from '../../../jest/utils';
import H from '.';
import Section from '../Section';

describe('H', () => {
  it('renders as a h2 by default', () => {
    const { getByText } = renderWithTheme(<H>Hello</H>);
    expect(getByText('Hello').tagName).toEqual('H2');
  });

  it('increases levels when within a Section', () => {
    const { container, getByText } = renderWithTheme(
      <Section>
        <H>h3</H>
      </Section>
    );

    expect(container.querySelector('h2')).not.toBeInTheDocument();
    expect(getByText('h3').tagName).toEqual('H3');
  });

  it('does not render above an h6', () => {
    const { getByText } = renderWithTheme(
      <div>
        <H>h2</H>
        <Section>
          <H>h3</H>
          <Section>
            <H>h4</H>
            <Section>
              <H>h5</H>
              <Section>
                <H>h6</H>
                <Section>
                  <H>still h6</H>
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
        <H>h3</H>
      </Section>
    );
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(getByText('h3').tagName).toEqual('H3');
  });
});

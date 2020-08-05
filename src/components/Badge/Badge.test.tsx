import React from 'react';
import { render, act, waitFor } from 'test-utils';
import { axe, AxeResults } from 'jest-axe';

import Badge from './Badge';

it('renders', () => {
  const { container } = render(
    <>
      <Badge color="red-300">INFO</Badge>
      <Badge color="teal-500">LOW</Badge>
      <Badge color="blue-400">WHATEVER</Badge>
    </>
  );
  expect(container).toMatchSnapshot();
});

it('aligns with a11y', async () => {
  const { container } = render(
    <>
      <Badge color="red-300">INFO</Badge>
      <Badge color="teal-500">LOW</Badge>
      <Badge color="blue-400">WHATEVER</Badge>
    </>
  );
  let results: AxeResults;
  await act(async () => {
    results = await axe(container);
  });
  await waitFor(() => {
    expect(results).toHaveNoViolations();
  });
});

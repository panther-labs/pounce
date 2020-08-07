import React from 'react';
import { render } from 'test-utils';
import Box from './Box';

describe('Box', () => {
  it('renders', async () => {
    const { container } = await render(<Box />);
    expect(container).toMatchSnapshot();
  });

  it('allows truncated values', async () => {
    const { container } = await render(<Box truncated />);
    expect(container).toMatchSnapshot();
  });
  it('allows styling on demand', async () => {
    const { container } = await render(
      <Box color="black" background="red" textTransform="uppercase" />
    );
    expect(container).toMatchSnapshot();
  });
});

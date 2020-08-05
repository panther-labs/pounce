import React from 'react';
import { render } from 'test-utils';
import Box from './Box';

// FIXME: jest-emotion does not generate deterministic snapshots when the styling body is empty
// https://github.com/emotion-js/emotion/issues/1960
describe('Box', () => {
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

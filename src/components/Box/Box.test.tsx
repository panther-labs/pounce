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

  it('allows specifying an opacity for the background color', async () => {
    const { container } = await render(
      <React.Fragment>
        <Box backgroundColor="white" backgroundOpacity="0.5" />
        <Box backgroundColor="white" backgroundOpacity={0.5} />
        <Box backgroundColor="white" backgroundOpacity="50" />
        <Box backgroundColor="white" backgroundOpacity={50} />
      </React.Fragment>
    );
    expect(container).toMatchSnapshot();
  });

  it('allows specifying an opacity for the border color', async () => {
    const { container } = await render(
      <React.Fragment>
        <Box border="1px solid" borderColor="white" borderOpacity="0.5" />
        <Box border="1px solid" borderColor="white" borderOpacity={0.5} />
        <Box border="1px solid" borderColor="white" borderOpacity="50" />
        <Box border="1px solid" borderColor="white" borderOpacity={50} />
      </React.Fragment>
    );
    expect(container).toMatchSnapshot();
  });

  it('allows styling on demand', async () => {
    const { container } = await render(
      <Box color="black" background="red" textTransform="uppercase" />
    );
    expect(container).toMatchSnapshot();
  });
});

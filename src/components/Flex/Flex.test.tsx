import React from 'react';
import { render } from 'test-utils';
import Flex from './Flex';
import Box from '../Box';

describe('Flex', () => {
  it('renders', async () => {
    const { container } = await render(<Flex />);
    expect(container).toMatchSnapshot();
  });

  it('works along with Box', async () => {
    const { container } = await render(
      <Flex alignItems="center">
        <Box width={200} py={9} bg="blue-400">
          Test
        </Box>
        <Box width={300} py={4} bg="red-300">
          Test
        </Box>
      </Flex>
    );
    expect(container).toMatchSnapshot();
  });
});

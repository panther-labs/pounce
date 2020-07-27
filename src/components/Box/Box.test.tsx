import React from 'react';
import { renderas } from 'test-utils';
import Box from './Box';

test('Box', async () => {
  const { container } = await renderas(<Box />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="css-1squsqt-Box pounce-0"
      />
    </div>
  `);
});

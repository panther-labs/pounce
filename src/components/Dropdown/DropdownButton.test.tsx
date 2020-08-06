import React from 'react';
import { render } from 'test-utils';
import DropdownButton from './DropdownButton';
import Dropdown from './Dropdown';

it('renders', () => {
  const { container } = render(
    <Dropdown>
      <DropdownButton variant="outline">Hello</DropdownButton>
    </Dropdown>
  );
  expect(container).toMatchSnapshot();
});

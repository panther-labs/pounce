import React from 'react';
import { renderWithTheme } from 'test-utils';
import Popover from './Popover';
import PopoverTrigger from './PopoverTrigger';
import PopoverMenu from './PopoverMenu';
import Button from '../Button';

describe('Popover', () => {
  it('matches snapshot', () => {
    const { container } = renderWithTheme(
      <Popover>
        <PopoverTrigger as={Button}>Click me</PopoverTrigger>
        <PopoverMenu>Boom! I am The popup</PopoverMenu>
      </Popover>
    );

    expect(container).toMatchSnapshot();
  });
});

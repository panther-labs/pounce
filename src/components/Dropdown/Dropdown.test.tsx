import React from 'react';
import { render, act, waitFor, fireClickAndMouseEvents } from 'test-utils';
import Dropdown from './Dropdown';
import DropdownButton from './DropdownButton';
import DropdownMenu from './DropdownMenu';
import DropdownItem from './DropdownItem';
import DropdownLink from './DropdownLink';

it('renders', () => {
  const { container } = render(
    <Dropdown>
      <DropdownButton variant="outline">Hello</DropdownButton>
    </Dropdown>
  );
  expect(container).toMatchSnapshot();
});

it('opens', async () => {
  const { container, getByText, findByText } = render(
    <Dropdown>
      <DropdownButton>Open me</DropdownButton>
      <DropdownMenu>
        <DropdownItem onSelect={jest.fn}>First option</DropdownItem>
        <DropdownItem onSelect={jest.fn}>Second option</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  expect(container).toMatchSnapshot();

  await act(async () => {
    const open = await findByText('Open me');
    await fireClickAndMouseEvents(open);
  });

  await waitFor(() => {
    expect(getByText('First option')).toBeVisible();
    expect(getByText('Second option')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});

it('allows parsing dropdown options', async () => {
  const { getByText, findByText } = render(
    <Dropdown>
      <DropdownButton>Open me</DropdownButton>
      <DropdownMenu>
        <DropdownItem onSelect={jest.fn}>First option</DropdownItem>
        <DropdownLink href="https://google.com" target="_blank" rel="noopener noreferrer">
          I am a link
        </DropdownLink>
      </DropdownMenu>
    </Dropdown>
  );

  await act(async () => {
    const open = await findByText('Open me');
    await fireClickAndMouseEvents(open);
  });

  await waitFor(() => {
    expect(getByText('First option')).toBeVisible();
    expect(getByText('I am a link')).toBeVisible();
  });
});

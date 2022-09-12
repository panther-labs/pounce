import React from 'react';
import {
  fireClickAndMouseEvents,
  fireEvent,
  renderWithTheme,
  waitForElementToBeRemoved,
  waitMs,
} from 'test-utils';
import Popover from './Popover';
import PopoverTrigger from './PopoverTrigger';
import PopoverMenu from './PopoverContent';
import Button from '../Button';
import Text from '../Text';

describe('Popover', () => {
  it('matches snapshot when closed', () => {
    const { container } = renderWithTheme(
      <Popover id="test">
        <PopoverTrigger as={Button}>Click me</PopoverTrigger>
        <PopoverMenu>Boom! I am the popup</PopoverMenu>
      </Popover>
    );

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot when opened', () => {
    const { container } = renderWithTheme(
      <Popover isOpen id="test">
        <PopoverTrigger as={Button}>Click me</PopoverTrigger>
        <PopoverMenu>Boom! I am the popup</PopoverMenu>
      </Popover>
    );

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with alignment', () => {
    const { container } = renderWithTheme(
      <Popover isOpen id="test">
        <PopoverTrigger as={Button}>Click me</PopoverTrigger>
        <PopoverMenu alignment="right-center">Boom! I am the popup</PopoverMenu>
      </Popover>
    );

    expect(container).toMatchSnapshot();
  });

  it('only shows the popover trigger by default', () => {
    const { queryByText } = renderWithTheme(
      <Popover>
        <PopoverTrigger as={Button}>Click me</PopoverTrigger>
        <PopoverMenu>Boom! I am the popup</PopoverMenu>
      </Popover>
    );

    expect(queryByText('Click me')).toBeInTheDocument();
    expect(queryByText('Boom! I am the popup')).not.toBeInTheDocument();
  });

  it('can render as initially opened', () => {
    const { getByText } = renderWithTheme(
      <Popover isOpen>
        <PopoverTrigger as={Button}>Click me</PopoverTrigger>
        <PopoverMenu>Boom! I am the popup</PopoverMenu>
      </Popover>
    );

    expect(getByText('Boom! I am the popup')).toBeInTheDocument();
  });

  it('toggles with trigger click', async () => {
    const { getByText } = renderWithTheme(
      <Popover>
        <PopoverTrigger as={Button}>Click me</PopoverTrigger>
        <PopoverMenu>Boom! I am the popup</PopoverMenu>
      </Popover>
    );

    const trigger = getByText('Click me');

    fireClickAndMouseEvents(trigger);
    const popup = getByText('Boom! I am the popup');

    fireClickAndMouseEvents(trigger);
    await waitForElementToBeRemoved(popup);

    expect(popup).not.toBeInTheDocument();
  });

  it('closes when ECS is pressed', async () => {
    const { getByText } = renderWithTheme(
      <Popover>
        <PopoverTrigger as={Button}>Click me</PopoverTrigger>
        <PopoverMenu>Boom! I am the popup</PopoverMenu>
      </Popover>
    );

    const trigger = getByText('Click me');

    fireClickAndMouseEvents(trigger);
    const popup = getByText('Boom! I am the popup');

    fireEvent.keyDown(popup, { key: 'Escape', code: 'Escape' });
    await waitForElementToBeRemoved(popup);
    expect(popup).not.toBeInTheDocument();
  });

  it('closes when a click occurs anywhere outside the popup if `persistOnOutsideClicks` is `false`', async () => {
    const { getByText, container } = renderWithTheme(
      <Popover>
        <PopoverTrigger as={Button}>Click me</PopoverTrigger>
        <PopoverMenu persistOnOutsideClicks={false}>Boom! I am the popup</PopoverMenu>
      </Popover>
    );

    const trigger = getByText('Click me');

    fireClickAndMouseEvents(trigger);
    const popup = getByText('Boom! I am the popup');

    // wait for React to properly assign the refs. This is not an issue in real life since a user
    // can't do it faster than React (I tried)
    await waitMs(10);
    fireEvent.mouseDown(container);

    await waitForElementToBeRemoved(popup);
    expect(popup).not.toBeInTheDocument();
  });

  it('does not close when a click occurs outside the popup if `persistOnOutsideClicks` is `true`', async () => {
    const { getByText, container } = renderWithTheme(
      <Popover>
        <PopoverTrigger as={Button}>Click me</PopoverTrigger>
        <PopoverMenu persistOnOutsideClicks>Boom! I am the popup</PopoverMenu>
      </Popover>
    );

    const trigger = getByText('Click me');

    fireClickAndMouseEvents(trigger);
    const popup = getByText('Boom! I am the popup');

    // wait for React to properly assign the refs. This is not an issue in real life since a user
    // can't do it faster than React (I tried)
    await waitMs(10);
    fireEvent.mouseDown(container);
    await waitMs(10);

    expect(popup).toBeInTheDocument();
  });

  it('does NOT close when a click occurs inside the popup', async () => {
    const { getByText } = renderWithTheme(
      <Popover>
        <PopoverTrigger as={Button}>Click me</PopoverTrigger>
        <PopoverMenu>Boom! I am the popup</PopoverMenu>
      </Popover>
    );

    const trigger = getByText('Click me');

    fireClickAndMouseEvents(trigger);
    const popup = getByText('Boom! I am the popup');

    fireClickAndMouseEvents(popup);
    await waitMs(20);
    expect(popup).toBeInTheDocument();
  });

  it('correctly exposes its internals', async () => {
    const { getByText } = renderWithTheme(
      <Popover>
        {({ close }) => (
          <React.Fragment>
            <PopoverTrigger as={Button}>Click me</PopoverTrigger>
            <PopoverMenu>
              <Text>Boom! I am the popup</Text>
              <Button onClick={close}>Close popup</Button>
            </PopoverMenu>
          </React.Fragment>
        )}
      </Popover>
    );

    const trigger = getByText('Click me');

    fireClickAndMouseEvents(trigger);
    const popup = getByText('Boom! I am the popup');

    fireClickAndMouseEvents(getByText('Close popup'));
    await waitForElementToBeRemoved(popup);
    expect(popup).not.toBeInTheDocument();
  });
});

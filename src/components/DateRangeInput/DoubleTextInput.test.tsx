import React from 'react';
import { renderWithTheme, fireEvent } from 'test-utils';
import DoubleTextInput from './DoubleTextInput';

const props = {
  labelFrom: 'Name',
  labelTo: 'Surname',
};

it('renders', async () => {
  const { container } = await renderWithTheme(<DoubleTextInput {...props} />);
  expect(container).toMatchSnapshot();
});

it('renders with placeholders', async () => {
  const { container } = await renderWithTheme(
    <DoubleTextInput {...props} placeholderFrom="Foo" placeholderTo="Bar" />
  );
  expect(container).toMatchSnapshot();
});

it('renders with disabled option', async () => {
  const { container } = await renderWithTheme(<DoubleTextInput {...props} disabled />);
  expect(container).toMatchSnapshot();
});

it('renders with invalid option', async () => {
  const { container } = await renderWithTheme(<DoubleTextInput {...props} invalid />);
  expect(container).toMatchSnapshot();
});

it('renders with required option', async () => {
  const { container } = await renderWithTheme(<DoubleTextInput {...props} required />);
  expect(container).toMatchSnapshot();
});

it('renders with individual values', async () => {
  const DoubleOrNothing = () => {
    const [fromValue, setFrom] = React.useState('This is the start');
    const [toValue, setTo] = React.useState('This is the end');
    const onChangeFrom = React.useCallback(e => setFrom(e.currentTarget.value), [setFrom]);
    const onChangeTo = React.useCallback(e => setTo(e.currentTarget.value), [setTo]);
    return (
      <DoubleTextInput
        {...props}
        from={fromValue}
        to={toValue}
        onChangeFrom={onChangeFrom}
        onChangeTo={onChangeTo}
        id="sample"
      />
    );
  };
  const { container, getByLabelText } = await renderWithTheme(<DoubleOrNothing />);
  const fromInput = getByLabelText('Name');
  const toInput = getByLabelText('Surname');

  expect(fromInput.value).toBe('This is the start');
  expect(toInput.value).toBe('This is the end');

  expect(container).toMatchSnapshot();

  fireEvent.change(fromInput, { target: { value: 'Another day another new start' } });
  fireEvent.change(toInput, { target: { value: 'Change upon the end' } });

  expect(fromInput.value).toBe('Another day another new start');
  expect(toInput.value).toBe('Change upon the end');
});

it('renders with icons', async () => {
  const { container } = await renderWithTheme(
    <>
      <DoubleTextInput {...props} icon="wrench" />
      <DoubleTextInput {...props} icon="calendar" />
      <DoubleTextInput {...props} icon="caret-down" />
    </>
  );
  expect(container).toMatchSnapshot();
});

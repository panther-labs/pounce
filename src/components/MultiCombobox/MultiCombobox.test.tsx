import { renderWithTheme, fireClickAndMouseEvents, fireEvent } from 'test-utils';
import React from 'react';
import MultiCombobox, { MultiComboboxProps } from './index';

const ControlledMultiCombobox: React.FC<Partial<MultiComboboxProps<string>>> = props => {
  const [selectedManufacturer, updateSelectedManufacturer] = React.useState<string[]>([]);

  return (
    <MultiCombobox<string>
      label="Choose a car manufacturer"
      items={['Toyota', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Hammer', 'Dodge', 'Audi']}
      onChange={updateSelectedManufacturer}
      value={selectedManufacturer}
      placeholder="Select manufacturers"
      {...props}
    />
  );
};

describe('MultiCombobox', () => {
  it('renders', () => {
    const { container } = renderWithTheme(<ControlledMultiCombobox />);
    expect(container).toMatchSnapshot();
  });

  it('renders with variant="solid"', () => {
    const { container } = renderWithTheme(<ControlledMultiCombobox variant="solid" />);
    expect(container).toMatchSnapshot();
  });

  it('works without being searchable', async () => {
    const { getByText, getByPlaceholderText, getAllByRole } = renderWithTheme(
      <ControlledMultiCombobox />
    );

    fireClickAndMouseEvents(getByPlaceholderText('Select manufacturers'));
    fireClickAndMouseEvents(await getByText('Toyota'));
    fireClickAndMouseEvents(await getByText('Ford'));

    expect(getAllByRole('tag')).toHaveLength(2);
  });

  it('works while searchable', async () => {
    const { getByText, getByPlaceholderText, getAllByRole } = renderWithTheme(
      <ControlledMultiCombobox searchable />
    );

    const input = getByPlaceholderText('Select manufacturers');
    fireClickAndMouseEvents(getByPlaceholderText('Select manufacturers'));

    fireEvent.change(input, { target: { value: 'Toyo' } });
    expect(getAllByRole('option')).toHaveLength(1);
    fireClickAndMouseEvents(await getByText('Toyota'));

    fireEvent.change(input, { target: { value: 'Fo' } });
    expect(getAllByRole('option')).toHaveLength(1);
    fireClickAndMouseEvents(await getByText('Ford'));

    expect(getAllByRole('tag')).toHaveLength(2);
  });

  it("it doesn't allow custom additions by default", async () => {
    const { getByPlaceholderText, queryAllByRole } = renderWithTheme(
      <ControlledMultiCombobox searchable />
    );

    const input = getByPlaceholderText('Select manufacturers');
    fireClickAndMouseEvents(getByPlaceholderText('Select manufacturers'));

    fireEvent.change(input, { target: { value: 'Random Value' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(queryAllByRole('tag')).toHaveLength(0);
  });

  it('works while allowing custom values', async () => {
    const { getByPlaceholderText, getAllByRole } = renderWithTheme(
      <ControlledMultiCombobox searchable allowAdditions />
    );

    const input = getByPlaceholderText('Select manufacturers');
    fireClickAndMouseEvents(getByPlaceholderText('Select manufacturers'));

    fireEvent.change(input, { target: { value: 'Random Value 1' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    fireEvent.change(input, { target: { value: 'Random Value 2' } });
    fireEvent.keyDown(input, { key: ',', code: 'Comma' });
    expect(getAllByRole('tag')).toHaveLength(2);
  });

  it('correctly filters custom values when specified', async () => {
    const { getByPlaceholderText, queryAllByRole } = renderWithTheme(
      <ControlledMultiCombobox
        searchable
        allowAdditions
        validateAddition={text => text.includes('pounce')}
      />
    );

    const input = getByPlaceholderText('Select manufacturers');
    fireClickAndMouseEvents(getByPlaceholderText('Select manufacturers'));

    fireEvent.change(input, { target: { value: 'Random Value' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(queryAllByRole('tag')).toHaveLength(0);

    fireEvent.change(input, { target: { value: 'pounce' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(queryAllByRole('tag')).toHaveLength(1);
  });

  it("doesn't tokenize value on blur when custom values are disallowed", async () => {
    const { getByPlaceholderText, queryAllByRole } = renderWithTheme(
      <ControlledMultiCombobox searchable />
    );

    const input = getByPlaceholderText('Select manufacturers') as HTMLInputElement;
    fireClickAndMouseEvents(getByPlaceholderText('Select manufacturers'));

    fireEvent.change(input, { target: { value: 'Toyo' } });
    fireEvent.blur(input);

    expect(queryAllByRole('tag')).toHaveLength(0);
  });

  it('tokenizes value on blur when custom values are allowed', async () => {
    const { getByPlaceholderText, queryAllByRole } = renderWithTheme(
      <ControlledMultiCombobox searchable allowAdditions />
    );

    const input = getByPlaceholderText('Select manufacturers');
    fireClickAndMouseEvents(getByPlaceholderText('Select manufacturers'));

    fireEvent.change(input, { target: { value: 'Random Value' } });
    fireEvent.blur(input);
    expect(queryAllByRole('tag')).toHaveLength(1);
  });

  it('does not auto-tokenize a single pasted value', async () => {
    const { getByPlaceholderText, queryAllByRole } = renderWithTheme(
      <ControlledMultiCombobox searchable allowAdditions />
    );

    const input = getByPlaceholderText('Select manufacturers');

    fireEvent.paste(input, { clipboardData: { getData: () => 'Random Value' } });
    expect(queryAllByRole('tag')).toHaveLength(0);
  });

  it("auto-tokenizes a pasted value that's separated with commas or newlines", async () => {
    const { getByPlaceholderText, queryAllByRole } = renderWithTheme(
      <ControlledMultiCombobox searchable allowAdditions />
    );

    const input = getByPlaceholderText('Select manufacturers');

    fireEvent.paste(input, {
      clipboardData: { getData: () => 'Random Value 1, Random Value 2 \r\n RandomValue 3' },
    });
    expect(queryAllByRole('tag')).toHaveLength(3);
  });

  it("doesn't allow empty values to be added manually", async () => {
    const { getByPlaceholderText, queryAllByRole } = renderWithTheme(
      <ControlledMultiCombobox searchable allowAdditions />
    );

    const input = getByPlaceholderText('Select manufacturers');
    fireClickAndMouseEvents(getByPlaceholderText('Select manufacturers'));

    fireEvent.change(input, { target: { value: '  ' } });
    fireEvent.keyDown(input, { key: ',' });

    fireEvent.change(input, { target: { value: '  ' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    fireEvent.blur(input);
    expect(queryAllByRole('tag')).toHaveLength(0);
  });

  it("doesn't allow empty values being pasted", async () => {
    const { getByPlaceholderText, queryAllByRole } = renderWithTheme(
      <ControlledMultiCombobox searchable allowAdditions />
    );

    const input = getByPlaceholderText('Select manufacturers');

    fireEvent.paste(input, {
      clipboardData: { getData: () => 'Random Value 1\r\n\r\n\r\nRandom Value 2' },
    });
    expect(queryAllByRole('tag')).toHaveLength(2);
  });
});

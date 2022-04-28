import { renderWithTheme, fireClickAndMouseEvents, fireEvent, within } from 'test-utils';
import React from 'react';
import MultiCombobox, { MultiComboboxProps } from './index';

type Item = { value: string; category: string };

const items = [
  { value: 'Toyota', category: 'Normal' },
  { value: 'Ford', category: 'Normal' },
  { value: 'Chevrolet', category: 'Luxury' },
  { value: 'BMW', category: 'Luxury' },
  { value: 'Mercedes', category: 'Luxury' },
  { value: 'Hammer', category: 'Luxury' },
  { value: 'Dodge', category: 'Luxury' },
  { value: 'Audi', category: 'Luxury' },
];

const ControlledMultiCombobox: React.FC<Partial<MultiComboboxProps<Item>>> = props => {
  const [selectedManufacturer, updateSelectedManufacturer] = React.useState<Item[]>([]);

  return (
    <MultiCombobox
      label="Choose a car manufacturer"
      onChange={updateSelectedManufacturer}
      value={selectedManufacturer}
      placeholder="Select manufacturers"
      items={items}
      itemToString={item => item.value}
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

  it('renders with clear all option', async () => {
    const { container, getByText, getByPlaceholderText } = renderWithTheme(
      <ControlledMultiCombobox canClearAllAfter={2} />
    );
    fireClickAndMouseEvents(getByPlaceholderText('Select manufacturers'));
    fireClickAndMouseEvents(await getByText('Toyota'));
    expect(container).toMatchSnapshot();
    fireClickAndMouseEvents(await getByText('Ford'));
    expect(await getByText('Clear Selection')).toBeInTheDocument();
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

  it('allows users to clear all items when selected items are 4 or more', async () => {
    const {
      getByText,
      getByPlaceholderText,
      getAllByRole,
      queryByText,
      queryAllByRole,
    } = renderWithTheme(<ControlledMultiCombobox canClearAllAfter={4} />);

    fireClickAndMouseEvents(getByPlaceholderText('Select manufacturers'));
    fireClickAndMouseEvents(await getByText('Toyota'));
    fireClickAndMouseEvents(await getByText('Ford'));
    fireClickAndMouseEvents(await getByText('Mercedes'));
    expect(await queryByText('Clear Selection')).not.toBeInTheDocument();
    fireClickAndMouseEvents(await getByText('Chevrolet'));
    expect(await queryByText('Clear Selection')).toBeInTheDocument();
    fireClickAndMouseEvents(await getByText('Dodge'));
    expect(getAllByRole('tag')).toHaveLength(5);
    fireClickAndMouseEvents(await getByText('Clear Selection'));
    expect(queryAllByRole('tag')).toHaveLength(0);
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
    const ComboBox = () => {
      const [selectedManufacturer, updateSelectedManufacturer] = React.useState<string[]>([]);

      return (
        <MultiCombobox
          label="Choose a car manufacturer"
          onChange={updateSelectedManufacturer}
          value={selectedManufacturer}
          placeholder="Select manufacturers"
          items={['Toyota', 'Ford']}
          searchable
          allowAdditions
        />
      );
    };

    const { getByPlaceholderText, getAllByRole } = renderWithTheme(<ComboBox />);

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

  it('works when selecting grouped items', async () => {
    const { getByPlaceholderText, queryAllByRole, container } = renderWithTheme(
      <ControlledMultiCombobox itemToGroup={i => i.category} itemToString={i => i.value} />
    );

    fireClickAndMouseEvents(getByPlaceholderText('Select manufacturers'));
    const normalGroup = container.querySelector('[aria-label="Group Normal"]');
    expect(normalGroup).toBeInTheDocument();
    const luxuryGroup = container.querySelector('[aria-label="Group Luxury"]');
    expect(luxuryGroup).toBeInTheDocument();

    const { getByText: getByTextInLuxuryGroup } = within(luxuryGroup);
    const bmw = getByTextInLuxuryGroup('BMW');

    const { getByText: getByTextInNormalGroup } = within(normalGroup);
    const toyota = getByTextInNormalGroup('Toyota');
    const ford = getByTextInNormalGroup('Ford');

    fireClickAndMouseEvents(ford);
    fireClickAndMouseEvents(toyota);
    fireClickAndMouseEvents(bmw);
    expect(queryAllByRole('tag')).toHaveLength(3);

    fireClickAndMouseEvents(toyota);
    fireClickAndMouseEvents(bmw);
    expect(queryAllByRole('tag')).toHaveLength(1);
  });

  it('works when selecting and removing groups', async () => {
    const { getByPlaceholderText, getByText, queryAllByRole } = renderWithTheme(
      <ControlledMultiCombobox itemToGroup={i => i.category} itemToString={i => i.value} />
    );

    fireClickAndMouseEvents(getByPlaceholderText('Select manufacturers'));
    const normal = getByText('Normal');
    const luxury = getByText('Luxury');
    // Make sure that all items are added when selecting groups
    fireClickAndMouseEvents(normal);
    expect(queryAllByRole('tag')).toHaveLength(items.filter(i => i.category === 'Normal').length);
    fireClickAndMouseEvents(luxury);
    expect(queryAllByRole('tag')).toHaveLength(items.length);
    // Make sure that items are removed when deselecting groups
    fireClickAndMouseEvents(luxury);
    expect(queryAllByRole('tag')).toHaveLength(items.filter(i => i.category === 'Normal').length);
    fireClickAndMouseEvents(normal);
    expect(queryAllByRole('tag')).toHaveLength(0);
  });

  it('searches both items and group names', async () => {
    const { getByPlaceholderText, getAllByRole, getByText, queryAllByRole } = renderWithTheme(
      <ControlledMultiCombobox
        itemToGroup={i => i.category}
        searchable
        itemToString={i => i.value}
      />
    );
    const input = getByPlaceholderText('Select manufacturers');
    fireClickAndMouseEvents(getByPlaceholderText('Select manufacturers'));

    fireEvent.change(input, { target: { value: 'Fo' } });
    // Expected two tags here, the actual item and the group item
    expect(getAllByRole('option')).toHaveLength(2);

    fireClickAndMouseEvents(getByText('Ford'));
    expect(getAllByRole('tag')).toHaveLength(1);

    // Search 'Normal' category
    fireEvent.change(input, { target: { value: 'Norm' } });
    expect(getAllByRole('option')).toHaveLength(3);

    fireClickAndMouseEvents(getByText('Normal'));
    expect(queryAllByRole('tag')).toHaveLength(items.filter(i => i.category === 'Normal').length);
  });

  it('renders custom content', async () => {
    const ComboBox: React.FC<Partial<MultiComboboxProps<Item>>> = props => {
      const [selectedManufacturer, updateSelectedManufacturer] = React.useState<Item[]>([]);

      return (
        <MultiCombobox
          label="Choose a car manufacturer"
          onChange={updateSelectedManufacturer}
          value={selectedManufacturer}
          items={items}
          itemToString={item => item.value}
          renderContent={() => <>Custom Placeholder</>}
          {...props}
        />
      );
    };

    const { getByText } = renderWithTheme(<ComboBox />);
    expect(getByText('Custom Placeholder'));
  });
});

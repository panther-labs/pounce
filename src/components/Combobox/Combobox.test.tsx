import { renderWithTheme, fireClickAndMouseEvents, waitMs } from 'test-utils';
import React from 'react';
import Combobox, { ComboboxProps } from './index';
import userEvent from '@testing-library/user-event';

type Item = { value: string; category: string };

const items: Item[] = [
  { value: 'Toyota', category: 'Normal' },
  { value: 'Ford', category: 'Normal' },
  { value: 'Chevrolet', category: 'Luxury' },
];

const ControlledCombobox: React.FC<Partial<ComboboxProps<Item>>> = props => {
  const [selectedManufacturer, updateSelectedManufacturer] = React.useState<Item | null>(null);
  return (
    <Combobox
      label="Choose a car manufacturer"
      onChange={updateSelectedManufacturer}
      value={selectedManufacturer}
      placeholder="Select manufacturer"
      items={items}
      itemToString={item => item.value}
      {...props}
    />
  );
};

describe('Combobox', () => {
  it('renders', () => {
    const { container, getByText, getByPlaceholderText } = renderWithTheme(<ControlledCombobox />);
    expect(container).toMatchSnapshot();

    fireClickAndMouseEvents(getByPlaceholderText('Select manufacturer'));
    expect(container).toMatchSnapshot();

    fireClickAndMouseEvents(getByText('Toyota'));
    expect(container).toMatchSnapshot();
  });

  it('doesn\'t render a "clear selection" button when no option is selected', () => {
    const { queryByText, getByPlaceholderText } = renderWithTheme(<ControlledCombobox />);

    fireClickAndMouseEvents(getByPlaceholderText('Select manufacturer'));
    expect(queryByText('Clear Selection')).not.toBeInTheDocument();
  });

  it('clears selected value when the "clear selection" button is clicked', () => {
    const { getByText, getByPlaceholderText } = renderWithTheme(<ControlledCombobox />);

    const selectionInput = getByPlaceholderText('Select manufacturer');
    const selectionValue = 'Toyota';

    expect(selectionInput).not.toHaveValue();
    fireClickAndMouseEvents(selectionInput);
    fireClickAndMouseEvents(getByText(selectionValue));
    expect(selectionInput).toHaveValue(selectionValue);

    const clearSelectionButton = getByText(
      (_, { tagName, textContent }) => tagName === 'BUTTON' && textContent === 'Clear Selection'
    );

    fireClickAndMouseEvents(clearSelectionButton);
    expect(selectionInput).not.toHaveValue();
  });

  it('fires onblur event when the input focus is lost', async () => {
    const mock = jest.fn();
    const { getByPlaceholderText } = renderWithTheme(
      <>
        <ControlledCombobox onBlur={mock} />
        <input placeholder="another input" />
      </>
    );
    userEvent.click(getByPlaceholderText('Select manufacturer'));
    userEvent.click(getByPlaceholderText('another input'));
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('toggles the dropdown menu by clicking the caret button', async () => {
    const { getByText, getByPlaceholderText, getByRole, queryByText } = renderWithTheme(
      <ControlledCombobox searchable />
    );
    const toggleMenuButton = getByRole('button', { name: 'Toggle Menu' });
    userEvent.click(getByPlaceholderText('Select manufacturer'));
    expect(getByText('Toyota')).toBeInTheDocument();
    fireClickAndMouseEvents(getByText('Toyota'));
    await waitMs(300);
    // Check that menu is closed after selection
    expect(queryByText('Ford')).not.toBeInTheDocument();

    // Click toggle menu button and expect menu to open
    fireClickAndMouseEvents(toggleMenuButton);
    await waitMs(300);
    expect(queryByText('Ford')).toBeInTheDocument();

    // Click toggle menu button again and expect menu to close
    fireClickAndMouseEvents(toggleMenuButton);
    await waitMs(300);
    expect(queryByText('Ford')).not.toBeInTheDocument();
  });
});

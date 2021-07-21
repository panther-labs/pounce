import { renderWithTheme, fireClickAndMouseEvents } from 'test-utils';
import React from 'react';
import Combobox, { ComboboxProps } from './index';

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
    const { container } = renderWithTheme(<ControlledCombobox />);
    expect(container).toMatchSnapshot();
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
});

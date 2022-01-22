import React from 'react';
import { render } from 'test-utils';
import Switch from './Switch';

describe('Switch', () => {
  it('should have correct screenreader output', () => {
    const { getByRole } = render(<Switch label="Test" />);
    expect(getByRole('checkbox', { name: 'Test' })).toBeInTheDocument();
    expect(getByRole('checkbox', { name: 'Test' })).not.toBeChecked();
  });
});

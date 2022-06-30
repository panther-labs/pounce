import React from 'react';
import { render } from 'test-utils';
import Switch from './Switch';

describe('Switch', () => {
  it('should have correct screenreader output', () => {
    const { getByLabelText } = render(<Switch label="Test" />);
    expect(getByLabelText('Test')).toBeInTheDocument();
    expect(getByLabelText('Test')).not.toBeChecked();
  });

  it('should allow overriding the autogenerated id', () => {
    const { container } = render(<Switch label="Test" id="test" />);
    expect(container.querySelector('#test')).toBeInTheDocument();
  });
});

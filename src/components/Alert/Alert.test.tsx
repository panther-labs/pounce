import React from 'react';
import { renderWithTheme } from '../../../jest/utils';
import Alert from '../Alert';

describe('Alert', () => {
  it('renders without a collapsible container when disableAnimation is passed', () => {
    const { container } = renderWithTheme(
      <Alert disableAnimation variant="success" title="This is a success alert" />
    );

    // We expect the first child to be the alert itself
    expect(container.firstChild).toHaveAttribute('role', 'dialog');
  });
  it('renders with a collapsible container when disableAnimation is not passed', () => {
    const { container } = renderWithTheme(
      <Alert variant="success" title="This is a success alert" />
    );

    // We expect the first child to be the collapse related wrapper
    expect(container.firstChild).not.toHaveAttribute('role', 'dialog');
  });
});

import React from 'react';
import { render } from 'test-utils';
import { fireEvent } from '@testing-library/react';
import Modal from './index';
import { renderWithTheme } from '../../../jest/utils';

const mockOnClose = jest.fn();
const mockOnDismiss = jest.fn();

describe('Modal', () => {
  it('does not render modal when closed by default', () => {
    const { queryByRole } = render(<Modal open={false} onClose={mockOnClose} />);

    expect(queryByRole('dialog')).toBeNull();
  });

  it('renders modal with default values when open by default', () => {
    const { getByRole, getByTestId, queryByLabelText } = render(
      <Modal open={true} onClose={mockOnClose} />
    );

    expect(getByRole('dialog')).toBeTruthy();

    // verify default z-index is applied to overlay
    const overlayStyle = getComputedStyle(getByTestId('overlay'));
    expect(overlayStyle.zIndex).toBe('1000');

    // verify close button does not render by default
    expect(queryByLabelText('Dismiss Dialog')).toBeNull();

    // verify pressing escape closes modal
    fireEvent.keyDown(getByRole('dialog'), {
      code: 'Escape',
      keyCode: 27,
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('renders modal title', () => {
    const { getByText } = render(<Modal open={true} title="Test Title" onClose={mockOnClose} />);

    expect(getByText('Test Title')).toBeTruthy();
  });

  it('renders modal with aria-describedby attribute', () => {
    const { getByRole } = render(
      <Modal open={true} aria-describedby="Test Title" onClose={mockOnClose} />
    );

    expect(getByRole('dialog')).toHaveAttribute('aria-describedby');
  });

  it('renders modal with close button', () => {
    const { getByLabelText } = renderWithTheme(
      <Modal open={true} onClose={mockOnClose} showCloseButton={true} />
    );
    const closeButton = getByLabelText('Dismiss Dialog');

    expect(closeButton).toBeTruthy();

    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onDismiss when modal is escaped', () => {
    const { getByRole } = render(
      <Modal open={true} onClose={mockOnClose} onDismiss={mockOnDismiss} />
    );

    fireEvent.keyDown(getByRole('dialog'), {
      code: 'Escape',
      keyCode: 27,
    });
    expect(mockOnDismiss).toHaveBeenCalled();
  });

  it('renders modal overlay with z-index override value', () => {
    const { getByTestId } = render(<Modal open={true} onClose={mockOnClose} overlayZIndex={99} />);
    const overlayStyle = getComputedStyle(getByTestId('overlay'));

    expect(overlayStyle.zIndex).toBe('99');
  });
});

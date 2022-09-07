import React from 'react';
import { useSnackbar, SnackbarProvider } from './SnackbarContext';
import { renderWithTheme } from '../../../jest/utils';

const TestComponent = ({
  title,
  position,
}: {
  title: string;
  position?:
    | 'top-left'
    | 'top-middle'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-middle'
    | 'bottom-right'
    | undefined;
}) => {
  const { pushSnackbar } = useSnackbar();
  React.useEffect(() => {
    pushSnackbar({
      variant: 'success',
      title: title,
      position: position,
    });
  }, []);
  return <></>;
};
describe('Snackbar', () => {
  it('should default to bottom-left', async () => {
    const { findByTestId } = renderWithTheme(
      <SnackbarProvider>
        <TestComponent title="You're awesome!"></TestComponent>
      </SnackbarProvider>
    );

    const snackbarWrapper = await findByTestId('bottom-left-snackbar-wrapper');
    expect(snackbarWrapper).toBeInTheDocument();
    expect(snackbarWrapper).toHaveStyle({ bottom: '12px', left: '24px' });
  });
  it('should appear in the top-right', async () => {
    const { findByTestId } = renderWithTheme(
      <SnackbarProvider>
        <TestComponent title="You're Amazing!" position={'top-left'}></TestComponent>
      </SnackbarProvider>
    );

    const snackbarWrapper = await findByTestId('top-right-snackbar-wrapper');
    expect(snackbarWrapper).toBeInTheDocument();
    expect(snackbarWrapper).toHaveStyle({ top: 0, right: '24px' });
  });
});

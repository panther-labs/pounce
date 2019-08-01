import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid/v4';
import Box from 'components/Box';
import Snackbar, { SnackbarProps } from 'components/Snackbar';
import { isBrowser } from 'utils/helpers';

const SnackbarContext = React.createContext({});

type SnackbarStateShape = SnackbarProps & { id: string };

/**
 * A component that acts both as a state-manager and provider. It provides access to methods for
 * managing snackbar instances
 */
export const SnackbarProvider: React.FC = ({ children }) => {
  const [snackbars, updateSnackbars] = React.useState<SnackbarStateShape[]>([]);

  const pushSnackbar = (snackbarProps: SnackbarProps) => {
    updateSnackbars([...snackbars, { id: uuid(), ...snackbarProps }]);
  };

  const removeSnackbar = (idToRemove: SnackbarStateShape['id']) => {
    updateSnackbars(snackbars.filter(s => s.id !== idToRemove));
  };

  const renderSnackbars = () => {
    if (!isBrowser) {
      return null;
    }

    return ReactDOM.createPortal(
      <Box position="absolute" bottom={9} left={9}>
        {snackbars.map(({ id, ...snackbarProps }) => (
          <Snackbar mt={2} key={id} destroy={() => removeSnackbar(id)} {...snackbarProps} />
        ))}
      </Box>,
      document.body
    );
  };

  const contextPayload = React.useMemo(() => ({ pushSnackbar }), [snackbars]);

  return (
    <SnackbarContext.Provider value={contextPayload}>
      {renderSnackbars()}
      {children}
    </SnackbarContext.Provider>
  );
};

/** A shortcut for the consumer component */
export const SnackbarConsumer = SnackbarContext.Consumer;

/** An alternative to the consumer component through hooks */
export const useSnackbar = () => useContext(SnackbarContext);

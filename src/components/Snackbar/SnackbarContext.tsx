import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import Flex from '../Flex';
import Snackbar, { SnackbarProps } from '../Snackbar';
import { isBrowser } from '../../utils/helpers';
import Box from '../Box';

const generateSnackbarId = () =>
  Math.random()
    .toString(36)
    .substr(2, 5);

const PUSH_SNACKBAR = 'PUSH_SNACKBAR';
const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

type ReducerAction<T, V extends object> = {
  type: T;
  payload: V;
};

type PushSnackbarAction = ReducerAction<
  typeof PUSH_SNACKBAR,
  {
    props: SnackbarPublicProps;
  }
>;

type RemoveSnackbarAction = ReducerAction<
  typeof REMOVE_SNACKBAR,
  {
    id: string;
  }
>;

type SnackbarPublicProps = Omit<SnackbarProps, 'destroy'>;
type SnackbarStateShape = SnackbarPublicProps & { id: string };
type SnackbarStateAction = PushSnackbarAction | RemoveSnackbarAction;

const snackbarStateReducer = (snackbars: SnackbarStateShape[], action: SnackbarStateAction) => {
  switch (action.type) {
    case PUSH_SNACKBAR:
      return [...snackbars, { id: generateSnackbarId(), ...action.payload.props }];
    case REMOVE_SNACKBAR:
      return snackbars.filter(s => s.id !== action.payload.id);
    default:
      return snackbars;
  }
};

const SnackbarContext = React.createContext<{ pushSnackbar: (props: SnackbarPublicProps) => void }>(
  {
    pushSnackbar: () => {},
  }
);

/**
 * A component that acts both as a state-manager and provider. It provides access to methods for
 * managing snackbar instances
 */
export const SnackbarProvider: React.FC = ({ children }) => {
  const [snackbars, dispatch] = React.useReducer<
    React.Reducer<SnackbarStateShape[], SnackbarStateAction>
  >(snackbarStateReducer, []);

  const pushSnackbar = (props: SnackbarPublicProps) => {
    dispatch({ type: PUSH_SNACKBAR, payload: { props: props } });
  };

  const removeSnackbar = (id: SnackbarStateShape['id']) => {
    dispatch({ type: REMOVE_SNACKBAR, payload: { id } });
  };

  const renderSnackbars = () => {
    if (!isBrowser) {
      return null;
    }

    return ReactDOM.createPortal(
      <Flex
        position="fixed"
        bottom={4}
        left={6}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        zIndex={9999}
      >
        {snackbars.map(({ id, ...snackbarPublicProps }) => (
          <Box mb={3} key={id}>
            <Snackbar destroy={() => removeSnackbar(id)} {...snackbarPublicProps} />
          </Box>
        ))}
      </Flex>,
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

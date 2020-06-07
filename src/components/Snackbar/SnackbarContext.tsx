import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import Flex from '../Flex';
import Snackbar, { SnackbarProps } from '../Snackbar';
import { isBrowser } from '../../utils/helpers';
import { animated, useTransition } from 'react-spring';
import useMeasure from 'react-use-measure';
import Box from '../Box';

const generateSnackbarId = () => Math.random().toString(36).substr(2, 5);

const PUSH_SNACKBAR = 'PUSH_SNACKBAR';
const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

type ReducerAction<T, V> = {
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

  const [ref, { height }] = useMeasure({ debounce: 100, scroll: false });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transitions = useTransition<SnackbarStateShape, any>(
    snackbars,
    snackbars.map(({ id }) => id),
    {
      from: { opacity: 0, height: 0 },
      enter: { opacity: 1, height },
      leave: { opacity: 0, height: 0, pointerEvents: 'none' },

      // Snackbars can have varying heights. As sooon as the latest is measured, update the height
      // calculations of this same latest one. This way the last snackbar can always have the
      // correct height, its own (not the heights of the ones animated before)
      update: item => {
        if (item.id === snackbars[snackbars.length - 1].id) {
          return { height };
        }
      },
    }
  );
  const renderSnackbars = () => {
    if (!isBrowser) {
      return null;
    }

    return ReactDOM.createPortal(
      <Flex
        position="fixed"
        bottom={3}
        right={6}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        zIndex={9999}
      >
        {transitions.map(({ item: { id, ...snackbarPublicProps }, key, props: styles }) => (
          <animated.div key={key} style={styles}>
            <Box pt={3} ref={ref}>
              <Snackbar destroy={() => removeSnackbar(id)} {...snackbarPublicProps} />
            </Box>
          </animated.div>
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

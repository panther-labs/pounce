import React from 'react';
import ReactDOM from 'react-dom';
import { ResizeObserver } from '@juggle/resize-observer';
import { animated, useTransition } from 'react-spring';
import useMeasure from 'react-use-measure';
import Flex from '../Flex';
import Snackbar, { SnackbarProps } from '../Snackbar';
import { isBrowser } from '../../utils/helpers';
import Box from '../Box';
import { ControlledAlertProps } from '../utils/ControlledAlert';

type SnackbarContextValue = {
  pushSnackbar: (props: SnackbarPublicProps) => string;
  updateSnackbar: (id: string, props: SnackbarPublicProps) => string;
};

const generateSnackbarId = () => Math.random().toString(36).substr(2, 5);

const PUSH_SNACKBAR = 'PUSH_SNACKBAR';
const UPDATE_SNACKBAR = 'UPDATE_SNACKBAR';
const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

type ReducerAction<T, V> = {
  type: T;
  payload: V;
};

type PushSnackbarAction = ReducerAction<
  typeof PUSH_SNACKBAR,
  {
    id: string;
    props: SnackbarPublicProps;
  }
>;

type UpdateSnackbarAction = ReducerAction<
  typeof UPDATE_SNACKBAR,
  {
    id: string;
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
type SnackbarStateAction = PushSnackbarAction | UpdateSnackbarAction | RemoveSnackbarAction;

const snackbarStateReducer = (snackbars: SnackbarStateShape[], action: SnackbarStateAction) => {
  switch (action.type) {
    case PUSH_SNACKBAR:
      return [...snackbars, { id: action.payload.id, ...action.payload.props }];
    case UPDATE_SNACKBAR:
      return snackbars.map(snackbar =>
        snackbar.id === action.payload.id ? { ...snackbar, ...action.payload.props } : snackbar
      );
    case REMOVE_SNACKBAR:
      return snackbars.filter(s => s.id !== action.payload.id);
    default:
      return snackbars;
  }
};

const SnackbarContext = React.createContext<SnackbarContextValue>({
  pushSnackbar: () => '',
  updateSnackbar: () => '',
});

const positionStyles: { [key in keyof ControlledAlertProps['position']]: Record<string, any> } = {
  'top-left': { top: 0, left: 6 },
  'top-middle': { top: 0, left: '50%', style: { transform: 'translate(-50%, 0)' } },
  'top-right': { top: 0, right: 6 },
  'bottom-left': { bottom: 3, left: 6 },
  'bottom-middle': { bottom: 3, left: '50%', style: { transform: 'translate(-50%, 0)' } },
  'bottom-right': { bottom: 3, right: 6 },
};

/**
 * A component that acts both as a state-manager and provider. It provides access to methods for
 * managing snackbar instances
 */
export const SnackbarProvider: React.FC = ({ children }) => {
  const [snackbars, dispatch] = React.useReducer<
    React.Reducer<SnackbarStateShape[], SnackbarStateAction>
  >(snackbarStateReducer, []);

  const pushSnackbar = React.useCallback(
    (props: SnackbarPublicProps) => {
      const id = generateSnackbarId();
      dispatch({ type: PUSH_SNACKBAR, payload: { id, props } });
      return id;
    },
    [dispatch]
  );

  const updateSnackbar = React.useCallback(
    (id: string, props: SnackbarPublicProps) => {
      dispatch({ type: UPDATE_SNACKBAR, payload: { id, props } });
      return id;
    },
    [dispatch]
  );

  const removeSnackbar = React.useCallback(
    (id: SnackbarStateShape['id']) => {
      dispatch({ type: REMOVE_SNACKBAR, payload: { id } });
      return id;
    },
    [dispatch]
  );

  const [ref, { height }] = useMeasure({ debounce: 100, scroll: false, polyfill: ResizeObserver });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transitions = useTransition<SnackbarStateShape, any>(
    snackbars,
    snackbars.map(({ id }) => id),
    {
      from: { opacity: 0, height: 0 },
      enter: { opacity: 1, height },
      leave: { opacity: 0, height: 0, pointerEvents: 'none' },

      // Snackbars can have varying heights. As soon as the latest is measured, update the height
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

    const listOfPositions = Object.keys(positionStyles) as (keyof typeof positionStyles)[];
    return ReactDOM.createPortal(
      <>
        {listOfPositions.map(position => (
          <Flex
            key={position}
            data-testid={`${position}-snackbar-wrapper`}
            position="fixed"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-end"
            zIndex={9999}
            {...positionStyles[position]}
          >
            {transitions
              .filter(snackbar =>
                // handles multiple toasts in different positions
                // The outer loop here loops through the six possible positions for Snackbars.
                // So this creates a list of all the Snackbars that are supposed to be at this position.
                // If the snackbar has a position value, filter it into the that position.
                // If there is no position listed, show it if the current position being filtered is the bottom-left (default position)
                snackbar.item.position
                  ? snackbar.item.position === position
                  : position === 'bottom-left'
              )
              ?.map(({ item: { id, ...snackbarPublicProps }, key, props: styles }) => (
                <animated.div key={key} style={styles}>
                  <Box pt={3} ref={ref}>
                    <Snackbar destroy={() => removeSnackbar(id)} {...snackbarPublicProps} />
                  </Box>
                </animated.div>
              ))}
          </Flex>
        ))}
      </>,
      document.body
    );
  };

  const contextPayload = React.useMemo(() => ({ pushSnackbar, updateSnackbar, removeSnackbar }), [
    pushSnackbar,
    updateSnackbar,
    removeSnackbar,
  ]);

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
export const useSnackbar = () => React.useContext(SnackbarContext);

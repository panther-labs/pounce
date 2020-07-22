import React from 'react';
import { animated, useTransition } from 'react-spring';
import Box from '../Box';
import IconButton from '../IconButton';
import { DialogContent, DialogOverlay } from '@reach/dialog';

const AnimatedDialogOverlay = animated(DialogOverlay);
const AnimatedDialogContent = animated(DialogContent);

export interface SideSheetProps {
  /** Whether the modal should be visible or not */
  open: boolean;

  /**  Callback fired when the component requests to be closed */
  onClose: () => void;

  /** The id of the HTML node that contains the title of the modal */
  'aria-labelledby'?: string;

  /** The id of the HTML node that contains the text of the modal */
  'aria-describedby'?: string;
}

/**
 * A dialog variation that helps with grabbing the user's attention by blurring the background and
 * presenting an element that requires action from the user
 */
const SideSheet: React.FC<SideSheetProps> = ({ children, open, onClose, ...rest }) => {
  const transitions = useTransition(open, null, {
    from: { transform: 'translate3d(700px, 0, 0)', opacity: 0 },
    enter: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    leave: { transform: 'translate3d(700px, 0, 0)', opacity: 0, pointerEvents: 'none' },
  });

  return (
    <React.Fragment>
      {transitions.map(
        ({ item, key, props: styles }) =>
          item && (
            <AnimatedDialogOverlay
              key={key}
              isOpen={item}
              onDismiss={onClose}
              style={{ overflow: 'visible', opacity: styles.opacity }}
            >
              <AnimatedDialogContent {...rest} style={{ outline: 'none', ...styles }}>
                <Box
                  p={10}
                  minWidth="560px"
                  bg="navyblue-400"
                  position="absolute"
                  top="0"
                  right="0"
                  height="100vh"
                  shadow="dark200"
                  overflow="auto"
                >
                  <Box position="absolute" top={35} right={35} zIndex={1}>
                    <IconButton
                      icon="close"
                      aria-label="Dismiss Dialog"
                      variant="ghost"
                      variantColor="navyblue"
                      onClick={onClose}
                    />
                  </Box>
                  {children}
                </Box>
              </AnimatedDialogContent>
            </AnimatedDialogOverlay>
          )
      )}
    </React.Fragment>
  );
};

export default SideSheet;

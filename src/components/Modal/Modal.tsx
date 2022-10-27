import React from 'react';
import { animated, useTransition } from 'react-spring';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import { useId } from '@reach/auto-id';
import Box from '../Box';
import Card from '../Card';
import Heading from '../Heading';
import Flex from '../Flex';
import IconButton from '../IconButton';

const AnimatedDialogOverlay = animated(DialogOverlay);
const AnimatedDialogContent = animated(DialogContent);

export interface ModalProps {
  /** Whether the modal should be visible or not */
  open: boolean;

  /** Callback fired when the component requests to be closed */
  onClose: () => void;

  /**  The title to add to the modal  */
  title?: string | React.ReactElement;

  /** Whether to render a close button or not */
  showCloseButton?: boolean;

  /** The id of the HTML node that contains the text of the modal */
  'aria-describedby'?: string;

  /** Callback fired when user hits "Escape" or clicks outside the dialog.
   *
   * When _strictly necessary_, this can be used to prevent a user from closing
   * the dialog, but otherwise it is important to allow users to close dialogs
   * for accessibility reasons.
   */
  onDismiss?: (event?: React.SyntheticEvent) => void;

  /**  
     * The z-index to be applied to the modal overlay  
     * @default 1000
     */
  overlayZIndex?: number;
}

/**
 * A dialog variation that helps with grabbing the user's attention by blurring the background and
 * presenting an element that requires action from the user
 */
const Modal: React.FC<ModalProps> = ({
  title,
  children,
  open,
  onClose,
  onDismiss,
  showCloseButton,
  overlayZIndex,
  ...rest
}) => {
  const transitions = useTransition(open, null, {
    from: { transform: 'translate3d(0, 25px, 0)', opacity: 0 },
    enter: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    leave: { transform: 'translate3d(0, 25px, 0)', opacity: 0, pointerEvents: 'none' },
  });

  const id = useId();
  return (
    <React.Fragment>
      {transitions.map(
        ({ item, key, props: styles }) =>
          item && (
            <AnimatedDialogOverlay
              key={key}
              isOpen={item}
              onDismiss={onDismiss ? onDismiss : onClose}
              style={{
                overflow: 'visible',
                opacity: styles.opacity,
                zIndex: overlayZIndex || 1000,
              }}
              as={'div'}
            >
              <Flex justify="center" align="center" height="100%">
                <AnimatedDialogContent
                  aria-labelledby={id}
                  style={{ outline: 'none', ...styles }}
                  as={'div'}
                  {...rest}
                >
                  <Card minWidth="400px" position="relative" boxShadow="dark200">
                    {title && (
                      <Box as="header" borderBottom="1px solid" borderColor="navyblue-300" py={6}>
                        <Heading size="x-small" textAlign="center" id={id}>
                          {title}
                        </Heading>
                      </Box>
                    )}
                    {showCloseButton && (
                      <Box position="absolute" top={3} right={3} zIndex={1}>
                        <IconButton
                          icon="close"
                          aria-label="Dismiss Dialog"
                          variant="ghost"
                          variantColor="navyblue-300"
                          onClick={onClose}
                        />
                      </Box>
                    )}
                    <Box p={8}>{children}</Box>
                  </Card>
                </AnimatedDialogContent>
              </Flex>
            </AnimatedDialogOverlay>
          )
      )}
    </React.Fragment>
  );
};

export default Modal;

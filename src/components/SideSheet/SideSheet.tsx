import React from 'react';
import { animated } from 'react-spring';
import Box from '../Box';
import IconButton from '../IconButton';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import { CSSObject } from '@styled-system/css';

const AnimatedDialogOverlay = animated(DialogOverlay);
const AnimatedDialogContent = animated(DialogContent);

const defaultAnimationStyles = {
  opacity: 1,
};

export interface SideSheetProps {
  /** Whether the modal should be visible or not */
  open: boolean;

  /**  Callback fired when the component requests to be closed */
  onClose: () => void;

  /** The id of the HTML node that contains the title of the modal */
  'aria-labelledby'?: string;

  /** The id of the HTML node that contains the text of the modal */
  'aria-describedby'?: string;

  /** a set of animate-able styles to apply to the Sidesheet. Compatible with react-spring */
  animationStyles?: CSSObject;
}

/**
 * A dialog variation that helps with grabbing the user's attention by blurring the background and
 * presenting an element that requires action from the user
 */
const SideSheet: React.FC<SideSheetProps> = ({
  children,
  open,
  onClose,
  animationStyles = defaultAnimationStyles,
  ...rest
}) => (
  <AnimatedDialogOverlay
    isOpen={open}
    onDismiss={onClose}
    style={{ overflow: 'visible', opacity: animationStyles?.opacity ?? 1 }}
  >
    <AnimatedDialogContent style={{ outline: 'none', ...animationStyles }} {...rest}>
      <Box
        p={10}
        minWidth="560px"
        bg="navyblue-600"
        position="absolute"
        top="0"
        right="0"
        height="100vh"
        shadow="dark200"
        overflow="auto"
      >
        <Box position="relative" p={2}>
          <Box position="absolute" top={2} right={2}>
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
      </Box>
    </AnimatedDialogContent>
  </AnimatedDialogOverlay>
);

export default React.memo(SideSheet);

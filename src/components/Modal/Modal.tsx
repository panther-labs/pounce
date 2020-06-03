import React from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import Box from '../Box';
import Card from '../Card';
import Heading from '../Heading';
import Flex from '../Flex';
import { slugify } from '../../utils/helpers';
import IconButton from '../IconButton';

export interface ModalProps {
  /** Whether the modal should be visible or not */
  open: boolean;

  /** Callback fired when the component requests to be closed */
  onClose: () => void;

  /**  The title to add to the modal  */
  title?: string;

  /** Whether to render a close button or not */
  showCloseButton?: boolean;

  /** The id of the HTML node that contains the text of the modal */
  'aria-describedby'?: string;
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
  showCloseButton,
  ...rest
}) => {
  return (
    <DialogOverlay isOpen={open} onDismiss={onClose}>
      <Flex justify="center" align="center" height="100%">
        <DialogContent
          aria-labelledby={title ? slugify(title) : undefined}
          style={{ outline: 'none' }}
          {...rest}
        >
          <Card minWidth="400px" maxWidth="700px" position="relative">
            {title && (
              <Box as="header" borderBottom="1px solid" borderColor="navyblue-500" py={6}>
                <Heading as="h4" size="x-small" textAlign="center" id={slugify(title)}>
                  {title}
                </Heading>
              </Box>
            )}
            {showCloseButton && (
              <Box position="absolute" top={3} right={3}>
                <IconButton
                  icon="close"
                  aria-label="Dismiss Dialog"
                  variant="ghost"
                  variantColor="navyblue"
                  onClick={onClose}
                />
              </Box>
            )}
            <Box p={8}>{children}</Box>
          </Card>
        </DialogContent>
      </Flex>
    </DialogOverlay>
  );
};

export default Modal;

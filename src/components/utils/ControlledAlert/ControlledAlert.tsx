import React from 'react';
import { useId } from '@reach/auto-id';
import Box from 'components/Box';
import Flex from 'components/Flex';
import IconButton from 'components/IconButton';
import Icon from 'components/Icon';
import useAlertStyles from './useAlertStyles';

export interface ControlledAlertProps {
  /** The main text of the the alert */
  title?: string;

  /** Whether the alert is visible */
  open: boolean;

  /** When the alert is discardable, this is the callback that gets fired on discard */
  onClose: () => void;

  /** The style of the ControlledAlert */
  variant?: 'success' | 'info' | 'warning' | 'error' | 'default';

  /** A secondary text to further explain the title */
  description?: React.ReactNode;

  /** A react component containing available actions for the ControlledAlert  */
  actions?: React.ReactNode | ((helpers: { close: () => void }) => React.ReactNode);

  /** Whether the ControlledAlert should have a close button in order to remove itself */
  discardable?: boolean;
}

/** An ControlledAlert component is simply a container for text that should capture the user's attention */
const ControlledAlert = React.forwardRef<HTMLDivElement, ControlledAlertProps>(
  function ControlledAlert(
    {
      title,
      open,
      onClose,
      description,
      variant = 'default',
      discardable,
      actions = null,
      ...rest
    },
    ref
  ) {
    const { backgroundColor, icon } = useAlertStyles({ variant });
    const id = useId();

    if (!open) {
      return null;
    }

    return (
      <Box
        ref={ref}
        p={4}
        borderRadius="large"
        role="dialog"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        backgroundColor={backgroundColor}
        {...rest}
      >
        {title && (
          <Flex as="header" align="center" fontSize="large">
            <Icon type={icon} mr={2} size="large" />
            <Box
              as="h4"
              fontWeight={description ? 'bold' : 'normal'}
              flexGrow={1}
              mr="auto"
              id={`${id}-title`}
            >
              {title}
            </Box>
            {discardable && (
              <Box my={-3} mr={-3} ml={3}>
                <IconButton
                  aria-label="Discard"
                  variant="unstyled"
                  icon="close"
                  onClick={onClose}
                />
              </Box>
            )}
          </Flex>
        )}
        {description && (
          <Box as="p" fontStyle="italic" mt={title ? 3 : 0} fontSize="medium">
            {description}
          </Box>
        )}
        {actions && (
          <Flex mt={6} justify="flex-end" as="footer">
            {typeof actions === 'function' ? actions({ close }) : actions}
          </Flex>
        )}
      </Box>
    );
  }
);

export default React.memo(ControlledAlert);

import React from 'react';
import { useId } from '@reach/auto-id';
import Box from '../../Box';
import Flex from '../../Flex';
import IconButton from '../../IconButton';
import Icon from '../../Icon';
import useAlertStyles from './useAlertStyles';

export interface ControlledAlertProps {
  /** The main text of the the alert */
  title?: string;

  /** Whether the alert is visible */
  open: boolean;

  /** When the alert is discardable, this is the callback that gets fired on discard */
  onClose: () => void;

  /** The style of the ControlledAlert */
  alertType?: 'success' | 'info' | 'warning' | 'error' | 'default';
  variant: 'default' | 'opaque';

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
      alertType = 'default',
      variant = 'default',
      discardable,
      actions = null,
      ...rest
    },
    ref
  ) {
    const { icon, titleColor, ...styles } = useAlertStyles({ alertType, variant });
    const id = useId();

    if (!open) {
      return null;
    }

    return (
      <Box
        ref={ref}
        p={4}
        role="dialog"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        {...styles}
        {...rest}
      >
        {title && (
          <Flex as="header" align="center" fontSize="large">
            {icon && <Icon type={icon} mr={2} size="large" />}
            <Box
              as="h4"
              color={titleColor}
              fontWeight={description ? 'bold' : 'normal'}
              fontSize={description ? 'x-large' : 'large'}
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

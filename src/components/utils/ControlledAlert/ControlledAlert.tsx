import React from 'react';
import { useId } from '@reach/auto-id';
import Box from '../../Box';
import Flex from '../../Flex';
import IconButton from '../../IconButton';
import Icon from '../../Icon';
import H from '../../H';
import useAlertStyles from './useAlertStyles';

export interface ControlledAlertProps {
  /** The main text of the the alert */
  title?: React.ReactNode;

  /** Whether the alert is visible */
  open: boolean;

  /** When the alert is discardable, this is the callback that gets fired on discard */
  onClose: () => void;

  /** The style of the ControlledAlert */
  variant?: 'success' | 'info' | 'warning' | 'error' | 'default';

  /** The background style of the ControlledAlert */
  variantBackgroundStyle?: 'solid' | 'transparent';

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
      variantBackgroundStyle = 'transparent',
      discardable,
      actions = null,
      ...rest
    },
    ref
  ) {
    const { icon, iconColor, titleColor, ...styles } = useAlertStyles({
      variant,
      variantBackgroundStyle,
    });
    const id = useId();

    if (!open) {
      return null;
    }

    return (
      <Flex
        ref={ref}
        role="dialog"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        {...styles}
        {...rest}
      >
        <Flex
          flexGrow={1}
          direction={variantBackgroundStyle === 'solid' ? 'column' : 'row'}
          align={variantBackgroundStyle === 'solid' ? 'flex-start' : 'center'}
        >
          <Box>
            {title && (
              <Flex as="header" align="center">
                {icon && <Icon type={icon} mr={2} color={iconColor} size="large" />}
                <Box
                  as={H}
                  color={titleColor}
                  fontWeight={description ? 'bold' : 'normal'}
                  fontSize={description ? 'large' : 'medium'}
                  flexGrow={1}
                  mr="auto"
                  id={`${id}-title`}
                >
                  {title}
                </Box>
              </Flex>
            )}
            {description && (
              <Box as="p" mt={title ? 3 : 0} fontSize="medium">
                {description}
              </Box>
            )}
          </Box>
          {actions && (
            <Flex mt={variantBackgroundStyle === 'solid' ? 6 : 0} mr={0} ml="auto">
              {typeof actions === 'function' ? actions({ close }) : actions}
            </Flex>
          )}
        </Flex>
        {discardable && (
          <Box my={-2} mr={-2} ml={2}>
            <IconButton aria-label="Discard" variant="unstyled" icon="close" onClick={onClose} />
          </Box>
        )}
      </Flex>
    );
  }
);

export default React.memo(ControlledAlert);

import React from 'react';
import Box from '../Box';
import Flex from '../Flex';
import IconButton from '../IconButton';
import Icon from '../Icon';
import { slugify } from '../../utils/helpers';
import useAlertStyles from './useAlertStyles';

export interface AlertProps {
  /** The main text of the the alert */
  title: string;

  /** The style of the Alert */
  variant?: 'success' | 'info' | 'warning' | 'error' | 'default';

  /** A secondary text to further explain the title */
  description?: React.ReactNode;

  /** A react component containing available actions for the Alert  */
  actions?: React.ReactNode | ((helpers: { close: () => void }) => React.ReactNode);

  /** Whether the Alert should have a close button in order to remove itself */
  discardable?: boolean;
}

/** An Alert component is simply a container for text that should capture the user's attention */
const Alert: React.FC<AlertProps> = ({
  title,
  description,
  variant = 'default',
  discardable,
  actions = null,
  ...rest
}) => {
  const [open, setOpen] = React.useState(true);
  const { backgroundColor, icon } = useAlertStyles({ variant });
  const id = slugify(title);

  const close = React.useCallback(() => setOpen(false), [setOpen]);

  if (!open) {
    return null;
  }

  return (
    <Box
      p={4}
      borderRadius="large"
      role="dialog"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      backgroundColor={backgroundColor}
      {...rest}
    >
      <Flex as="header" align="center" fontSize="large">
        <Icon type={icon} mr={2} size="small" />
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
            <IconButton aria-label="Discard" variant="unstyled" icon="close" onClick={close} />
          </Box>
        )}
      </Flex>
      {description && (
        <Box as="p" fontStyle="italic" mt={5} fontSize="medium">
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
};

export default Alert;

import React from 'react';
import Box from '../Box';
import Card from '../Card';
import Button from '../Button';
import Flex from '../Flex';
import TimePicker from './TimePicker';
import { IconButton } from '../../index';

interface CustomOverlayProps {
  month?: Date;
  date?: Date;
  selectedDay?: Date;
  withTime?: boolean;
  onCancel: () => void;
  onApply: (date?: Date) => void;
  onTimeUpdate: (date?: Date) => void;
}

const OverlayComponent = React.forwardRef<HTMLInputElement, CustomOverlayProps>(
  function OverlayComponent(
    { onCancel, onApply, onTimeUpdate, children, month, selectedDay, withTime, date, ...rest },
    // Ref can be used for manipulating the actual input element.
    // eslint-disable-next-line
    ref
  ) {
    const onApplyClick = React.useCallback(() => {
      onApply(selectedDay);
    }, [onApply, selectedDay]);

    return (
      // FIXME: This should get wrapped with the FadeIn component but...
      // The FadeIn component is causing flickering as the date changes
      // We need to prevent Fadein from rerendering
      <Box position="relative" {...rest}>
        <Card position="absolute" mt={4} top={0} zIndex={100} p={6} pb={3}>
          <Flex align="center" justify="space-between" mb={4}>
            <IconButton size="small" icon="arrow-back" aria-label="Go to previous page" />
            <Box as="h4" fontSize="medium" fontWeight="bold">
              {(month || new Date()).toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </Box>
            <IconButton size="small" icon="arrow-forward" aria-label="Go to next page" />
          </Flex>
          {children}
          {withTime && <TimePicker onTimeUpdate={onTimeUpdate} date={date} />}
          <Flex
            align="center"
            justify="center"
            borderTop="1px solid"
            borderColor="navyblue-300"
            mx={-24}
            mt={20}
          >
            <Flex align="center" justify="center" pt={3}>
              <Button mr={3} onClick={onCancel} size="small" variantColor="gray">
                Cancel
              </Button>
              <Button onClick={onApplyClick} size="small">
                Apply
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Box>
    );
  }
);

export default React.memo(OverlayComponent);

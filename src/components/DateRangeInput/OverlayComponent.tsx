import React from 'react';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import Box from '../Box';
import Card from '../Card';
import Button from '../Button';
import Flex from '../Flex';
import TimePicker from './TimePicker';
import { IconButton } from '../../index';

interface CustomOverlayProps {
  month?: Date;
  date?: { from: Date; to: Date };
  selectedDay?: Date;
  withTime?: boolean;
  goToNextMonth: () => void;
  onCancel: () => void;
  onApply: (date?: Date) => void;
  onTimeUpdate: (date: { from?: Date; to?: Date }) => void;
}

const Wrapper = styled(Box)`
  position: relative;

  .DayPicker-Day {
    position: relative;
    z-index: 3;
    .day {
      position: relative;
      z-index: 4;
    }
    .bg,
    .highlight {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
    }
    .bg {
      width: 100%;
      z-index: 2;
    }
    .highlight {
      z-index: 1;
      width: 50%;
    }
  }

  .DayPicker-Day--start,
  .DayPicker-Day--end {
    background-color: transparent !important;
    border-radius: 0 !important;
    .bg {
      border-radius: 50%;
      background-color: ${({ theme }) => theme.colors['blue-400']};
    }
  }

  .DayPicker-Day--start {
    .highlight {
      background-color: #2d3e54;
      left: 50%;
    }
  }

  .DayPicker-Day--end {
    .highlight {
      background-color: #2d3e54;
      left: 0;
    }
  }

  .DayPicker-Day--outside + .DayPicker-Day--end,
  .DayPicker-Day--start.DayPicker-Day--end {
    .highlight {
      display: none;
    }
  }
  .DayPicker-Week {
    .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
      &:first-child {
        border-radius: 4px 0 0 4px;
      }
      &:last-child {
        border-radius: 0 4px 4px 0;
      }
    }
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #2d3e54;
    border-radius: 0;
  }

  .DayPicker-Week {
    border-radius: 4px;
  }
  .DayPicker-Month + .DayPicker-Month {
    padding-left: ${({ theme }) => `${theme.space[6]}px`};
  }
`;

const OverlayComponent = React.forwardRef<HTMLInputElement, CustomOverlayProps>(
  function OverlayComponent(
    { onCancel, onApply, onTimeUpdate, children, selectedDay, withTime, month, date, ...rest },
    // Ref can be used for manipulating the actual input element.
    // eslint-disable-next-line
    ref
  ) {
    const previousMonth = month ? dayjs(month) : dayjs();
    const nextMonth = previousMonth.add(1, 'month');
    const onApplyClick = React.useCallback(() => {
      onApply(selectedDay);
    }, [onApply, selectedDay]);

    return (
      // FIXME: This should get wrapped with the FadeIn component but...
      // The FadeIn component is causing flickering as the date changes
      // We need to prevent Fadein from rerendering

      // FIXME: https://github.com/gpbl/react-day-picker/pull/814
      <Wrapper {...rest}>
        <Card position="absolute" mt={4} top={0} zIndex={100} p={6} pb={3}>
          <Flex align="center" justify="space-between" mb={4}>
            <Box>
              <IconButton size="small" icon="arrow-back" aria-label="Go to previous month" />
            </Box>
            <Box as="h4" fontSize="medium" fontWeight="bold">
              {previousMonth.format('MMMM YYYY')}
            </Box>
            <Box as="h4" fontSize="medium" fontWeight="bold">
              {nextMonth.format('MMMM YYYY')}
            </Box>
            <Box>
              <IconButton size="small" icon="arrow-forward" aria-label="Go to next month" />
            </Box>
          </Flex>

          <Flex align="center" justify="space-between" mb={4}>
            {children}
          </Flex>

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
      </Wrapper>
    );
  }
);

export default React.memo(OverlayComponent);

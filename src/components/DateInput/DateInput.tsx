import React, { useState, useCallback } from 'react';
import dayjs from 'dayjs';
import Box from '../Box';
import Flex from '../Flex';
import Button from '../Button';
import Month from './Month';
import { IconButton } from '../../index';
import DateWrapper from './DateWrapper';
import TextInput, { TextInputProps } from '../TextInput';
import TimePicker from './TimePicker';
import { noop } from '../../utils/helpers';

export interface DateInputProps extends TextInputProps {
  /**
   * The format displayed in the input element
   */
  format?: string;

  /**
   * A flag that dictates if the component should allow manipulating time
   */
  withTime?: boolean;

  /**
   * A date that that works as a value
   */
  date?: Date;

  /**
   * A callback for whenever the value of the chosen date changes.
   *
   * `(date: Date | null) => void`
   *
   */
  onChangeDate: (date?: Date) => void;
}

/**
 * A component to help selecting dates in forms
 *
 * Apart from the props specified down below, you can pass any valid prop from the
 * <a href="/#/TextInput">TextInput</a> component (i.e. placeholder, etc.)
 *
 * */
const DateInput: React.FC<DateInputProps> = ({
  date,
  format = 'MM/DD/YYYY',
  withTime,
  onChangeDate = noop,
  ...rest
}) => {
  const dateFormatted = date ? dayjs(date) : dayjs();
  const [currentMonth, setCurrentMonth] = useState(dateFormatted);
  const [currentDate, setCurrentDate] = useState(date);
  const [prevDate, setPrevDate] = useState(date);

  const [open, setOpen] = useState(false);

  const onNextMonth = useCallback(
    e => {
      e.preventDefault();
      const next = currentMonth.add(1, 'month');
      setCurrentMonth(next);
    },
    [currentMonth, setCurrentMonth]
  );
  const onPreviousMonth = useCallback(
    e => {
      e.preventDefault();
      const next = currentMonth.subtract(1, 'month');
      setCurrentMonth(next);
    },
    [currentMonth, setCurrentMonth]
  );

  const onCancel = useCallback(() => {
    setCurrentDate(prevDate);
    setOpen(false);
  }, [setOpen, prevDate, setCurrentDate]);

  const onApply = useCallback(
    e => {
      e.preventDefault();
      setPrevDate(currentDate);
      onChangeDate(currentDate);
      setOpen(false);
    },
    [setOpen, setPrevDate, onChangeDate, currentDate]
  );

  const onExpand = useCallback(
    e => {
      e.preventDefault();
      setOpen(true);
    },
    [setOpen]
  );

  const onDaySelect = useCallback(
    dateChanged => {
      const currentDate = dayjs(date);
      const updated = dateChanged.hour(currentDate.hour()).minute(currentDate.minute());
      // // @ts-ignore
      setCurrentDate(updated.toDate());
    },
    [setCurrentDate]
  );

  const onTimeUpdate = useCallback(timeUpdated => {
    setCurrentDate(timeUpdated.toDate());
  }, []);

  return (
    <>
      <Box position="relative">
        <Box onClick={onExpand} cursor="pointer">
          <TextInput
            {...rest}
            value={currentDate && dayjs(currentDate).format(format)}
            autoComplete="off"
            icon="calendar"
            aria-autocomplete="none"
            tabIndex={-1}
            readOnly
          />
        </Box>
        {open && (
          <DateWrapper isExpanded={open}>
            <Flex align="center" justify="space-between" mb={4}>
              <IconButton
                onClick={onPreviousMonth}
                size="small"
                icon="arrow-back"
                aria-label="Go to previous page"
              />
              <Box as="h4" fontSize="medium" fontWeight="bold" tabIndex="-1">
                {currentMonth.format('MMMM YYYY')}
              </Box>
              <IconButton
                onClick={onNextMonth}
                size="small"
                icon="arrow-forward"
                aria-label="Go to next page"
              />
            </Flex>
            <Month
              onDaySelect={onDaySelect}
              daySelected={dayjs(currentDate)}
              year={currentMonth.year()}
              month={currentMonth.month()}
            />
            {withTime && <TimePicker onTimeUpdate={onTimeUpdate} date={currentDate} />}

            <Flex
              align="center"
              justify="center"
              borderTop="1px solid"
              borderColor="navyblue-300"
              mx={-24}
              mt={20}
            >
              <Flex align="center" justify="center" pt={3} spacing={3}>
                <Button onClick={onCancel} size="small" variantColor="gray">
                  Cancel
                </Button>
                <Button disabled={!currentDate} onClick={onApply} size="small">
                  Apply
                </Button>
              </Flex>
            </Flex>
          </DateWrapper>
        )}
      </Box>
    </>
  );
};

export default React.memo(DateInput);

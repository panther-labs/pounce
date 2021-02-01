import React from 'react';
import { Dayjs } from 'dayjs';
import { getDates } from '../../utils/helpers';
import Box from '../Box';
import AbstractButton from '../AbstractButton';

type OnSelectCallback = (date: [Dayjs, Dayjs]) => void;
type OnCurrentMonthSelect = React.Dispatch<React.SetStateAction<Dayjs>>;
interface PresetsProps {
  currentDateRange?: [Dayjs?, Dayjs?];
  setCurrentMonth: OnCurrentMonthSelect;
  timezone: 'local' | 'utc';
  onSelect: (dates: [Dayjs, Dayjs]) => void;
}

interface ListItemProps {
  selected?: boolean;
  onSelect: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ListItem: React.FC<ListItemProps> = ({ selected, onSelect, ...rest }) => (
  <Box as="li" mb={6}>
    <AbstractButton
      color="navyblue-100"
      _selected={{ color: 'gray-50' }}
      _hover={{ color: 'gray-50' }}
      aria-selected={selected}
      onClick={onSelect}
      fontSize="medium"
      {...rest}
    ></AbstractButton>
  </Box>
);

const getOptions = (timezone: 'local' | 'utc') => [
  {
    id: 'last_day',
    label: 'Last 24 Hours',
    onSelectPreset: (callback: OnSelectCallback, setCurrentMonth: OnCurrentMonthSelect) => (
      e: React.MouseEvent
    ): void => {
      e.preventDefault();
      const { lastDay, nextMonth, now } = getDates(timezone);
      setCurrentMonth(nextMonth);
      callback([lastDay, now]);
    },
  },
  {
    id: 'last_week',
    label: 'Last Week',
    onSelectPreset: (callback: OnSelectCallback, setCurrentMonth: OnCurrentMonthSelect) => (
      e: React.MouseEvent
    ): void => {
      e.preventDefault();
      const { lastWeek, nextMonth, now } = getDates(timezone);
      setCurrentMonth(nextMonth);
      callback([lastWeek, now]);
    },
  },
  {
    id: 'last_month',
    label: 'Last Month',
    onSelectPreset: (callback: OnSelectCallback, setCurrentMonth: OnCurrentMonthSelect) => (
      e: React.MouseEvent
    ): void => {
      e.preventDefault();
      const { lastMonth, nextMonth, now } = getDates(timezone);
      setCurrentMonth(nextMonth);
      callback([lastMonth, now]);
    },
  },
  {
    id: 'last_three_months',
    label: 'Last 3 Months',
    onSelectPreset: (callback: OnSelectCallback, setCurrentMonth: OnCurrentMonthSelect) => (
      e: React.MouseEvent
    ): void => {
      e.preventDefault();
      const { lastThreeMonths, nextMonth, now } = getDates(timezone);
      setCurrentMonth(nextMonth);
      callback([lastThreeMonths, now]);
    },
  },
  {
    id: 'last_six_months',
    label: 'Last 6 Months',
    onSelectPreset: (callback: OnSelectCallback, setCurrentMonth: OnCurrentMonthSelect) => (
      e: React.MouseEvent
    ): void => {
      e.preventDefault();
      const { lastSixMonths, nextMonth, now } = getDates(timezone);
      setCurrentMonth(nextMonth);
      callback([lastSixMonths, now]);
    },
  },
  {
    id: 'custom',
    label: 'Custom',
    onSelectPreset: () => (e: React.MouseEvent) => {
      e.preventDefault();
    },
  },
];

const Presets: React.FC<PresetsProps> = ({
  currentDateRange = [],
  timezone,
  onSelect,
  setCurrentMonth,
}) => {
  const selected: string = React.useMemo(() => {
    const { now, lastDay, lastWeek, lastMonth, lastThreeMonths, lastSixMonths } = getDates(
      timezone
    );
    const [start, end] = currentDateRange;
    if (!start || !end) {
      return 'custom';
    }
    if (!end.isSame(now, 'date')) {
      return 'custom';
    }

    if (start.isSame(lastDay, 'minute')) {
      return 'last_day';
    }

    if (start.isSame(lastWeek, 'date')) {
      return 'last_week';
    }

    if (start.isSame(lastMonth, 'date')) {
      return 'last_month';
    }

    if (start.isSame(lastThreeMonths, 'date')) {
      return 'last_three_months';
    }

    if (start.isSame(lastSixMonths, 'date')) {
      return 'last_six_months';
    }
    return 'custom';
  }, [currentDateRange]);
  return (
    <Box borderRight="1px solid" borderColor="navyblue-300">
      <Box p={6} width="140px">
        <Box as="ol">
          {getOptions(timezone).map(opt => (
            <ListItem
              aria-label={opt.label}
              onSelect={opt.onSelectPreset(onSelect, setCurrentMonth)}
              selected={selected === opt.id}
              key={opt.id}
            >
              {opt.label}
            </ListItem>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Presets;

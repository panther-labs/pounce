import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Box from '../Box';

type OnSelectCallback = (date: [Dayjs, Dayjs]) => void;

interface PresetsProps {
  currentDateRange: [Dayjs, Dayjs];
  onSelect: (dates: [Dayjs, Dayjs]) => void;
}

interface ListItemProps {
  selected?: boolean;
  onSelect: (evt: React.KeyboardEvent) => void;
}

const ListItem: React.FC<ListItemProps> = ({ selected, onSelect, ...rest }) => (
  <Box
    as="li"
    mb={6}
    cursor="pointer"
    color="navyblue-100"
    _selected={{ color: 'gray-50' }}
    _hover={{ color: 'gray-50' }}
    aria-selected={selected}
    onClick={onSelect}
    fontSize="medium"
    {...rest}
  />
);

const now = dayjs();
const lastDay = now.subtract(1, 'day');
const lastWeek = now.subtract(1, 'week');
const lastMonth = now.subtract(1, 'month');
const lastThreeMonths = now.subtract(3, 'month');
const lastSixMonths = now.subtract(6, 'month');

const options = [
  {
    id: 'last_day',
    label: 'Last 24 Hours',
    onSelectPreset: (callback: OnSelectCallback) => (e: React.KeyboardEvent): void => {
      e.preventDefault();
      callback([lastDay, now]);
    },
  },
  {
    id: 'last_week',
    label: 'Last Week',
    onSelectPreset: (callback: OnSelectCallback) => (e: React.KeyboardEvent): void => {
      e.preventDefault();
      callback([lastWeek, now]);
    },
  },
  {
    id: 'last_month',
    label: 'Last Month',
    onSelectPreset: (callback: OnSelectCallback) => (e: React.KeyboardEvent): void => {
      e.preventDefault();
      callback([lastMonth, now]);
    },
  },
  {
    id: 'last_three_months',
    label: 'Last 3 Months',
    onSelectPreset: (callback: OnSelectCallback) => (e: React.KeyboardEvent): void => {
      e.preventDefault();
      callback([lastThreeMonths, now]);
    },
  },
  {
    id: 'last_six_months',
    label: 'Last 6 Months',
    onSelectPreset: (callback: OnSelectCallback) => (e: React.KeyboardEvent): void => {
      e.preventDefault();
      callback([lastSixMonths, now]);
    },
  },
  {
    id: 'custom',
    label: 'Custom',
    onSelectPreset: () => (e: React.KeyboardEvent) => {
      e.preventDefault();
    },
  },
];

const Presets: React.FC<PresetsProps> = ({ currentDateRange, onSelect }) => {
  const selected: string = React.useMemo(() => {
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
        <Box as="ul">
          {options.map(opt => (
            <ListItem
              onSelect={opt.onSelectPreset(onSelect)}
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

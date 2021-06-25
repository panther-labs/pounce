import React from 'react';
import { BoxProps } from 'components/Box';
import { addOpacity } from 'utils/helpers';
import { RadioProps } from './Radio';
import useTheme from 'utils/useTheme';

type UseRadioStyles = Pick<RadioProps, 'invalid' | 'checked'>;

const useRadioStyles = ({ invalid, checked }: UseRadioStyles): BoxProps => {
  const theme = useTheme();

  return React.useMemo(
    () => ({
      transition: 'background-color 0.15s linear',
      _hover: {
        backgroundColor: addOpacity(theme.colors['navyblue-300'], 0.2),
        ':after': {
          borderColor: invalid ? 'red-300' : 'blue-400',
        },
      },
      _focusWithin: {
        backgroundColor: addOpacity(theme.colors['navyblue-300'], 0.2),
        ':after': {
          borderColor: invalid ? 'red-300' : 'blue-400',
        },
      },
      _before: {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: checked ? 1 : 0,
        transition: 'opacity 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        right: 0,
        bottom: 0,
        margin: 'auto',
        width: 12,
        height: 12,
        backgroundColor: 'white',
        borderRadius: 'circle',
      },
      _after: {
        content: '""',
        display: 'block',
        width: 26,
        height: 26,
        border: '1px solid',
        borderRadius: 'circle',
        transition: 'border-color 125ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        borderColor: invalid ? 'red-300' : checked ? 'blue-400' : 'navyblue-300',
      },
    }),
    [theme, invalid, checked]
  );
};

export default useRadioStyles;

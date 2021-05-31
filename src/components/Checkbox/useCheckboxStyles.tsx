import React from 'react';
import { BoxProps } from '../Box';
import { addOpacity } from '../../utils/helpers';
import { CheckboxProps } from './Checkbox';
import useTheme from '../../utils/useTheme';

type UseCheckboxStyles = Pick<CheckboxProps, 'invalid' | 'checked' | 'indeterminate'>;

const useCheckboxStyles = ({ invalid, checked, indeterminate }: UseCheckboxStyles): BoxProps => {
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
        content: checked
          ? `url( 'data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 18" fill="white"><path d="M7 14.17L2.83 10l-1.41 1.41L7 17 19 5l-1.41-1.42L7 14.17z" /></svg>' )`
          : `url( 'data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 18" fill="white"><path d="M20 13.8571V13.1429H4V10.8571H10.1429V10.8571H20V13.1429Z"/></svg>' )`,
        display: 'block',
        position: 'absolute',
        width: 'fit-content',
        height: 'fit-content',
        opacity: checked || indeterminate ? 1 : 0,
        transition: 'opacity 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
      },
      _after: {
        content: '""',
        display: 'block',
        width: 26,
        height: 26,
        border: '1px solid',
        borderRadius: 'small',
        transition: 'border-color 125ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        borderColor: invalid ? 'red-300' : checked ? 'blue-400' : 'navyblue-300',
      },
    }),
    [theme, invalid, checked]
  );
};

export default useCheckboxStyles;

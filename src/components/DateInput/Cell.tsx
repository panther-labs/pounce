import React from 'react';
import Box, { BoxProps } from 'components/Box';

import useTheme from 'utils/useTheme';
import { addOpacity } from 'utils/helpers';

const Cell: React.FC<BoxProps> = props => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        '[aria-relevant]:hover': {
          backgroundColor: 'blue-300',
        },
        '[aria-placeholder]': {
          position: 'absolute',
          zIndex: 1,
          width: '50%',
          height: '100%',
          top: 0,
        },
        "&[aria-busy='true'] + [aria-selected='true'], &[aria-selected='true'] + [aria-busy='true'], &[aria-selected='true'] + &[aria-selected='true']": {
          '[aria-placeholder]': {
            backgroundColor: addOpacity(theme.colors['navyblue-100'], 0.2),
          },
        },
        "&[aria-selected='true'] + &[aria-selected='true'] [aria-placeholder]": {
          width: '100%',
          left: '-50%',
        },
        "&[aria-busy='true'] + &[aria-selected='true'] [aria-placeholder]": {
          left: 0,
        },
        "&[aria-selected='true'] + &[aria-busy='true'] [aria-placeholder]": {
          left: '-50%',
        },
        "&[aria-selected='true'] [aria-relevant]": {
          backgroundColor: 'blue-400',
        },
        "&[aria-busy='true'] [aria-relevant]": {
          borderRadius: 'none',
          backgroundColor: addOpacity(theme.colors['navyblue-100'], 0.2),
        },
        "&[aria-disabled='true'] + &[aria-busy='true']": {
          '[aria-relevant]': {
            // borderRadius: '4px 0 0 4px',
            borderTopLeftRadius: 'medium',
            borderBottomLeftRadius: 'medium',
          },
        },
        "&[aria-busy='true']": {
          '&:last-of-type [aria-relevant]': {
            // borderRadius: '0 4px 4px 0',
            borderTopRightRadius: 'medium',
            borderBottomRightRadius: 'medium',
          },
          '&:first-of-type [aria-relevant]': {
            // borderRadius: '4px 0 0 4px',
            borderTopLeftRadius: 'medium',
            borderBottomLeftRadius: 'medium',
          },
          '&:only-of-type [aria-relevant]': {
            borderRadius: 'medium',
          },
        },
      }}
      {...props}
    />
  );
};

export default Cell;

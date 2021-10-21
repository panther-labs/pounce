import React from 'react';
import Box, { BoxProps } from '../Box';
import { HeadingLevelContext } from './H';

/**
 * Increases the heading level of all `H` components inside it by 1.
 */
export const Section: React.FC<BoxProps<'section'>> = ({ children, as = 'section', ...rest }) => {
  const level = React.useContext(HeadingLevelContext);

  return (
    <HeadingLevelContext.Provider value={level + 1}>
      <Box {...rest} as={as}>
        {children}
      </Box>
    </HeadingLevelContext.Provider>
  );
};

export default Section;

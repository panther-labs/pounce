import React from 'react';
import Box, { BoxProps } from '../Box';
import { HeadingLevelContext } from '../Heading';
import { DEFAULT_HEADING_LEVEL } from '../Heading/Heading';

/**
 * Increases the heading level of all `Heading` components inside it by 1.
 */
export const Section: React.FC<BoxProps<'section'>> = ({ children, as = 'section', ...rest }) => {
  const level = React.useContext(HeadingLevelContext);

  return (
    <HeadingLevelContext.Provider value={level ? level + 1 : DEFAULT_HEADING_LEVEL}>
      <Box {...rest} as={as}>
        {children}
      </Box>
    </HeadingLevelContext.Provider>
  );
};

export default Section;

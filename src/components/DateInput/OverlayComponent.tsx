import React from 'react';
import Box from '../Box';
import Card from '../Card';
import Flex from '../Flex';
import { IconButton } from '../../index';
import FadeIn from '../FadeIn';

interface CustomOverlayProps {
  selectedDay?: Date;
  month?: Date;
}

const OverlayComponent: React.FC<CustomOverlayProps> = ({
  children,
  selectedDay,
  month,
  ...rest
}) => {
  return (
    <FadeIn from="bottom">
      <Box position="relative" {...rest}>
        <Card position="absolute" mt={4} top={0} zIndex={100} p={6}>
          <Flex align="center" justify="space-between" mb={4}>
            <IconButton size="small" icon="arrow-back" aria-label="Go to previous page" />
            <Box as="h4" fontSize="medium" fontWeight="bold">
              {(selectedDay || month || new Date()).toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </Box>
            <IconButton size="small" icon="arrow-forward" aria-label="Go to next page" />
          </Flex>
          {children}
        </Card>
      </Box>
    </FadeIn>
  );
};

export default OverlayComponent;

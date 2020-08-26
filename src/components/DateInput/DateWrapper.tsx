import React from 'react';
import Box from '../Box';
import Card from '../Card';
import { useTransition, animated } from 'react-spring';

interface DateWrapperProps {
  isExpanded: boolean;
}
const AnimatedBox = animated(Box);

const DateWrapper: React.FC<DateWrapperProps> = ({ children, isExpanded }) => {
  const transitions = useTransition(isExpanded, null, {
    from: { transform: 'translate3d(0, -10px, 0)', opacity: 0, pointerEvents: 'none' },
    enter: { transform: 'translate3d(0, 0, 0)', opacity: 1, pointerEvents: 'auto' },
    leave: { transform: 'translate3d(0, -10px, 0)', opacity: 0, pointerEvents: 'none' },
    config: { duration: 250 },
  });
  return (
    <Box position="relative" zIndex={10}>
      {transitions.map(
        ({ item, key, props: styles }) =>
          item && (
            <AnimatedBox key={key} style={styles}>
              <Card position="absolute" mt={4} top={0} p={6}>
                {children}
              </Card>
            </AnimatedBox>
          )
      )}
    </Box>
  );
};

export default DateWrapper;

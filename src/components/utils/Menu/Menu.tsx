import React from 'react';
import { useTransition, animated } from 'react-spring';
import Box from 'components/Box';

const AnimatedBox = animated(Box);

interface MenuProps {
  isOpen: boolean;
  maxHeight: number;
}

const Menu = React.forwardRef<HTMLElement, MenuProps>(function Menu(
  { children, isOpen, maxHeight, ...rest },
  ref
) {
  const transitions = useTransition(isOpen, null, {
    from: { transform: 'scale(0.9,0.9)', opacity: 0 },
    enter: { transform: 'scale(1, 1)', opacity: 1 },
    leave: { transform: 'scale(0.9, 0.9)', opacity: 0 },
    config: { duration: 150 },
  });
  return (
    <React.Fragment>
      {transitions.map(({ item, key, props: styles }) =>
        item ? (
          <AnimatedBox
            ref={ref}
            key={key}
            style={styles}
            mt="-3px"
            border="1px solid"
            borderLeftColor="blue-400"
            borderRightColor="blue-400"
            borderBottomColor="blue-400"
            borderTopColor="navyblue-400"
            borderBottomLeftRadius="medium"
            borderBottomRightRadius="medium"
            backgroundColor="navyblue-300"
            zIndex={10}
            position="absolute"
            width={1}
            maxHeight={maxHeight}
            overflow="auto"
            {...rest}
          >
            {children}
          </AnimatedBox>
        ) : (
          <Box key={key} ref={ref} {...rest} />
        )
      )}
    </React.Fragment>
  );
});

export default Menu;

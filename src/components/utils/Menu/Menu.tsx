import React from 'react';
import { useTransition, animated } from 'react-spring';
import Box from '../../Box';

const AnimatedBox = animated(Box);

interface MenuProps {
  isOpen: boolean;
  maxHeight: number;
}

const Menu: React.FC<MenuProps> = ({ children, isOpen, maxHeight, ...rest }) => {
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
            key={key}
            style={styles}
            mt="-3px"
            border="1px solid"
            borderLeftColor="blue-600"
            borderRightColor="blue-600"
            borderBottomColor="blue-600"
            borderTopColor="navyblue-600"
            borderBottomLeftRadius="medium"
            borderBottomRightRadius="medium"
            backgroundColor="navyblue-450"
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
          <Box {...rest} />
        )
      )}
    </React.Fragment>
  );
};

export default Menu;

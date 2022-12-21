import React from 'react';
import { useTransition, animated } from 'react-spring';
import Box from '../../Box';

const AnimatedBox = animated(Box);

interface MenuProps {
  isOpen: boolean;
  maxHeight: number;
}

function getOffset(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return {
    isLeft: rect.left < window.innerWidth / 2,
  };
}

const Menu = React.forwardRef<HTMLElement, MenuProps>(function Menu(
  { children, isOpen, maxHeight, ...rest },
  ref
) {
  const [positions, setPositions] = React.useState<{
    right: string | number | null;
  }>({ right: null });

  const transitions = useTransition(isOpen, null, {
    from: { transform: 'scale(0.9,0.9)', opacity: 0 },
    enter: { transform: 'scale(1, 1)', opacity: 1 },
    leave: { transform: 'scale(0.9, 0.9)', opacity: 0 },
    config: { duration: 150 },
  });

  React.useLayoutEffect(() => {
    const elementRef = ref as React.MutableRefObject<HTMLElement>;
    if (elementRef?.current && elementRef?.current.parentNode) {
      const parentElement = elementRef.current.parentNode as HTMLElement;
      const { isLeft } = getOffset(parentElement);
      setPositions({ right: isLeft ? null : 0 });
    }
  }, [ref]);

  return (
    <React.Fragment>
      {transitions.map(({ item, key, props: styles }) =>
        item ? (
          <AnimatedBox
            ref={ref}
            key={key}
            style={styles}
            mt="6px"
            border="1px solid"
            borderColor="blue-400"
            borderBottomLeftRadius="medium"
            borderBottomRightRadius="medium"
            backgroundColor="navyblue-300"
            zIndex={10}
            position="absolute"
            minWidth="100%"
            width="max-content"
            maxWidth="40vw"
            maxHeight={maxHeight}
            overflow="auto"
            right={positions.right}
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

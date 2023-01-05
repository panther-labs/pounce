import React from 'react';
import { useTransition, animated } from 'react-spring';
import Box from '../../Box';
import { useComposedRefs } from '@reach/utils';
import { useAlignment } from '../../../utils/useAlignment';

const AnimatedBox = animated(Box);

interface MenuProps {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLElement>;
}

const Menu = React.forwardRef<HTMLElement, MenuProps>(function Menu(
  { children, isOpen, triggerRef, ...rest },
  forwardedRef
) {
  const menuRef = React.useRef(null);
  const positionProperties = useAlignment(triggerRef, menuRef, 'bottom-right');

  const transitions = useTransition(isOpen, null, {
    from: { transform: 'scale(0.9,0.9)', opacity: 0 },
    enter: { transform: 'scale(1, 1)', opacity: 1 },
    leave: { transform: 'scale(0.9, 0.9)', opacity: 0 },
    config: { duration: 150 },
  });

  // Make sure to include both our current ref and also the forwarded one (in case we it's needed by the parent component
  const composedRef = useComposedRefs(menuRef, forwardedRef);
  return (
    <React.Fragment>
      {transitions.map(({ item, key, props: styles }) =>
        item ? (
          <AnimatedBox
            ref={composedRef}
            key={key}
            style={styles}
            mt="6px"
            border="1px solid"
            borderColor="blue-400"
            borderRadius="medium"
            backgroundColor="navyblue-300"
            zIndex={10}
            position="absolute"
            minWidth={triggerRef.current?.offsetWidth}
            width="max-content"
            overflowX="hidden"
            overflowY="auto"
            {...positionProperties}
            {...rest}
          >
            {children}
          </AnimatedBox>
        ) : (
          <Box key={key} ref={composedRef} {...rest} />
        )
      )}
    </React.Fragment>
  );
});

export default Menu;

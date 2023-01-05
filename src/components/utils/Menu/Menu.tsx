import React from 'react';
import { useTransition, animated } from 'react-spring';
import Box from '../../Box';
import { useRect } from '@reach/rect';
import { useComposedRefs } from '@reach/utils';
import useAlignment from '../../../utils/useAlignment';

const AnimatedBox = animated(Box);

interface MenuProps {
  isOpen: boolean;
  anchorRef: React.RefObject<HTMLElement>;
}

const Menu = React.forwardRef<HTMLElement, MenuProps>(function Menu(
  { children, isOpen, anchorRef, ...rest },
  forwardedRef
) {
  const getPositionProperties = useAlignment('bottom-right');
  const anchorRect = useRect<HTMLElement>(anchorRef, { observe: false });

  const menuRef = React.useRef(null);
  const menuRect = useRect<HTMLDivElement>(menuRef);
  const ref = useComposedRefs(menuRef, forwardedRef);

  const transitions = useTransition(isOpen, null, {
    from: { transform: 'scale(0.9,0.9)', opacity: 0 },
    enter: { transform: 'scale(1, 1)', opacity: 1 },
    leave: { transform: 'scale(0.9, 0.9)', opacity: 0 },
    config: { duration: 150 },
  });

  const positionProperties = getPositionProperties(anchorRect, menuRect);
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
            borderRadius="medium"
            backgroundColor="navyblue-300"
            zIndex={10}
            position="absolute"
            minWidth={anchorRect?.width}
            width="max-content"
            overflowX="hidden"
            overflowY="auto"
            {...positionProperties}
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

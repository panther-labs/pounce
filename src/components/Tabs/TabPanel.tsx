import React from 'react';
import { TabPanel as ReachTabPanel, useTabsContext } from '@reach/tabs';
import Box from 'components/Box';

type TabPanelProps = {
  /**
   * Whether the tabs should only load when they are activated
   * @default false
   * */
  lazy?: boolean;

  /**
   * Unmounts the tab when it's not active, so that recurring visits will re-mount. Only applies to
   * tab panels that are lazy loaded (i.e. `lazy=true`)
   * @default false
   */
  unmountWhenInactive?: boolean;
};

type PrivateTabPanelProps = TabPanelProps & {
  /**
   * @ignore
   * private internal index of the tab panel in relation to its siblings. Passed automatically from
   * the `TabPanels` component
   */
  index: number;
};

const TabPanel: React.FC<PrivateTabPanelProps> = ({
  index,
  lazy = false,
  unmountWhenInactive = false,
  children,
  ...rest
}) => {
  const { selectedIndex } = useTabsContext();
  const isActive = selectedIndex === index;
  const wasActiveRef = React.useRef(isActive);

  React.useEffect(() => {
    if (isActive) {
      wasActiveRef.current = true;
    }
  }, [isActive]);

  const shouldRender = !lazy || isActive || (wasActiveRef.current && !unmountWhenInactive);
  return (
    <Box as={ReachTabPanel} tabIndex={-1} outline="none" {...rest}>
      {shouldRender ? children : null}
    </Box>
  );
};

export default TabPanel as React.FC<TabPanelProps>;

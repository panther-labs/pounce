import React from 'react';
import { TabPanel as ReachTabPanel } from '@reach/tabs';
import Box from '../Box';

const TabPanel: React.FC = props => <Box as={ReachTabPanel} tabIndex={-1} {...props} />;

export default TabPanel;

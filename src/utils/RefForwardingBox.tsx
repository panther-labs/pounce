import React from 'react';
import Box, { BoxProps } from '../components/Box';

/**
 * A Component that simply accepts a ref and forwards it as `innerRef`. It's used in integrations
 * with third-party libraries where they automatically inject a `ref` in a component prior to us
 * having the chance to put it as `innerRef`
 */

// eslint-disable-next-line react/display-name
const RefForwardingBox = React.forwardRef<HTMLDivElement, BoxProps>(function RefForwardingBox(
  props,
  ref
) {
  return <Box {...props} innerRef={ref} />;
});

export default RefForwardingBox;

import React from 'react';
import { BoxProps } from 'components/Box';

/**
 * A HOC that makes sure that styled components will not immediately consume the `as` prop, but
 * push it down the component chain
 */
const forwardAs = <P extends BoxProps>(
  Component: React.FC<P & { forwardedAs: BoxProps['as'] }>
) => {
  // @ts-ignore
  const ForwardAs: React.FC<P> = ({ as, ...rest }) => <Component forwardedAs={as} {...rest} />;
  return ForwardAs;
};

export default forwardAs;

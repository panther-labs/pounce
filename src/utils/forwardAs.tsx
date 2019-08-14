import React from 'react';
import { BoxProps } from 'components/Box';

/**
 * A HOC that makes sure that styled components will not immediately consume the `as` prop, but
 * push it down the component chain
 */
const forwardAs = <P extends BoxProps>(Component: React.FC<P>) => {
  const ForwardAs: React.FC<P> = ({ as, ...rest }) =>
    // @ts-ignore
    as ? <Component forwardedAs={as} {...rest} /> : <Component {...rest} />;

  return ForwardAs;
};

export default forwardAs;

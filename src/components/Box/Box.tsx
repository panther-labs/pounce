import React from 'react';
import styled from '@emotion/styled';
import * as StyledSystem from 'styled-system';
import { customStyleProps, shouldForwardProp, SystemProps } from './system';

// Allow all HTML attributes, except for the ones that we use as props
type AllowedHTMLAttributes<Attrs> = Omit<Attrs, keyof SystemProps>;

// prettier-ignore
export type BoxProps<Attrs = React.AllHTMLAttributes<HTMLElement>> = AllowedHTMLAttributes<Attrs> & SystemProps & {
    /**
     * The `ref` that will be forwarded down to the base HTML component. For example if you want
     * `Button` to forward its reference all the way down to the actual `<button>` element, you would
     * use `<Button innerRef={myRef} />`
     */
    innerRef?: React.Ref<any>;

    /**
     * Disallow emotion's `as` prop
     * @ignore
     */
    as?: never;
  };

/** Responsive box-model layout component. Apart from the defined props,
 * it also supports all the native HTML attributes. */
const BaseBox: React.FC<{ ref?: React.LegacyRef<any> }> = styled('div', {
  shouldForwardProp,
})`
  ${StyledSystem.space}
  ${StyledSystem.color}
  ${StyledSystem.layout}
  ${StyledSystem.background}
  ${StyledSystem.grid}
  ${StyledSystem.shadow}
  ${StyledSystem.border} 
  ${StyledSystem.position}
  ${StyledSystem.flexbox}
  ${StyledSystem.typography}
  ${StyledSystem.system(customStyleProps)}
`;

const Box: React.FC<BoxProps> = ({ is, innerRef, ...rest }) => (
  <BaseBox ref={innerRef} as={is} {...rest} />
);

export default Box;

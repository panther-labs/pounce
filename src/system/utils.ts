import React from 'react';
import { pseudoSelectors } from './pseudo';
import { SystemStyleObject, css } from '@styled-system/css';

export const isTag = (component: React.ReactNode) => typeof component === 'string';

export function cssProp({ theme, css: cssPropValue }: any) {
  console.log(cssPropValue);
  return css(cssPropValue)(theme);
}

export function pseudoProps({ theme, ...props }: any) {
  let result: SystemStyleObject = {};
  for (const prop in props) {
    if (prop in pseudoSelectors) {
      // @ts-ignore
      const style = css({ [pseudoSelectors[prop]]: props[prop] })(theme);
      result = { ...result, ...style };
    }
  }
  return result;
}

export const truncateProp = ({ truncated }: { truncated: boolean }) => {
  if (truncated) {
    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };
  }
};

/**
 * Get the display name of a component.
 * It's really useful when debugging in Dev Tools.
 *
 * @param component the react element or component type
 */
export function getDisplayName(component: any) {
  if (!component) {
    return null;
  }

  if (isTag(component)) {
    return component;
  }

  return component.displayName || component.name || 'PounceComponent';
}

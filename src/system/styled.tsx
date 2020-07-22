import React from 'react';
import { truncateProp, pseudoProps, cssProp, isTag } from './utils';
import { filterProps } from './shouldForwardProp';
import { CSSObject } from '@styled-system/css';
import { Dict, As } from './types';
import { jsx } from './jsx';
import * as StyledSystem from 'styled-system';
import { customStyleProps } from '../components/Box';
import useTheme from '../utils/useTheme';
import tags from './tags';

function createStyled<T extends As, P extends Dict>(component: T) {
  const Styled = React.forwardRef(({ as, ...props }: any, ref: React.Ref<any>) => {
    const theme = useTheme();

    const propsWithTheme = { ...props, theme };
    const computedStyles: CSSObject = {
      ...pseudoProps(propsWithTheme),
      ...truncateProp(propsWithTheme),
      ...cssProp(propsWithTheme),
      // ...('_disabled' in props),
      ...StyledSystem.space(propsWithTheme),
      ...StyledSystem.color(propsWithTheme),
      ...StyledSystem.layout(propsWithTheme),
      ...StyledSystem.background(propsWithTheme),
      ...StyledSystem.grid(propsWithTheme),
      ...StyledSystem.shadow(propsWithTheme),
      ...StyledSystem.border(propsWithTheme),
      ...StyledSystem.position(propsWithTheme),
      ...StyledSystem.flexbox(propsWithTheme),
      ...StyledSystem.typography(propsWithTheme),
      ...StyledSystem.system(customStyleProps)(propsWithTheme),
    };

    const element = as || component;
    const elementIsTag = isTag(element);

    /**
     * FIXME: `variantColor` is forwarded. Check if when using `createStyled` for button changes this
     */
    const jsxProps = elementIsTag ? filterProps(props) : { ...props };

    // check if style is empty, we don't want to pass css prop to jsx if it's empty
    // This helps to prevent scenarios where no styles was passed
    // to the component but emotion generate a `css-0` className.
    const hasStyles = Object.keys(computedStyles).length > 0;
    if (hasStyles) {
      jsxProps.css = computedStyles;
    }

    /**
     * Create the element using emotion's jsx, similar tocreateElement
     * but it allows us pass a css object as prop and it'll convert it to a className
     */
    return jsx(component, { ref, ...jsxProps });
  });

  // Compute the display name of the final component
  // Styled.displayName = getDisplayName(component);

  return Styled; // as ChakraComponent<T, P>;
}

// tags.forEach(tag => {
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   //@ts-ignore
//   chakra[tag] = chakra(tag);
// });

export default createStyled;

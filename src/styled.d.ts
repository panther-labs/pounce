import 'styled-components';
import { Theme } from 'themes/default';

// Override styled-component's DefaultTheme with our shape
// https://www.styled-components.com/docs/api#create-a-declarations-file
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {} // eslint-disable-line
}

import '@emotion/react';
import '@styled-system/should-forward-prop';
import { Theme as PounceTheme } from './theme';

declare module '@styled-system/should-forward-prop' {
  declare const props: string[];
  export { props };
}

declare module '@emotion/react' {
  export interface Theme extends PounceTheme {} // eslint-disable-line @typescript-eslint/no-empty-interface
}

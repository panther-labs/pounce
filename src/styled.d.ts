import '@emotion/react';
import { Theme as PounceTheme } from './themes/default';

declare module '@emotion/react' {
  export interface Theme extends PounceTheme {} // eslint-disable-line @typescript-eslint/no-empty-interface
}

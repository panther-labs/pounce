import { axe } from 'jest-axe';
import { ThenArg } from '@reach/utils';

export type AxeResults = ThenArg<ReturnType<typeof axe>>;
import { fireEvent } from '@testing-library/react';
export { renderWithTheme } from './render';
export * from '@testing-library/react';

export function fireClickAndMouseEvents(element: HTMLElement) {
  fireEvent.mouseDown(element);
  fireEvent.mouseUp(element);
  fireEvent.click(element);
}

import { fireEvent } from '@testing-library/react';
export * from '@testing-library/react';

export function fireClickAndMouseEvents(element: HTMLElement) {
  fireEvent.mouseDown(element);
  fireEvent.mouseUp(element);
  fireEvent.click(element);
}

import { isEmpty } from './helpers';

it('isEmpty', () => {
  expect(isEmpty(undefined)).toBeTruthy();
  expect(isEmpty(null)).toBeTruthy();
  expect(isEmpty('')).toBeTruthy();
  expect(isEmpty('    ')).toBeFalsy();
  expect(isEmpty('1  ')).toBeFalsy();
  expect(isEmpty('1')).toBeFalsy();
  expect(isEmpty(0)).toBeFalsy();
  expect(isEmpty(1)).toBeFalsy();
  expect(isEmpty(2)).toBeFalsy();
});

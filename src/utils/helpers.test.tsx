import { isEmpty, addOpacity, lightenDarkenColor, slugify } from './helpers';

it('addOpacity', () => {
  expect(addOpacity('#86a3c3', 0.1)).toMatchInlineSnapshot(`"rgba(134,163,195,0.1)"`);
  expect(addOpacity('#3e516b', 0.1)).toMatchInlineSnapshot(`"rgba(62,81,107,0.1)"`);
  expect(addOpacity('#4f4f4f', 1)).toMatchInlineSnapshot(`"rgba(79,79,79,1)"`);
  expect(addOpacity('#073e73', 0.5)).toMatchInlineSnapshot(`"rgba(7,62,115,0.5)"`);
});

it('lightenDarkenColor', () => {
  expect(lightenDarkenColor('#86a3c3', 85)).toMatchInlineSnapshot(`"#dbf8ff"`);
  expect(lightenDarkenColor('#3e516b', -8)).toMatchInlineSnapshot(`"#364963"`);
  expect(lightenDarkenColor('#073e73', 25)).toMatchInlineSnapshot(`"#20578c"`);
});

it('lightenDarkenColor', () => {
  expect(slugify('')).toMatchInlineSnapshot(`""`);
  expect(slugify('hELLO WORLD')).toMatchInlineSnapshot(`"hello-world"`);
  expect(slugify('👋  hello 👋  world - again ')).toMatchInlineSnapshot(`"hello-world-again"`);
  expect(slugify('-----hello---world------')).toMatchInlineSnapshot(`"hello-world"`);
});

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

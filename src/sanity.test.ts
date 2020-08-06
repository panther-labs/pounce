test('sanity checking', () => {
  const sum = (a: number, b: number) => a + b;
  expect(true).toBe(true);
  expect(sum(1, 2)).toBe(3);
});

test('sanity checking jest-extended', () => {
  //github.com/jest-community/jest-extended#api
  expect('').toBeEmpty();
  expect(1).toBeOneOf([1, 2, 3]);
  expect(null).toBeNil();
});

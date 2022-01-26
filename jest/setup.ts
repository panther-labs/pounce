// extends the basic `expect` function, by adding additional DOM assertions such as
// `.toHaveAttribute`, `.toHaveTextContent` etc.
// https://github.com/testing-library/jest-dom#table-of-contents
import '@testing-library/jest-dom';

// additional matchers for jest. Adds the ability to instantly check for `null` or to check
// whether a mock has been called before another mock
// https://github.com/jest-community/jest-extended#api
import 'jest-extended';

import 'jest-axe/extend-expect';
import { matchers, createSerializer } from 'jest-emotion';

// jest-dom does not properly implement this method and this workaround
// keeps the test runner from throwing warnings
const { getComputedStyle } = window;
window.getComputedStyle = elt => getComputedStyle(elt);

// Add the custom matchers provided by 'jest-emotion'
expect.extend(matchers);

expect.addSnapshotSerializer(
  createSerializer({
    classNameReplacer(className, index) {
      return `pounce-${index}`;
    },
  })
);

const originalError = global.console.error;

// Add a dummy emotion style tag to prevent testing snapshot serializer from failing
// https://github.com/emotion-js/emotion/issues/1960
beforeAll(() => {
  document.head.insertAdjacentHTML(
    'beforeend',
    `<style data-id="jest-emotion-setup" data-emotion="css"></style>`
  );

  // During testing, we modify `console.error` to "hide" errors that have to do with "act" since they
  // are noisy and force us to write complicated test assertions which the team doesn't agree with
  global.console.error = jest.fn((...args) => {
    if (typeof args[0] === 'string' && args[0].includes('was not wrapped in act')) {
      return undefined;
    }
    return originalError(...args);
  });
});

/**
 * Restore `console.error` to what it originally was
 */
afterAll(() => {
  (global.console.error as jest.Mock).mockRestore();
});

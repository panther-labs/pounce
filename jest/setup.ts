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

// Add the custom matchers provided by 'jest-emotion'
expect.extend(matchers);

expect.addSnapshotSerializer(
  createSerializer({
    classNameReplacer(className, index) {
      return `pounce-${index}`;
    },
  })
);

// Add a dummy emotion style tag to prevent testing snapshot serializer from failing
// https://github.com/emotion-js/emotion/issues/1960
beforeAll(() => {
  document.head.insertAdjacentHTML(
    'beforeend',
    `<style data-id="jest-emotion-setup" data-emotion="css"></style>`
  );
});

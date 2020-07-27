import React from 'react';
export * from '@testing-library/react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/core';
import { render as rtlRender } from '@testing-library/react';

// Skip browser prefixes for snapshot tests

const emotionTestingCache = createCache({
  // prefix: false,
  key: 'my-prefix-key',
  stylisPlugins: [
    /* your plugins here */
  ],
});

function wrap(c) {
  return <CacheProvider value={emotionTestingCache}>{c}</CacheProvider>;
}

export async function renderas(Component: React.ReactElement): Promise<T> {
  const result = rtlRender(wrap(Component));
  return result;
}

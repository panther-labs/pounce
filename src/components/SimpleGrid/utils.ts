// These helper fns are modified versions of the amazing rebass library
// https://github.com/rebassjs/rebass/blob/master/packages/layout/src/index.js

import { SimpleGridProps } from './SimpleGrid';

const px = (n: number | string) => (typeof n === 'number' ? n + 'px' : n);

export const widthToColumns = (
  width: SimpleGridProps['minWidth']
): SimpleGridProps['gridTemplateColumns'] => {
  if (Array.isArray(width)) {
    return width.map(widthToColumns) as SimpleGridProps['gridTemplateColumns'];
  }

  if (width != null) {
    return `repeat(auto-fit, minmax(${px(width as string | number)}, 1fr))`;
  }

  return null;
};

export const countToColumns = (
  count: SimpleGridProps['columns']
): SimpleGridProps['gridTemplateColumns'] => {
  if (Array.isArray(count)) {
    return count.map(countToColumns) as SimpleGridProps['gridTemplateColumns'];
  }

  if (count != null) {
    return `repeat(${count}, 1fr)`;
  }

  return null;
};

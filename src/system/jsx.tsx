import { Dict } from './types';
import { jsx as emotionJsx } from '@emotion/react';

export const jsx = (type: React.ElementType, props: Dict, ...children: React.ReactNode[]) =>
  emotionJsx.apply(undefined, [type, props || null, ...children]);

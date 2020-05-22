import { BoxProps } from '../components/Box';

export const disabledStyles: BoxProps = {
  opacity: 0.3,
  pointerEvents: 'none' as const,
  cursor: 'default',
};

import { AbstractButtonProps } from './AbstractButton';

export const defaultButtonStyles: AbstractButtonProps = {
  type: 'button',
  cursor: 'pointer',
  color: 'gray-50' as const,
  textDecoration: 'none',
  backgroundColor: 'transparent' as const,
  transition: 'all 0.1s linear',
};

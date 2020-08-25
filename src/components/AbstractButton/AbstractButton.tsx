import { pounce, SystemProps } from '../../system';
import { __DEV__ } from '../../utils/helpers';

export type AbstractButtonProps = SystemProps;

export const AbstractButton = pounce('button', {
  defaultStyle: {
    cursor: 'pointer',
    color: 'gray-50' as const,
    textDecoration: 'none',
    backgroundColor: 'transparent' as const,
    transition: 'all 0.1s linear',
  },
});

// This is a hack to pass attributes by default, since `defaultStyle` only accepts styling props
AbstractButton.defaultProps = {
  type: 'button',
};

export default AbstractButton;

if (__DEV__) {
  AbstractButton.displayName = 'AbstractButton';
}

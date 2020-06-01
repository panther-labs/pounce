import { PseudoBoxProps } from '../PseudoBox';
import { addOpacity } from '../../utils/helpers';
import { CheckboxProps } from './Checkbox';

type UseCheckboxStyles = Pick<CheckboxProps, 'invalid' | 'checked'>;

const useCheckboxStyles = ({ invalid, checked }: UseCheckboxStyles): PseudoBoxProps => ({
  transition: 'background-color 0.15s linear',
  _hover: {
    backgroundColor: addOpacity('navyblue-450', 0.2),
    ':after': {
      borderColor: invalid ? 'red-200' : 'blue-600',
    },
  },
  _focusWithin: {
    backgroundColor: addOpacity('navyblue-450', 0.2),
    ':after': {
      borderColor: invalid ? 'red-200' : 'blue-600',
    },
  },
  _before: {
    content: `url( 'data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 18" fill="white"><path d="M7 14.17L2.83 10l-1.41 1.41L7 17 19 5l-1.41-1.42L7 14.17z" /></svg>' )`,
    display: 'block',
    position: 'absolute',
    width: 'fit-content',
    height: 'fit-content',
    opacity: checked ? 1 : 0,
    transition: 'opacity 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
  },
  _after: {
    content: '""',
    display: 'block',
    width: 26,
    height: 26,
    border: '1px solid',
    borderRadius: 'small',
    transition: 'border-color 125ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    borderColor: invalid ? 'red-200' : checked ? 'blue-600' : 'navyblue-450',
  },
});

export default useCheckboxStyles;

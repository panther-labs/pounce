import { PseudoBoxProps } from '../PseudoBox';
import { addOpacity } from '../../utils/helpers';
import { RadioProps } from './Radio';

type UseRadioStyles = Pick<RadioProps, 'invalid' | 'checked'>;

const useRadioStyles = ({ invalid, checked }: UseRadioStyles): PseudoBoxProps => ({
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
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: checked ? 1 : 0,
    transition: 'opacity 125ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    right: 0,
    bottom: 0,
    margin: 'auto',
    width: 12,
    height: 12,
    backgroundColor: 'white',
    borderRadius: 'circle',
  },
  _after: {
    content: '""',
    display: 'block',
    width: 26,
    height: 26,
    border: '1px solid',
    borderRadius: 'circle',
    transition: 'border-color 125ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    borderColor: invalid ? 'red-200' : checked ? 'blue-600' : 'navyblue-450',
  },
});

export default useRadioStyles;

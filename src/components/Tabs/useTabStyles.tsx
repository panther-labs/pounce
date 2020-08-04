import { useTabsContext } from '@reach/tabs';
import { AbstractButtonProps } from '../AbstractButton';

interface UseTabStylesProps {
  index: number;
}

const useTabStyles = ({ index }: UseTabStylesProps): Partial<AbstractButtonProps> => {
  const { focusedIndex, selectedIndex } = useTabsContext();

  const selectedColor = 'blue-400';
  const focusedColor = 'navyblue-300';

  const isSelected = selectedIndex === index;
  const isFocused = focusedIndex === index;

  let borderColor: AbstractButtonProps['borderColor'];
  if (isSelected) {
    borderColor = selectedColor;
  } else if (isFocused) {
    borderColor = focusedColor;
  } else {
    borderColor = 'transparent';
  }

  return {
    zIndex: 1,
    borderBottom: '3px solid',
    transition: 'border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    _hover: {
      borderColor: !isSelected ? focusedColor : undefined,
    },
    borderColor,
  };
};

export default useTabStyles;

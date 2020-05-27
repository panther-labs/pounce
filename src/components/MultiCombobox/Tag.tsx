import Icon from '../Icon';
import Flex, { FlexProps } from '../Flex';
import React from 'react';
import AbstractButton from '../AbstractButton';

export interface TagProps extends FlexProps {
  /**
   * What happens when the "X" button is pressed. No "X" button is rendered, if this prop is not
   * specified
   * */
  onRemove?: () => void;
}

/** A chip is an entry in a combobox, but can be used anywhere */
const Tag: React.FC<TagProps> = ({ children, onRemove, ...rest }) => (
  <Flex
    bg="blue-600"
    borderRadius="pill"
    cursor="default"
    align="center"
    px={2}
    fontSize="small"
    fontWeight="medium"
    color="gray-50"
    zIndex={1}
    {...rest}
  >
    {children}
    <AbstractButton onClick={onRemove} ml={2} aria-label="Remove">
      <Icon size="x-small" type="close" />
    </AbstractButton>
  </Flex>
);

export default Tag;

import Icon from '../Icon';
import React from 'react';
import AbstractButton from '../AbstractButton';
import Flex, { FlexProps } from '../Flex';

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
    align="center"
    role="tag"
    bg="blue-400"
    borderRadius="pill"
    cursor="default"
    px={2}
    fontSize="small"
    fontWeight="medium"
    wordBreak="break-all"
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

import Icon from '../Icon';
import React from 'react';
import AbstractButton from '../AbstractButton';
import Box, { BoxProps } from '../Box';

export interface TagProps extends BoxProps {
  /**
   * What happens when the "X" button is pressed. No "X" button is rendered, if this prop is not
   * specified
   * */
  onRemove?: () => void;
}

/** A chip is an entry in a combobox, but can be used anywhere */
const Tag: React.FC<TagProps> = ({ children, onRemove, ...rest }) => (
  <Box
    role="tag"
    bg="blue-400"
    borderRadius="pill"
    cursor="default"
    px={2}
    fontSize="small"
    fontWeight="medium"
    zIndex={1}
    {...rest}
  >
    {children}
    <AbstractButton onClick={onRemove} ml={2} aria-label="Remove">
      <Icon size="x-small" type="close" />
    </AbstractButton>
  </Box>
);

export default Tag;

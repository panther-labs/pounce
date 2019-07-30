import Text from './Text';
import IconButton from './IconButton';
import Icon from './Icon';
import Card, { CardProps } from './Card';
import Flex from './Flex';
import React from 'react';

export interface ChipProps extends CardProps {
  /** What happens when the "X" button is pressed */
  onClick: () => void;

  /** The content that the chip will show */
  content: string;
}

/** A chip is an entry in a combobox, but can be used anywhere */
const Chip: React.FC<ChipProps> = ({ content, onClick, ...rest }) => (
  <Card bg="grey100" px={2} py={1} {...rest}>
    <Flex alignItems="center">
      <Text size="large" mr={2}>
        {content}
      </Text>
      <IconButton onClick={onClick} p={0}>
        <Icon type="remove" />
      </IconButton>
    </Flex>
  </Card>
);

export default Chip;

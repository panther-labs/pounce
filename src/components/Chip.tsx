import Text from './Text';
import IconButton from './IconButton';
import Icon from './Icon';
import Card, { CardProps } from './Card';
import Flex from './Flex';
import React from 'react';

export interface ChipProps extends CardProps {
  /**
   * What happens when the "X" button is pressed. No "X" button is rendered, if this prop is not
   * specified
   * */
  onClick?: () => void;

  /** The content that the chip will show */
  content: string;
}

/** A chip is an entry in a combobox, but can be used anywhere */
const Chip: React.FC<ChipProps> = ({ content, onClick, ...rest }) => (
  <Card bg="grey100" px={2} py={1} {...rest}>
    <Flex alignItems="center">
      <Text size="large" color="grey500">
        {content}
      </Text>
      {onClick && (
        <IconButton variant="default" onClick={onClick} p={0} ml={2}>
          <Icon size="small" type="remove" />
        </IconButton>
      )}
    </Flex>
  </Card>
);

Chip.defaultProps = {
  onClick: undefined,
};

export default Chip;

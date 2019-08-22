import Text from 'components/Text';
import IconButton from 'components/IconButton';
import Icon from 'components/Icon';
import Card, { CardProps } from 'components/Card';
import Flex from 'components/Flex';
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

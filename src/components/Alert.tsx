import React from 'react';
import Text from 'components/Text';
import Card from 'components/Card';
import Box, { BoxProps } from 'components/Box';
import Flex from 'components/Flex';
import IconButton from 'components/IconButton';
import Icon, { svgComponentMapping } from 'components/Icon';

export interface AlertProps extends Omit<BoxProps, 'title'> {
  /** The style of the Alert */
  variant: 'success' | 'info' | 'warning' | 'error';

  /** The title (html or text) of the the component */
  title: React.ReactNode;

  /** A secondary text to further explain the title */
  description?: React.ReactNode;

  /** The type of the icon that will accompany this alert */
  icon?: keyof typeof svgComponentMapping;

  /** Whether the Alert should have a close button in order to remove itself */
  discardable?: boolean;
}

/** An Alert component is simply a container for text that should capture the user's attention */
const Alert: React.FC<AlertProps> = ({
  title,
  description,
  variant,
  icon,
  discardable,
  ...rest
}) => {
  const [open, setOpen] = React.useState(true);

  const variantProps = (function() {
    switch (variant) {
      case 'success':
        return { borderColor: 'green300', color: 'grey400' };
      case 'info':
        return { borderColor: 'blue300', color: 'grey400' };
      case 'warning':
        return { borderColor: 'orange300', color: 'orange300' };
      case 'error':
      default:
        return { borderColor: 'red300', color: 'red300' };
    }
  })();

  // Main title
  const textNode = (
    <Box>
      {title && (
        <Text size="large" as="p" color={variantProps.color}>
          {title}
        </Text>
      )}
      {description && (
        <Text size="medium" as="p" color="grey200" mt={1}>
          {description}
        </Text>
      )}
    </Box>
  );

  return open ? (
    <Card
      position="relative"
      py={4}
      px={7}
      borderLeft="3px solid"
      borderColor={variantProps.borderColor}
      {...rest}
    >
      {icon ? (
        <Flex alignItems="flex-start">
          <Icon type={icon} mr={4} color={variantProps.borderColor} />
          {textNode}
        </Flex>
      ) : (
        textNode
      )}
      {discardable && (
        <Flex position="absolute" right={3} top={0} bottom={0} alignItems="center">
          <IconButton onClick={() => setOpen(false)}>
            <Icon type="close" size="large" color="grey200" />
          </IconButton>
        </Flex>
      )}
    </Card>
  ) : null;
};

Alert.defaultProps = {
  icon: undefined,
  description: undefined,
  discardable: false,
};

export default Alert;

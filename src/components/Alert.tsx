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

  // Progressively override/enhance the rendered structure based on the optional props provided.
  // Order of checks matters a lot here
  let content = (
    <Text size="large" as="p" color={variantProps.color}>
      {title}
    </Text>
  );

  if (description) {
    content = (
      <Box>
        {content}
        <Text size="medium" as="p" color="grey200" mt={1}>
          {description}
        </Text>
      </Box>
    );
  }

  if (icon) {
    content = (
      <Flex alignItems="flex-start">
        <Icon size="small" type={icon} mr={4} color={variantProps.borderColor} />
        {content}
      </Flex>
    );
  }
  if (discardable) {
    content = (
      <Flex alignItems="center">
        <Box flex="1 0 auto">{content}</Box>
        <IconButton ml={7} onClick={() => setOpen(false)}>
          <Icon type="close" size="large" color="grey200" />
        </IconButton>
      </Flex>
    );
  }

  return open ? (
    <Card
      position="relative"
      py={4}
      px={7}
      borderLeft="3px solid"
      borderColor={variantProps.borderColor}
      {...rest}
    >
      {content}
    </Card>
  ) : null;
};

Alert.defaultProps = {
  description: null,
  icon: undefined,
  discardable: false,
};

export default Alert;

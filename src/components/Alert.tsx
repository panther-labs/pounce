import React from 'react';
import Text from 'components/Text';
import Card from 'components/Card';
import Box from 'components/Box';
import Flex from 'components/Flex';
import Icon, { svgComponentMapping } from 'components/Icon';

export interface AlertProps {
  /** The style of the Alert */
  variant: 'success' | 'info' | 'warning' | 'error';

  /** The title (html or text) of the the component */
  title: React.ReactNode;

  /** A secondary text to further explain the title */
  description?: React.ReactNode;

  /** The type of the icon that will accompany this alert */
  icon?: keyof typeof svgComponentMapping;
}

/** An Alert component is simply a container for text that should capture the user's attention */
const Alert: React.FC<AlertProps> = ({ title, description, variant, icon, ...rest }) => {
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

  return (
    <Card py={4} px={7} borderLeft="3px solid" borderColor={variantProps.borderColor} {...rest}>
      {icon ? (
        <Flex alignItems="flex-start">
          <Icon type={icon} mr={4} color={variantProps.borderColor} />
          {textNode}
        </Flex>
      ) : (
        textNode
      )}
    </Card>
  );
};

Alert.defaultProps = {
  icon: undefined,
  description: undefined,
};

export default Alert;

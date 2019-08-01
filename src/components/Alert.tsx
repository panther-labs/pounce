import React from 'react';
import Text from 'components/Text';
import Card from 'components/Card';
import Flex from 'components/Flex';
import Icon, { svgComponentMapping } from 'components/Icon';

export interface AlertProps {
  /** The style of the Alert */
  variant: 'success' | 'info' | 'warning' | 'error';

  /** The content (html or text) of the the component */
  content: React.ReactNode;

  /** The content (html or text) of the the component */
  icon?: keyof typeof svgComponentMapping;
}

/** An Alert component is simply a container for text that should capture the user's attention */
const Alert: React.FC<AlertProps> = ({ content, variant, icon, ...rest }) => {
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

  const textNode = (
    <Text size="large" as="p" color={variantProps.color}>
      {content}
    </Text>
  );

  return (
    <Card py={4} px={8} borderLeft="3px solid" borderColor={variantProps.borderColor} {...rest}>
      {icon ? (
        <Flex alignItems="center">
          <Icon type={icon} mr={4} color={variantProps.borderColor} />
          {textNode}
        </Flex>
      ) : (
        textNode
      )}
    </Card>
  );
};

export default Alert;

import React from 'react';
import Text from 'components/Text';
import Card from 'components/Card';

export interface AlertProps {
  /** The style of the Alert */
  variant: 'info' | 'warning' | 'error';

  /** The content (html or text) of the the component */
  content: React.ReactNode;
}

/** An Alert component is simply a container for text that should capture the user's attention */
const Alert: React.FC<AlertProps> = ({ content, variant, ...rest }) => {
  const variantProps = (function() {
    switch (variant) {
      case 'info':
        return { borderColor: 'blue300', color: 'grey400' };
      case 'warning':
        return { borderColor: 'orange300', color: 'orange300' };
      case 'error':
      default:
        return { borderColor: 'red300', color: 'red300' };
    }
  })();

  return (
    <Card py={4} px={8} borderLeft="3px solid" borderColor={variantProps.borderColor} {...rest}>
      <Text size="large" as="p" color={variantProps.color}>
        {content}
      </Text>
    </Card>
  );
};

export default Alert;

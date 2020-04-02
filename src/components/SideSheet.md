The Sidesheet is a controlled component. This means that you should control its
opening and closing from "outside".

Since it doesn't accept a `title` prop similar to the modal, you should opt for providing the
`aria-describedby` and `aria-labeledby` props with the proper text in all of the SideSheet
components within your app.

```jsx harmony
import React from 'react';
import Button from './Button';
import Flex from './Flex';
import Heading from './Heading';
import IconButton from './IconButton';
import Icon from './Icon';
import Text from './Text';

const Example = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button size="large" variant="primary" onClick={() => setOpen(true)}>
        Open Sidesheet
      </Button>
      <SideSheet open={open} onClose={() => setOpen(false)}>
        <Flex alignItems="center" mb={8}>
          <IconButton variant="default" mr={4}>
            <Icon size="small" type="arrow-back" />
          </IconButton>
          <Heading size="medium">Output settings</Heading>
        </Flex>
        <Text size="medium" color="grey400">
          Add a new output below to deliver alerts to a specific application for further triage.
        </Text>
      </SideSheet>
    </div>
  );
};

<Example />;
```

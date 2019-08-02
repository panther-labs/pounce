The Sidesheet is a controlled component. This means that you should control its
opening and closing from "outside".

Since it doesn't accept a `title` prop similar to the modal, you should opt for providing the
`aria-describedby` and `aria-labeledby` props with the proper text in all of the SideSheet
components within your app.

```jsx harmony
import React from 'react';
import Button from 'components/Button';
import Flex from 'components/Flex';
import Heading from 'components/Heading';
import IconButton from 'components/IconButton';
import Icon from 'components/Icon';
import Text from 'components/Text';

const Example = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Sidesheet</Button>
      <SideSheet open={open} onClose={() => setOpen(false)}>
        <Flex alignItems="center" mb={8}>
          <IconButton mr={4}>
            <Icon type="arrow-back" />
          </IconButton>
          <Heading>Output settings</Heading>
        </Flex>
        <Text color="grey400">
          Add a new output below to deliver alerts to a specific application for further triage.
        </Text>
      </SideSheet>
    </div>
  );
};

<Example />;
```

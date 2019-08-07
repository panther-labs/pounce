The Modal is a controlled component. This means that you should control its
opening and closing from "outside".

Whenever you don't provide the `title`, you should opt for providing the
`aria-describedby` and `aria-labeledby` props yourself in all the Modal
components within your app.

A modal can persist when ESC or backdrop is clicked:

```jsx harmony
import React from 'react';
import Button from 'components/Button';
import Flex from 'components/Flex';
import Text from 'components/Text';

const Example = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button size="large" variant="primary" onClick={() => setOpen(true)}>
        Open Modal No.1
      </Button>
      <Modal open={open}>
        <Flex alignItems="center" justifyContent="center" flexDirection="column">
          <Text size="medium">It works!</Text>
          <Button variant="primary" onClick={() => setOpen(false)} size="small" mt={3}>
            Click me to close
          </Button>
        </Flex>
      </Modal>
    </div>
  );
};

<Example />;
```

A modal can close when ESC or backdrop is clicked:

```jsx harmony
import React from 'react';
import Button from 'components/Button';
import Text from 'components/Text';

const Example = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button size="large" onClick={() => setOpen(true)}>
        Open Modal No.2
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Text size="medium" textAlign="center">
          It works!
        </Text>
      </Modal>
    </div>
  );
};

<Example />;
```

The `title` prop is a useful shortcut when you want to avoid having too much
text to explain what's going on in the modal:

```jsx harmony
import React from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import Flex from 'components/Flex';

const Example = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal No.3</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Are you sure?">
        <Text size="medium" color="grey400">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book.
        </Text>
        <Flex justifyContent="center" alignItems="center" mt={5}>
          <Button variant="default" onClick={() => setOpen(false)}>
            Erm, I agree?
          </Button>
        </Flex>
      </Modal>
    </div>
  );
};

<Example />;
```

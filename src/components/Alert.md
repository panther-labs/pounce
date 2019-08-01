Alerts can be simple:

```jsx harmony
import Box from 'components/Box';

<Box width={1} bg="grey50" p={5}>
  <Alert variant="success" mb={3} content="This is an success alert" />
  <Alert variant="info" mb={3} content="This is an info alert" />
  <Alert variant="warning" mb={3} content="This is a warning alert" />
  <Alert variant="error" content="This is an error alert" />
</Box>;
```

Alerts can also contain icons:

```jsx harmony
import Box from 'components/Box';

<Box width={1} bg="grey50" p={5}>
  <Alert icon="check" variant="success" mb={3} content="This is an success alert" />
  <Alert icon="edit" variant="info" mb={3} content="This is an info alert" />
  <Alert icon="warning" variant="warning" mb={3} content="This is a warning alert" />
  <Alert icon="delete" variant="error" content="This is an error alert" />
</Box>;
```

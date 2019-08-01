Alerts can be simple:

```jsx harmony
import Box from 'components/Box';

<Box width={1} bg="grey50" p={5}>
  <Alert variant="success" mb={3} title="This is an success alert" />
  <Alert variant="info" mb={3} title="This is an info alert" />
  <Alert variant="warning" mb={3} title="This is a warning alert" />
  <Alert variant="error" title="This is an error alert" />
</Box>;
```

Alerts can contain icons:

```jsx harmony
import Box from 'components/Box';

<Box width={1} bg="grey50" p={5}>
  <Alert icon="check" variant="success" mb={3} title="This is an success alert" />
  <Alert icon="edit" variant="info" mb={3} title="This is an info alert" />
  <Alert icon="warning" variant="warning" mb={3} title="This is a warning alert" />
  <Alert icon="delete" variant="error" title="This is an error alert" />
</Box>;
```

Alerts can have descriptions:

```jsx harmony
import Box from 'components/Box';

<Box width={1} bg="grey50" p={5}>
  <Alert
    icon="check"
    variant="success"
    mb={3}
    title="This is an success alert"
    description="This is a nice description of the title"
  />
  <Alert
    icon="edit"
    variant="info"
    mb={3}
    title="This is an info alert"
    description="This is a nice description of the title"
  />
  <Alert
    icon="warning"
    variant="warning"
    mb={3}
    title="This is a warning alert"
    description="This is a nice description of the title"
  />
  <Alert
    icon="delete"
    variant="error"
    title="This is an error alert"
    description="This is a nice description of the title"
  />
</Box>;
```

Alerts can be hidden by the user:

```jsx harmony
import Box from 'components/Box';

<Box width={1} bg="grey50" p={5}>
  <Alert
    icon="check"
    variant="success"
    mb={3}
    title="This is an success alert"
    description="This is a nice description of the title"
    discardable
  />
  <Alert
    icon="edit"
    variant="info"
    mb={3}
    title="This is an info alert"
    description="This is a nice description of the title"
    discardable
  />
  <Alert
    icon="warning"
    variant="warning"
    mb={3}
    title="This is a warning alert"
    description="This is a nice description of the title"
    discardable
  />
  <Alert
    icon="delete"
    variant="error"
    title="This is an error alert"
    description="This is a nice description of the title"
    discardable
  />
</Box>;
```

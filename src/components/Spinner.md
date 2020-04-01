A spinner can have multiple sizes:

```jsx harmony
import Flex from './Flex';

<Flex flexDirection="column" justifyContent="center" alignItems="center">
  <Spinner size="small" mb={2} />
  <Spinner size="medium" mb={2} />
  <Spinner size="large" />
</Flex>;
```

A spinner can appear after a certain delay:

```jsx harmony
import Flex from './Flex';

<Flex flexDirection="column" justifyContent="center" alignItems="center">
  <Spinner delay={3000} size="small" mb={2} />
  <Spinner delay={5000} size="medium" mb={2} />
  <Spinner delay={7000} size="large" />
</Flex>;
```

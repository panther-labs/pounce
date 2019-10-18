A ProgressBar should be used to indicate either progress in terms of steps that the user
needs to complete or to denote that something is not properly ready yet

A ProgressBar can have different colors:

```jsx harmony
import Box from 'components/Box';
import Flex from 'components/Flex';
import ProgressBar from 'components/ProgressBar';

<Box width={1}>
  <Box mb={6}>
    <ProgressBar progressColor="primary300" progress={0.6} />
  </Box>
  <Box>
    <ProgressBar progressColor="green200" progress={0.9} />
  </Box>
</Box>;
```

A ProgressBar can have different thickness:

```jsx harmony
import ProgressBar from 'components/ProgressBar';

<ProgressBar progressColor="primary300" thickness={2} progress={0.6} />;
```

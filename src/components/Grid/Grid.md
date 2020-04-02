```jsx harmony
import Box from '../Box';
import Text from '../Text';

<Grid gridColumnGap={10} gridTemplateColumns="repeat(2, 1fr)">
  <Box bg="primary300" py={3}>
    <Text size="medium" color="white" textAlign="center">
      We are put in
    </Text>
  </Box>
  <Box bg="red200" py={3}>
    <Text size="medium" color="white" textAlign="center">
      2 different columns
    </Text>
  </Box>
</Grid>;
```

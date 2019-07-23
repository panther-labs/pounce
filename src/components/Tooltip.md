You can wrap anything will a tooltip, from buttons:

```jsx harmony
import IconButton from './IconButton';
import Icon from './Icon';
import Flex from './Flex';

<Flex>
  <Tooltip content="Let's add a user together!">
    <IconButton variant="primary">
      <Icon type="user" size="large" />
    </IconButton>
  </Tooltip>
</Flex>;
```

to text:

```jsx harmony
import Flex from './Flex';
import Text from './Text';

<Flex>
  <Tooltip positioning="down" content="I positioned myself in the bottom!">
    <Text>Hover me baby!</Text>
  </Tooltip>
</Flex>;
```

The content of the tooltip should be an instance of `Label`:

```jsx harmony
import IconButton from './IconButton';
import Icon from './Icon';
import Label from './Label';
import Flex from './Flex';

<Flex>
  <Tooltip content={<Label>Let's add a user together!</Label>}>
    <IconButton variant="primary">
      <Icon type="user" size="large" />
    </IconButton>
  </Tooltip>
</Flex>;
```

but you can put other staff in there as well like an icon:

```jsx harmony
import Flex from './Flex';
import Icon from './Icon';
import Text from './Text';

<Flex>
  <Tooltip positioning="down" content={<Icon type="company" />}>
    <Text>Hover me to see a pretty icon</Text>
  </Tooltip>
</Flex>;
```

Also you can make sure that the popup so that its content can be clicked or selected:

```jsx harmony
import Flex from './Flex';
import Icon from './Icon';
import Text from './Text';

<Flex>
  <Tooltip
    allowHover
    positioning="down"
    content={
      <Text as="a" href="https://google.com">
        Go to google!
      </Text>
    }
  >
    <Text>I'll allow you to hover my tooltip</Text>
  </Tooltip>
</Flex>;
```

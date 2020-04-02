A button can be primary:

```jsx harmony
<Button size="large" variant="primary">
  Hey there
</Button>
```

A button can be default:

```jsx harmony
<Button size="large" variant="default">
  Hey there
</Button>
```

A button can be small:

```jsx harmony
<Button variant="secondary" size="small">
  Hey there
</Button>
```

A button can contain an icon:

```jsx harmony
import Icon from '../Icon';
import Flex from '../Flex';
import Text from '../Text';

<Button variant="primary" size="small" is="div">
  <Flex alignItems="center">
    <Icon type="arrow-back" size="small" mr={1} />
    <Text size="medium">Take me back</Text>
  </Flex>
</Button>;
```

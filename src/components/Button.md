A button can be primary:

```jsx harmony
<Button variant="primary">Hey there</Button>
```

A button can be default:

```jsx harmony
<Button variant="default">Hey there</Button>
```

A button can be small:

```jsx harmony
<Button variant="secondary" size="small">
  Hey there
</Button>
```

A button can contain an icon:

```jsx harmony
import Icon from 'components/Icon';
import Flex from 'components/Flex';
import Text from 'components/Text';

<Button variant="primary" size="small">
  <Flex alignItems="center">
    <Icon type="arrow-back" size="small" mr={1} />
    <Text>Take me back</Text>
  </Flex>
</Button>;
```

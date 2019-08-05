A Pill should be used to render numbers like number of unread messages:

```jsx harmony
import IconButton from 'components/IconButton';
import Icon from 'components/Icon';

<IconButton position="relative">
  <Icon type="notification" />
  <Pill color="red" position="absolute" top="0" right="0">
    2
  </Pill>
</IconButton>;
```

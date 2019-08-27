A Pill should be used to render numbers like number of unread messages:

```jsx harmony
import IconButton from 'components/IconButton';
import Icon from 'components/Icon';

<IconButton variant="default" position="relative">
  <Icon size="small" type="notification" />
  <Pill color="red" position="absolute" top="0" right="0" size="small">
    2
  </Pill>
</IconButton>;
```

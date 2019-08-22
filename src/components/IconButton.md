An Icon button can different types of background colors:

```jsx harmony
import Icon from 'components/Icon';

<React.Fragment>
  <IconButton variant="primary" mr={2}>
    <Icon type="user" size="large" />
  </IconButton>
  <IconButton variant="default">
    <Icon type="user" size="large" />
  </IconButton>
</React.Fragment>;
```

It can also be marked as active:

```jsx harmony
import Icon from 'components/Icon';

<React.Fragment>
  <IconButton variant="primary" active mr={2}>
    <Icon type="user" size="large" />
  </IconButton>
  <IconButton variant="default" active>
    <Icon type="user" size="large" />
  </IconButton>
</React.Fragment>;
```

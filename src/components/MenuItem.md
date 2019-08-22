A MenuItem can have simple text as children:

```jsx harmony
import Card from 'components/Card';

<Card>
  <MenuItem>Hello</MenuItem>
  <MenuItem>Hello2</MenuItem>
</Card>;
```

A MenuItem can have complex children:

```jsx harmony
import Icon from 'components/Icon';
import Card from 'components/Card';

<Card>
  <MenuItem>
    <Icon size="small" type="addUser" color="red100" />
  </MenuItem>
</Card>;
```

A MenuItem can be highlighted:

```jsx harmony
<MenuItem highlighted>I am highlighted</MenuItem>
```

A MenuItem can be selected:

```jsx harmony
<MenuItem selected>I am selected</MenuItem>
```

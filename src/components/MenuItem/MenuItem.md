A MenuItem can have simple text as children:

```jsx harmony
import Card from '../Card';

<Card>
  <MenuItem variant="default">Hello</MenuItem>
  <MenuItem variant="default">Hello2</MenuItem>
</Card>;
```

A MenuItem can have complex children:

```jsx harmony
import Icon from '../Icon';
import Card from '../Card';

<Card>
  <MenuItem variant="default">
    <Icon size="small" type="addUser" color="red100" />
  </MenuItem>
</Card>;
```

A MenuItem can be highlighted:

```jsx harmony
<MenuItem variant="default" highlighted>
  I am highlighted
</MenuItem>
```

A MenuItem can be selected:

```jsx harmony
<MenuItem variant="default" selected>
  I am selected
</MenuItem>
```

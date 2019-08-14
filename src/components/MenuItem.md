A MenuItem can have simple text as children:

```jsx harmony
import Card from 'components/Card';

<Card>
  <MenuItem variant="default">Hello</MenuItem>
  <MenuItem variant="primary">Hello2</MenuItem>
</Card>;
```

A MenuItem can have complex children:

```jsx harmony
import Icon from 'components/Icon';
import Card from 'components/Card';

<Card>
  <MenuItem variant="default">
    <Icon size="small" type="addUser" color="red100" />
  </MenuItem>
  <MenuItem variant="primary">
    <Icon size="small" type="notification" color="red100" />
  </MenuItem>
</Card>;
```

A MenuItem can be highlighted:

```jsx harmony
import Card from 'components/Card';

<Card>
  <MenuItem variant="default">Hello</MenuItem>
  <MenuItem variant="primary">Hello2</MenuItem>
</Card>;
```

A MenuItem can be selected:

```jsx harmony
import Card from 'components/Card';

<Card>
  <MenuItem variant="default" selected>
    I am selected
  </MenuItem>
  <MenuItem variant="primary" selected>
    I am selected
  </MenuItem>
</Card>;
```

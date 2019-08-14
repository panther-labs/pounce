In order to utilise the `Dropdown` module you need to make use of `Dropdown.Item`.
This is a special component tha tshould wrap **every** entry that you defined inside
your `Dropdown`. The `Dropdown.Item` component accepts a single prop:

```text
onSelect: () => void
```

which is the callback to invoke when the user has selected the corresponding option
through either a click event or by pressing the Enter/Space key when navigating via the
arrows. It's important to use this instead of `onClick` since this takes care
of both _click_ and _key_ events.

The `Dropdown.Item` component **must** be a direct child of the
`Dropdown` component.

---

A dropdown can be compose other elements :

```jsx harmony
import Button from 'components/Button';
import MenuItem from 'components/MenuItem';

<Dropdown
  trigger={
    <Button as="div" size="large" variant="default">
      I'm composable
    </Button>
  }
>
  <Dropdown.Item onSelect={() => alert('clicked first')}>
    <MenuItem variant="default">First option</MenuItem>
  </Dropdown.Item>
  <Dropdown.Item onSelect={() => alert('clicked second')}>
    <MenuItem variant="default">Second option</MenuItem>
  </Dropdown.Item>
</Dropdown>;
```

A dropdown can contain anything. Even just `<Icon />` components:

```jsx harmony
import Icon from 'components/Icon';

<Dropdown menuProps={{ p: 3 }} trigger={<Icon size="small" type="more" />}>
  <Dropdown.Item onSelect={() => alert('clicked first')}>
    <Icon size="small" type="add" />
  </Dropdown.Item>
  <Dropdown.Item onSelect={() => alert('clicked second')}>
    <Icon size="small" type="addUser" />
  </Dropdown.Item>
</Dropdown>;
```

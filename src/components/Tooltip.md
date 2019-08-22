The content of the tooltip should be an instance of `Label`:

```jsx harmony
import IconButton from 'components/IconButton';
import Icon from 'components/Icon';
import Label from 'components/Label';

<Tooltip content={<Label size="medium">Let's add a user together!</Label>}>
  <IconButton variant="primary">
    <Icon type="user" size="large" />
  </IconButton>
</Tooltip>;
```

but you can put other staff in there as well like an icon:

```jsx harmony
import Icon from 'components/Icon';
import Text from 'components/Text';

<Tooltip positioning="down" content={<Icon size="small" type="company" />}>
  <Text>Hover me to see a pretty icon</Text>
</Tooltip>;
```

Also you can make sure that the popup so that its content can be clicked or selected:

```jsx harmony
import Icon from 'components/Icon';
import Text from 'components/Text';

<Tooltip
  allowHover
  positioning="down"
  content={
    <Text size="medium" is="a" href="https://google.com">
      Go to google!
    </Text>
  }
>
  <Text>I'll allow you to hover my tooltip</Text>
</Tooltip>;
```

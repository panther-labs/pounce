By default the Breadcrumbs will render anchor tags (`a`):

```jsx harmony
const items = [
  {
    text: 'First page',
    href: '/#/Box',
  },
  {
    text: 'Second page',
    href: '/#/Flex',
  },
];

<Breadcrumbs items={items} />;
```

You can easily override that by providing your own custom renderer:

```jsx harmony
const items = [
  {
    text: 'I am not',
    href: '/#/Table',
  },
  {
    text: 'a Link',
    href: '/#/Box',
  },
  {
    text: 'I am simply',
    href: '/#/Flex',
  },
  {
    text: 'a pretty div',
    href: '/#/Dropdown',
  },
];

const itemRenderer = item => <div>{item.text}</div>;

<Breadcrumbs items={items} itemRenderer={itemRenderer} />;
```

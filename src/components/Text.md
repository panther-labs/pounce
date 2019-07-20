```jsx harmony
<Text>This is some text</Text>
```

You can change the props as usual:

```jsx harmony
<Text color="primary300" fontSize={5}>
  This is some bigger text
</Text>
```

You can also change the underlying dom element:

```jsx harmony
<Text color="primary300" fontSize={5} as="p">
  This is the same bigger text as a paragraph tag
</Text>
```

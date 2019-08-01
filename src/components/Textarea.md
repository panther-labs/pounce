A textarea can have a label:

```jsx harmony
<Textarea label="First name" placeholder="Type something..." />
```

It can be valid:

```jsx harmony
<Textarea placeholder="Type something..." value="I'm valid" />
```

or invalid:

```jsx harmony
<Textarea error="Oops this is wrong" placeholder="Type something..." value="I'm invalid" />
```

and can scale **automatically** based on the size of the content:

```jsx harmony
<Textarea
  placeholder="Type something..."
  value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
/>
```

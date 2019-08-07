An input can have a label:

```jsx harmony
<TextInput label="First name" placeholder="Type something..." />
```

It can be valid:

```jsx harmony
import React from 'react';

const Example = () => {
  const [value, setValue] = React.useState("I'm valid");
  return (
    <TextInput
      onChange={e => setValue(e.target.value)}
      placeholder="Type something..."
      value={value}
    />
  );
};

<Example />;
```

or invalid:

```jsx harmony
import React from 'react';

const Example = () => {
  const [value, setValue] = React.useState("I'm invalid");
  return (
    <TextInput
      error="Oops this is wrong"
      onChange={e => setValue(e.target.value)}
      placeholder="Type something..."
      value={value}
    />
  );
};

<Example />;
```

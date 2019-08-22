A thing to remember is that all the comboboxes have a controlled state when
it comes to the selected items. Thus, they do not maintain their own internal state
but expect you to pass them explicitly the selected items.

You get notified of changes to the selections through the `onChange` prop.

---

A Combobox can be basic:

```jsx harmony
import React from 'react';

const Example1 = () => {
  const [selectedItems, updateSelectedItems] = React.useState(null);
  return (
    <Combobox
      label="Choose a car manufacturer"
      items={['Toyota', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Hammer', 'Dodge', 'Audi']}
      onChange={updateSelectedItems}
      value={selectedItems}
      inputProps={{ placeholder: 'Search for a manufacturer' }}
      rootProps={{ width: 400 }}
    />
  );
};

<Example1 />;
```

A Combobox can have search functionality:

```jsx harmony
import React from 'react';

const Example2 = () => {
  const [selectedItems, updateSelectedItems] = React.useState(null);
  return (
    <Combobox
      searchable
      label="Choose a car manufacturer"
      items={['Toyota', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Hammer', 'Dodge', 'Audi']}
      onChange={updateSelectedItems}
      value={selectedItems}
      inputProps={{ placeholder: 'Search for a manufacturer' }}
      rootProps={{ width: 400 }}
    />
  );
};

<Example2 />;
```

A simple Combobox can be thought of as a typical `<select>` component. Whenerever you would
use a normal select, you should now pass the `<Combobox>` component.

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
      items={[
        { text: 'Toyota', value: 'toyota' },
        { text: 'Ford', value: 'ford' },
        { text: 'Chevrolet', value: 'chevrolet' },
        { text: 'BMW', value: 'bmw' },
        { text: 'Mercedes', value: 'mercedes' },
        { text: 'Hammer', value: 'hammer' },
        { text: 'Dodge', value: 'dodge' },
        { text: 'Audi', value: 'audi' },
      ]}
      onChange={updateSelectedItems}
      selectedItem={selectedItems}
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
      items={[
        { text: 'Toyota', value: 'toyota' },
        { text: 'Ford', value: 'ford' },
        { text: 'Chevrolet', value: 'chevrolet' },
        { text: 'BMW', value: 'bmw' },
        { text: 'Mercedes', value: 'mercedes' },
        { text: 'Hammer', value: 'hammer' },
        { text: 'Dodge', value: 'dodge' },
        { text: 'Audi', value: 'audi' },
      ]}
      onChange={updateSelectedItems}
      selectedItem={selectedItems}
      inputProps={{ placeholder: 'Search for a manufacturer' }}
      rootProps={{ width: 400 }}
    />
  );
};

<Example2 />;
```

A Combobox can accepts multiple values:

```jsx harmony
import React from 'react';

const Example3 = () => {
  const [selectedItems, updateSelectedItems] = React.useState([]);
  return (
    <Combobox
      label="Choose a car manufacturer"
      items={[
        { text: 'Toyota', value: 'toyota' },
        { text: 'Ford', value: 'ford' },
        { text: 'Chevrolet', value: 'chevrolet' },
        { text: 'BMW', value: 'bmw' },
        { text: 'Mercedes', value: 'mercedes' },
        { text: 'Hammer', value: 'hammer' },
        { text: 'Dodge', value: 'dodge' },
        { text: 'Audi', value: 'audi' },
      ]}
      onChange={updateSelectedItems}
      selectedItem={selectedItems}
      inputProps={{ placeholder: 'Search for a manufacturer' }}
      rootProps={{ width: 400 }}
    />
  );
};

<Example3 />;
```

A Combobox can accepts multiple values and have search functionality:

```jsx harmony
import React from 'react';

const Example4 = () => {
  const [selectedItems, updateSelectedItems] = React.useState([]);
  return (
    <Combobox
      searchable
      label="Choose a car manufacturer"
      items={[
        { text: 'Toyota', value: 'toyota' },
        { text: 'Ford', value: 'ford' },
        { text: 'Chevrolet', value: 'chevrolet' },
        { text: 'BMW', value: 'bmw' },
        { text: 'Mercedes', value: 'mercedes' },
        { text: 'Hammer', value: 'hammer' },
        { text: 'Dodge', value: 'dodge' },
        { text: 'Audi', value: 'audi' },
      ]}
      onChange={updateSelectedItems}
      selectedItem={selectedItems}
      inputProps={{ placeholder: 'Search for a manufacturer' }}
      rootProps={{ width: 400 }}
    />
  );
};

<Example4 />;
```

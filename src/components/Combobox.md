A thing to remember is that all the comboboxes have a controlled state when
it comes to the selected items. Thus, they do not maintain their own internal state
but expect you to pass them explicitly the selected items.

You get notified of changes to the selections through the `onChange` prop.

---

A Combobox can be basic:

```jsx harmony
import React from 'react';

const Example1 = () => {
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
      value={selectedItems}
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
      multiple
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
      value={selectedItems}
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
      multiple
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
      value={selectedItems}
      inputProps={{ placeholder: 'Search for a manufacturer' }}
      rootProps={{ width: 400 }}
    />
  );
};

<Example4 />;
```

A Combobox can allow user to add values of their own:

```jsx harmony
import React from 'react';

const Example4 = () => {
  const [selectedItems, updateSelectedItems] = React.useState([]);
  return (
    <Combobox
      multiple
      allowAdditions
      searchable
      label="Choose a car manufacturer"
      items={[]}
      onChange={updateSelectedItems}
      value={selectedItems}
      inputProps={{ placeholder: 'Search for a manufacturer' }}
      rootProps={{ width: 400 }}
    />
  );
};

<Example4 />;
```

A Combobox can allow user to only add values that satisfy a certain condition:

```jsx harmony
import React from 'react';

const Example4 = () => {
  const [selectedItems, updateSelectedItems] = React.useState([]);
  return (
    <Combobox
      multiple
      allowAdditions
      searchable
      label="Only words that contain the word Panther"
      items={[]}
      onChange={updateSelectedItems}
      validateAddition={item => item.value.includes('Panther')}
      value={selectedItems}
      inputProps={{ placeholder: 'Must contain the word Panther' }}
      rootProps={{ width: 400 }}
    />
  );
};

<Example4 />;
```

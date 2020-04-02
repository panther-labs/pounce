A thing to remember is that all the comboboxes have a controlled state when
it comes to the selected items. Thus, they do not maintain their own internal state
but expect you to pass them explicitly the selected items.

You get notified of changes to the selections through the `onChange` prop.

---

A MultiCombobox can be basic:

```jsx harmony
import React from 'react';

const Example3 = () => {
  const [selectedItems, updateSelectedItems] = React.useState([]);
  return (
    <MultiCombobox
      label="Choose a car manufacturer"
      items={['Toyota', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Hammer', 'Dodge', 'Audi']}
      onChange={updateSelectedItems}
      value={selectedItems}
      inputProps={{ placeholder: 'Search for a manufacturer' }}
      rootProps={{ width: 400 }}
    />
  );
};

<Example3 />;
```

A MultiCombobox have search functionality:

```jsx harmony
import React from 'react';

const Example4 = () => {
  const [selectedItems, updateSelectedItems] = React.useState([]);
  return (
    <MultiCombobox
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

<Example4 />;
```

A MultiCombobox can allow user to add values of their own:

```jsx harmony
import React from 'react';

const Example4 = () => {
  const [selectedItems, updateSelectedItems] = React.useState([]);
  return (
    <MultiCombobox
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

A MultiCombobox can allow user to only add values that satisfy a certain condition:

```jsx harmony
import React from 'react';

const Example4 = () => {
  const [selectedItems, updateSelectedItems] = React.useState([]);
  return (
    <MultiCombobox
      allowAdditions
      searchable
      label="Only words that contain the word Panther"
      items={[]}
      onChange={updateSelectedItems}
      validateAddition={text => text.includes('Panther')}
      value={selectedItems}
      inputProps={{ placeholder: 'Must contain the word Panther' }}
      rootProps={{ width: 400 }}
    />
  );
};

<Example4 />;
```

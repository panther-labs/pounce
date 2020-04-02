```jsx harmony
import React from 'react';

const Example = () => {
  const [isChecked, setChecked] = React.useState(false);
  return <Checkbox checked={isChecked} onChange={setChecked} />;
};

<Example />;
```

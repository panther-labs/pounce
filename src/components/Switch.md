```jsx harmony
import React from 'react';

const Example = () => {
  const [isChecked, setChecked] = React.useState(false);
  return <Switch checked={isChecked} onChange={setChecked} />;
};

<Example />;
```

As with every other form component, the DateInput is a controlled component and so it
requires for you to specify the `value` and the `onChange` handler.

Apart from these two (2), the component is ready for plug & play. Any extra
prop that you specify will be given to the underlying input element of the
module.

---

```jsx harmony
import React from 'react';

const Example = () => {
  const [dateStr, setDateStr] = React.useState(null);
  return <DateInput onChange={setDateStr} value={dateStr} placeholder="Enter a date" />;
};

<Example />;
```

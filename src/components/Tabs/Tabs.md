- Each `Tab` button should be a **direct** child of a `TabList` component (for accessibility issues).
  This component accepts no props.

- Each tab-content must be wraped with a `TabPanel` component. The `TabPanel` accepts the following
  props:

```text
selected?: boolean /* Whether the tabpanel should be visible */
shouldRender?: boolean /* Whether the content should mount even if the tab is not visible atm */
```

---

As usual, this is a controlled component, meaning that you should manage the state that stores
the index (or nickname) of the currently active `TabPanel`.

Just like with <a href="/#/Dropdown">Dropdown</a> it is important to remember to
pass `onSelect` and **not** `onClick` since you won't be benefiting from keyboard control
without it!

```jsx harmony
import React from 'react';
import { TabList, Tab, TabPanel } from '../Tabs';
import Card from '../Card';

const Example = () => {
  const tabs = ['Traits', 'Event History', 'Identities'];
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div>
      <TabList>
        {tabs.map((t, index) => (
          <Tab
            key={t}
            selected={activeTab === index}
            onSelect={() => setActiveTab(index)}
            id={t}
            aria-controls={`panel-${t}`}
            mr={2}
          >
            {t}
          </Tab>
        ))}
      </TabList>
      {tabs.map((t, index) => (
        <TabPanel key={t} selected={activeTab === index} aria-labelledby={t}>
          <Card p={9} mt={3}>
            Panel {t}
          </Card>
        </TabPanel>
      ))}
    </div>
  );
};

<Example />;
```

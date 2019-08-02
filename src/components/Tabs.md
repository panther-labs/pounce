- Each `Tab` button should be a **direct** child of a `TabList` component (for accessibility issues).
- Each tab-content must be wraped with a `TabPanel` component.

As usual, this is a controlled component, meaning that you should manage the state that stores
the index (or nickname) of the currently active `TabPanel`.

Just like with <a href="/#/Dropdown">Dropdown</a> it is important to remember to
pass `onSelect` and **not** `onClick` since you won't be benefiting from keyboard control
without it!

```jsx harmony
import React from 'react';
import { TabList, Tab, TabPanel } from 'components/Tabs';
import Card from 'components/Card';

const Example = () => {
  const tabs = ['Traits', 'Event History', 'Identities'];
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div>
      <TabList>
        {tabs.map((t, index) => (
          <Tab
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
        <TabPanel selected={activeTab === index} aria-labeled-by={t}>
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

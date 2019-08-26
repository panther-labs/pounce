The Table is one of the non-trivial components due to the sheer amount of
abilities it has. Study the API carefully and you will see that you have the ability to override
almost all things.

You have to provide a `name` and a `key` to each column. The `name` is by
default the label that each column header will show. The `key` is a unique identifier for the
column. If you dont add a `renderCell` prop in a column, the Table attempts to show the value of the
`key` field for a particular item. Thus, whenever you don't want to add a custom rendering (but
just display the text as it is) you should make sure that the column `key` matches the "key" of the
item that this column refers to.

The examples below showcase that functionality.

A table can be simple:

```jsx harmony
import React from 'react';
import Card from 'components/Card';

// as fetched from the API
const items = [
  {
    id: 1,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 2,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 3,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 4,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
];

const columns = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'resourceType',
    header: 'Resource Type',
  },
  {
    key: 'severity',
    header: 'Severity',
  },
  {
    key: 'status',
    header: 'Status',
  },
];

const Example = () => {
  return (
    <Card width="100%">
      <Table items={items} getItemKey={item => item.id} columns={columns} />
    </Card>
  );
};

<Example />;
```

A Table can be sortable through its controlled exposed props:

```jsx harmony
import React from 'react';
import Card from 'components/Card';
import sortBy from 'lodash-es/sortBy';

// as fetched from the API
const items = [
  {
    id: 1,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 2,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 3,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 4,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
];

const columns = [
  {
    sortable: true,
    key: 'name',
    header: 'Name',
  },
  {
    sortable: true,
    key: 'resourceType',
    header: 'Resource Type',
  },
  {
    sortable: true,
    key: 'severity',
    header: 'Severity',
  },
  {
    sortable: true,
    key: 'status',
    header: 'Status',
  },
];

const Example = () => {
  const [sortDir, setSortDir] = React.useState(null);
  const [sortKey, setSortKey] = React.useState(null);

  let sortedItems = sortBy(items, [sortKey]);
  if (sortDir === 'descending') {
    sortedItems = sortedItems.reverse();
  }
  return (
    <Card width="100%">
      <Table
        items={sortedItems}
        sortDir={sortDir}
        sortKey={sortKey}
        getItemKey={item => item.id}
        columns={columns}
        onSort={key => {
          if (sortKey === key) {
            setSortDir(sortDir === 'ascending' ? 'descending' : 'ascending');
          } else {
            setSortDir('ascending');
          }
          setSortKey(key);
        }}
      />
    </Card>
  );
};

<Example />;
```

A table can have custom renderers for both column headers and cells:

```jsx harmony
import React from 'react';
import Card from 'components/Card';
import Text from 'components/Text';
import Chip from 'components/Chip';

// as fetched from the API
const items = [
  {
    id: 1,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 2,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 3,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 4,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
];

const columns = [
  {
    sortable: true,
    key: 'name',
    header: 'Name',
  },
  {
    sortable: true,
    key: 'resourceType',
    header: 'Resource Type',
  },
  {
    sortable: true,
    key: 'severity',
    renderColumnHeader: () => <Chip content="Severity" />,
    renderCell: item => (
      <Text size="medium" color="red300">
        {item.severity}
      </Text>
    ),
  },
  {
    sortable: true,
    key: 'status',
    header: 'Status',
  },
];

const Example = () => {
  return (
    <Card width="100%">
      <Table items={items} getItemKey={item => item.id} columns={columns} />
    </Card>
  );
};

<Example />;
```

A table doesn't have to alternate background colors:

```jsx harmony
import React from 'react';
import Card from 'components/Card';

// as fetched from the API
const items = [
  {
    id: 1,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 2,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 3,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 4,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
];

const columns = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'resourceType',
    header: 'Resource Type',
  },
  {
    key: 'severity',
    header: 'Severity',
  },
  {
    key: 'status',
    header: 'Status',
  },
];

const Example = () => {
  return (
    <Card width="100%">
      <Table alternateBg={false} items={items} getItemKey={item => item.id} columns={columns} />
    </Card>
  );
};

<Example />;
```

A Table doesn't have to render headers:

```jsx harmony
import React from 'react';
import Card from 'components/Card';

// as fetched from the API
const items = [
  {
    id: 1,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 2,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 3,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 4,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
];

const columns = [
  {
    key: 'name',
  },
  {
    key: 'resourceType',
  },
  {
    key: 'severity',
  },
  {
    key: 'status',
  },
];

const Example = () => {
  return (
    <Card width="100%">
      <Table showHeaders={false} items={items} getItemKey={item => item.id} columns={columns} />
    </Card>
  );
};

<Example />;
```

A table can respond to row selections:

```jsx harmony
import React from 'react';
import Card from 'components/Card';
import useSelectableTableRows from 'utils/useSelectableTableRows';

// as fetched from the API
const items = [
  {
    id: 1,
    name: 'AWS S3 Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 2,
    name: 'AWS MFA Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 3,
    name: 'AWS Cloudwatch with SSH enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 4,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
];

const columns = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'resourceType',
    header: 'Resource Type',
  },
  {
    key: 'severity',
    header: 'Severity',
  },
  {
    key: 'status',
    header: 'Status',
  },
];

const Example = () => {
  return (
    <Card width="100%">
      <Table
        items={items}
        getItemKey={item => item.id}
        columns={columns}
        onSelect={item => {
          alert(item.name);
        }}
      />
    </Card>
  );
};

<Example />;
```

A Table can have selectable columns. Just use the `useSelectableTableRows` hook which has
the following signature:

```text
{

  columns: TableProps['columns'];
  items: TableProps['items']
  onSelect: (selectedItems: TableProps['items]) => void;

} => TableProps['columns']
```

Essentially, you pass the existing columns & items along with an `onSelect` callback and you get back
a set of enhanced columns that you can use within the Table:

```jsx harmony
import React from 'react';
import Card from 'components/Card';
import useSelectableTableRows from 'utils/useSelectableTableRows';

// as fetched from the API
const items = [
  {
    id: 1,
    name: 'AWS S3 Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 2,
    name: 'AWS MFA Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 3,
    name: 'AWS Cloudwatch with SSH enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 4,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
];

const columns = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'resourceType',
    header: 'Resource Type',
  },
  {
    key: 'severity',
    header: 'Severity',
  },
  {
    key: 'status',
    header: 'Status',
  },
];

const Example = () => {
  const selectableColumns = useSelectableTableRows({
    columns,
    items,
    onSelect: selectedItems => {
      if (selectedItems.length) {
        alert(`You selected  ${selectedItems.length} items`);
      }
    },
  });

  return (
    <Card width="100%">
      <Table items={items} getItemKey={item => item.id} columns={selectableColumns} />
    </Card>
  );
};

<Example />;
```

A Table can have client side pagination. Just use the `useClientPaginatedTable` hook which has
the following signature:

```text
{

  items: TableProps['items'] // the total items of the table
  pageSizes?: number[] // defaults to [25,50,75,100]
  initialPageSizeIndex?: number // defaults to 0

} => {

  items: TableProps['items'] // the items to show in the current page
  paginationElement: React.Element // a pre-rendered React element that controls pagination

}
```

Essentially, you pass the existing items & optionally some parameters for the pagination and you
get back a subset of the total items to show in the table and a React element that will control
the pagination for you:

```jsx harmony
import React from 'react';
import Card from 'components/Card';
import Box from 'components/Box';
import usePaginatedTable from 'utils/usePaginatedTable';

// as fetched from the API
const items = [
  {
    id: 1,
    name: 'AWS S3 Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 2,
    name: 'AWS MFA Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 3,
    name: 'AWS Cloudwatch with SSH enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
  {
    id: 4,
    name: 'AWS DynamoDB Table Encryption Enabled',
    resourceType: 'AWS.DynamoDB.Table.Snapshot',
    severity: 'CRITICAL',
    status: 'Failing',
    lastModified: '28/04/2019',
  },
];

const columns = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'resourceType',
    header: 'Resource Type',
  },
  {
    key: 'severity',
    header: 'Severity',
  },
  {
    key: 'status',
    header: 'Status',
  },
];

const Example = () => {
  const { startIndex, endIndex, paginationElement } = usePaginatedTable({
    total: items.length,
    pageSizes: [1, 2, 3, 4],
  });

  return (
    <Card width="100%">
      <Table
        items={items.slice(startIndex, endIndex + 1)}
        getItemKey={item => item.id}
        columns={columns}
      />
      <Box my={5}>{paginationElement}</Box>
    </Card>
  );
};

<Example />;
```

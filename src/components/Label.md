Can be used alone:

```jsx harmony
<Label size="large">Hey there</Label>
```

or in conjunction with form elements if you give it the proper HTML attributes:

```jsx harmony
import Box from 'components/Box';
import Flex from 'components/Flex';
import Checkbox from 'components/Checkbox';

const Example = () => {
  const [isFirstChecked, setFirstChecked] = React.useState(false);
  const [isSecondChecked, setSecondChecked] = React.useState(false);
  return (
    <Box>
      <Flex alignItems="center">
        <Label size="small" mr={2} htmlFor="checkbox1">
          Toggle first
        </Label>
        <Checkbox id="checkbox1" checked={isFirstChecked} onChange={setFirstChecked} />
      </Flex>
      <Flex alignItems="center">
        <Label size="small" mr={2} htmlFor="checkbox2">
          Toggle second
        </Label>
        <Checkbox id="checkbox2" checked={isSecondChecked} onChange={setSecondChecked} />
      </Flex>
    </Box>
  );
};

<Example />;
```

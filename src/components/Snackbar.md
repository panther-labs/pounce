In order to use snackbars, you need to get access to the `pushSnackbar` function. To do that, you
need to use React's Context API. You can either render a `SnackbarConsumer` component or simply
import & include a `useSnackbar` call in your functional component.

The context currently exposes an object containing the `pushSnackbar` function which accepts a single
object argument containing the same exact props that you would normally be passing to the
<a href="/#/Alert>Alert</a> component.

```text
{ pushSnackbar: (data: AlertProps) => void }
```

A Snackbar is just a re-export of the Alert in a more digestable fashion with the `discardable`
option enable by default (overridable).

You can push as many snackbars as you want:

```jsx harmony
import { SnackbarProvider, useSnackbar } from 'components/SnackbarContext';
import Button from 'components/Button';

const Example = () => {
  const { pushSnackbar } = useSnackbar();

  return (
    <Button
      size="large"
      variant="primary"
      onClick={() =>
        pushSnackbar({ variant: 'success', title: 'Everything went perfectly', icon: 'check' })
      }
    >
      Click me a lot of times
    </Button>
  );
};

<SnackbarProvider>
  <Example />
</SnackbarProvider>;
```

You can tweak the duration of the snackbar through the `duration` prop:

```jsx harmony
import { SnackbarProvider, useSnackbar } from 'components/SnackbarContext';
import Button from 'components/Button';

const Example = () => {
  const { pushSnackbar } = useSnackbar();

  return (
    <Button
      variant="default"
      onClick={() =>
        pushSnackbar({
          variant: 'error',
          title: 'Everything went wrong',
          icon: 'remove',
          duration: 1000,
        })
      }
    >
      I dissapear faster
    </Button>
  );
};

<SnackbarProvider>
  <Example />
</SnackbarProvider>;
```

import React from 'react';

/** A React hook that tells if the component is mounted. */
const useMounted = () => {
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

export default useMounted;

import { useEffect, useState } from 'react';

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    // Intentionally calling setState synchronously in useEffect —
    // this is a standard hydration guard pattern, not a cascading render concern
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasMounted(true);
  }, []);
  return hasMounted;
};

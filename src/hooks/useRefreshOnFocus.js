import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useRef} from 'react';

export function useRefreshOnFocus(refetch, shouldTrack = true) {
  const enabledRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (enabledRef.current) {
        if (shouldTrack) {
          refetch();
        }
      } else {
        enabledRef.current = true;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldTrack]),
  );
}

// @flow

import {useState, useEffect, useRef} from 'react';

export const useDelayedLoader = (showLoader: boolean) => {
  const [ShowLoader, SetShowLoader] = useState(false);
  const timeout = useRef();

  useEffect(() => {
    if (showLoader) {
      timeout.current = setTimeout(() => SetShowLoader(true), 250);
    } else {
      clearTimeout(timeout.current);
    }
  }, [showLoader]);

  return ShowLoader;
};

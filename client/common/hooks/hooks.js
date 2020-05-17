// @flow

import {useState, useEffect, useRef} from 'react';

export const useDelayedLoader = (showLoader: boolean): boolean => {
  const [ShowLoader, SetShowLoader] = useState(showLoader);
  const timeout = useRef();

  useEffect(() => {
    if (showLoader) {
      timeout.current = setTimeout(() => SetShowLoader(true), 250);
    } else {
      SetShowLoader(showLoader);
      clearTimeout(timeout.current);
    }
  }, [showLoader]);

  return ShowLoader;
};

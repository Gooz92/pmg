export const handleHashParams = <T extends Record<string, string>> (
  initialParams: T,
  onUpdate: (params: T, setParams: (params: Partial<T>) => void) => void
) => {
  const currentParams = { ...initialParams };
  
  let skip = false;

  const setParams = (params: Partial<T>) => {
    Object.assign(currentParams, params);
    // if params changes programmatically assume they are valid and not trigger `handleParamsChange`
    skip = true;
    // This creates additional entry in browser history, so user can use back button to go to prev params
    location.hash = new URLSearchParams(currentParams).toString();
  };

  const handleParamsChange = (hash: string) => {
    const rawParams = new URLSearchParams(hash);

    let needUpdate = false;

    for (const key in currentParams) {
      const rawParamValue = rawParams.get(key) as T[Extract<keyof T, string>] | null;
      if (currentParams[key] !== rawParamValue) {
        needUpdate = true;
        if (rawParamValue !== null) {
          currentParams[key] = rawParamValue;
        }
      }
    }

    if (needUpdate) {
      // if params changed manually in url bar update location.hash without triggering hashchange event listener
      history.replaceState(null, '', '#' + new URLSearchParams(currentParams).toString());
      onUpdate(currentParams, setParams);
    }
  }

  window.addEventListener('hashchange', () => {
    if (skip) {
      skip = false;
      return;
    }
    const rawParams = location.hash.slice(1);
    handleParamsChange(rawParams);
  });

  handleParamsChange(location.hash.slice(1));

  return setParams;
};

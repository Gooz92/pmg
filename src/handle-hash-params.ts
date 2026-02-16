type Config <T extends Record<string, string>> = {
  initialParams: T;
  onUpdate: (params: T, setParams: (params: Partial<T>) => void) => void;
};

export const handleHashParams = <T extends Record<string, string>> (config: Config<T>) => {

  const currentParams = { ...config.initialParams };
  
  let skip = false;

  const setParams = (params: Partial<T>) => {
    Object.assign(currentParams, params);
    skip = true;
    location.hash = '#' + new URLSearchParams(currentParams).toString();
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
      history.replaceState(null, '', '#' + new URLSearchParams(currentParams).toString());
      config.onUpdate(currentParams, setParams);
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

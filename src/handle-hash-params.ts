type Config <T extends Record<string, string>> = {
  initialParams: T;
  onInit: (params: T, setParam:  (param: keyof T) => void) => void;
  onUpdate: (params: T) => void;
  onError: (errorMessage: string) => void;
};

export const handleHashParams = <T extends Record<string, string>> (config: Config<T>) => {

  const setParam = (param: keyof T) => {

  };

  const listen = () => {
    window.addEventListener('hashchange', () => {
      const rawParams = location.hash.slice(1);
      const params = Object.fromEntries(new URLSearchParams(rawParams)) as T; // TODO
      config.onUpdate(params);
    });
  };

  if (location.hash === '') {
    location.hash = new URLSearchParams(config.initialParams).toString();
    config.onInit(config.initialParams, () => {});
    listen();
    return;
  }

  listen();

  const rawParams = Object.fromEntries(new URLSearchParams(location.hash.slice(1))) as T // TODO

  config.onInit(rawParams, setParam);
};

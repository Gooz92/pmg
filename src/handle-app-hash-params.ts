import { app } from "./app";
import { handleHashParams } from "./handle-hash-params";
import { formatSeed, getDefaultSeed } from "./seed-utils";

let appComponent: ReturnType<typeof app> | null = null;

const initialParams = {
  seed: formatSeed(getDefaultSeed()),
  roughness: String(50)
};

export type HashParams = typeof initialParams;

const mount = (hashParams: HashParams) => {
  appComponent = app(hashParams);
  document.body.appendChild(appComponent.element);
};

export const hadleAppHashParams = () => handleHashParams({
  initialParams,
  onUpdate: (params) => {
    if (appComponent === null) {
      document.body.innerHTML = '';
      mount(params);
    } else {
      appComponent.update(params);
    }
  },
  onInit: (params) => {
    mount(params);
  },
  onError: errorMessage => {
    appComponent = null;
    document.body.innerHTML = `<h1 class="error">${errorMessage}</h1>`;
  }
});

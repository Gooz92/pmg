import { app } from "./app";
import { handleHashParams } from "../handle-hash-params";
import { formatSeed, getDefaultSeed, isRawSeedValid } from "../seed-utils";
import { errorPage } from "./error-page";

let appComponent: ReturnType<typeof app> | null = null;

const appContainer = document.getElementById('app-container')!;

const initialParams = {
  seed: formatSeed(getDefaultSeed()),
  roughness: String(50)
};

export type HashParams = typeof initialParams;

const mount = (hashParams: HashParams, setParams: (params: Partial<HashParams>) => void) => {
  appComponent = app(hashParams, setParams);
  appContainer.appendChild(appComponent.element);
};

const isValidRoughness = (roughness: string) =>
  /^[1-9]\d{0,2}$/.test(roughness);

const validateParams = (params: HashParams) => {
  const errors: string[] = [];

  if (!isRawSeedValid(params.seed)) {
    errors.push(`Invalid seed: '${params.seed}'`);
  }

  if (!isValidRoughness(params.roughness)) {
    errors.push(`Invalid roughness: '${params.roughness}'`);
  }

  return errors;
};

export const hadleAppHashParams = () => {
  handleHashParams(
    initialParams,
    (params, setParams) => {
      const errors = validateParams(params);
      if (errors.length > 0) {
        appComponent = null;
        appContainer.innerHTML = ''
        appContainer.appendChild(errorPage(errors));
        return;
      }

      if (appComponent === null) {
        appContainer.innerHTML = '';
        mount(params, setParams);
      } else {
        appComponent.update(params);
      }
    }
  );
};

import $ from "@gooz92/ce";

import { app } from "./app";
import { handleHashParams } from "./handle-hash-params";
import { formatSeed, getDefaultSeed, isRawSeedValid } from "./seed-utils";

let appComponent: ReturnType<typeof app> | null = null;

const initialParams = {
  seed: formatSeed(getDefaultSeed()),
  roughness: String(50)
};

export type HashParams = typeof initialParams;

const mount = (hashParams: HashParams, setParams: (params: Partial<HashParams>) => void) => {
  appComponent = app(hashParams, setParams);
  document.body.appendChild(appComponent.element);
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

const errorPage = (errors: string[]) =>
  $('div', [
    $('h1', 'Error with parsing params'),
    $('ul', errors.map(error => $('li', error)))
  ]);

export const hadleAppHashParams = () => {
  handleHashParams({
    initialParams,
    onUpdate: (params, setParams) => {
      const errors = validateParams(params);
      if (errors.length > 0) {
        document.body.innerHTML = ''
        document.body.appendChild(errorPage(errors));
        return;
      }

      if (appComponent === null) {
        document.body.innerHTML = '';
        mount(params, setParams);
      } else {
        appComponent.update(params);
      }
    }
  });
};

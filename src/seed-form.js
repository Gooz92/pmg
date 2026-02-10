import $ from "@gooz92/ce";

import { getDefaultSeed, SEED_PATTERN, formatSeed } from "./seed-utils";

export const seedForm = (onSubmit) => {

  let initialSeed;

  const input = $('input', {
    name: 'seed',
    pattern: SEED_PATTERN.source,
    required: true,
    oninput: () => {
      submitButton.disabled = input.value === initialSeed || !input.validity.valid
    }
  });

  const handleSubmit = () => {
    initialSeed = input.value;
    onSubmit(input.value);
    submitButton.disabled = true;
  };

  const refreshButton = $('button', '↻', {
    type: 'button',
    onclick: () => {
      input.value = formatSeed(getDefaultSeed());
      handleSubmit(input.value);
    }
  });

  const submitButton = $('button', 'OK', { disabled: true });

  const form = $('form', {
    noValidate: true,
    onsubmit: e => {
      e.preventDefault();
      if (form.checkValidity()) {
        handleSubmit(input.value);
      }
    }
  }, [ input, refreshButton, submitButton ]);

  return {
    element: form,
    update: seed => {
      initialSeed = seed;
      input.value = seed;
    }
  }
};

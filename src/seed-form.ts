import $ from "@gooz92/ce";

import { getDefaultSeed, SEED_PATTERN, formatSeed } from "./seed-utils";

export const seedForm = (initialSeed: string, onSubmit: (seed: string) => void) => {

  const input = $('input', {
    value: initialSeed,
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
      handleSubmit();
    }
  });

  const submitButton = $('button', 'OK', { disabled: true });

  const form = $('form', {
    noValidate: true,
    onsubmit: (e: Event) => {
      e.preventDefault();
      if (form.checkValidity()) {
        handleSubmit();
      }
    }
  }, [ input, refreshButton, submitButton ]);

  return {
    element: form,
    update: (seed: string) => {
      initialSeed = seed;
      input.value = seed;
    }
  }
};

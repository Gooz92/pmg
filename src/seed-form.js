import { getDefaultSeed, SEED_PATTERN, formatSeed } from "./seed-utils";

export const seedForm = (onSubmit) => {
  const form = document.createElement('form');
  form.noValidate = true;

  let initialSeed;

  const handleSubmit = () => {
    initialSeed = input.value;
    onSubmit(input.value);
    submitButton.disabled = true;
  }

  form.onsubmit = e => {
    e.preventDefault();
    if (form.checkValidity()) {
      handleSubmit(input.value);
    }
  };

  const input = document.createElement('input');
  input.pattern = SEED_PATTERN.source;
  input.required = true;

  input.oninput = () => {
    submitButton.disabled = input.value === initialSeed || !input.validity.valid
  };

  const refreshButton = document.createElement('button');
  refreshButton.type = 'button';

  refreshButton.onclick = () => {
    input.value = formatSeed(getDefaultSeed());
    handleSubmit(input.value);
  };
  
  refreshButton.innerText = '↻';

  const submitButton = document.createElement('button');
  submitButton.innerText = 'OK';
  submitButton.disabled = true;

  form.append(input, refreshButton, submitButton);

  return {
    element: form,
    update: seed => {
      initialSeed = seed;
      input.value = seed;
    }
  }
};

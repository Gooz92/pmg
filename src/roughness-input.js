export const roughnessInput = (defaultValue, onChange) => {
  const input = document.createElement('input');
  input.min = 0;
  input.max = 100;

  input.type = 'range';

  input.onchange = e => {
    console.log(e.target.value);
  };

  return input;
};

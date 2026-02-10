import $ from "@gooz92/ce";

export const roughnessInput = (
  initialValue: number,
  onChange: (value: number) => void
) => {
  const input =  $('input', {
    id: 'roughtness',
    value: initialValue,
    type: 'range',
    oninput: () => {
      onChange(+input.value);
    }
  });

  const element = $('div', [
    $('label', 'Roughness: ', { htmlFor: 'roughtness'}),
    input
  ]);

  return {
    element,
    update: (value: number) => {
      input.value = String(value);
    }
  };
};

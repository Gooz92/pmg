import $ from "@gooz92/ce";

type Props = {
  value: number,
  onInput: (value: number) => void;
  onChange: (value: number) => void;
};

export const roughnessInput = ({ value, onInput, onChange }: Props) => {
  const input =  $('input', {
    id: 'roughtness',
    value,
    type: 'range',
    oninput: () => {
      onInput(+input.value);
    },
    onchange: () => {
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

import $ from "@gooz92/ce";

export const errorPage = (errors: string[]) =>
  $('div', { className: 'error' }, [
    $('h1', 'Error with parsing params'),
    $('ul', errors.map(error => $('li', error)))
  ]);

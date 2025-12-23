export const generateArray = (length, getItem) => {
  const array = [];

  for (let i = 0; i < length; i++) {
    const item = getItem(i);
    array.push(item);
  }

  return array;
};

// min <= rnd <= max
export const getRandomInt = (min, max) =>
  Math.floor((max - min + 1) * Math.random()) + min;

export const getZero = () => 0;

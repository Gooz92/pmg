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

const format2d = n => String(n).padStart(2, '0');

export const formatDate = date =>
  [
    date.getFullYear(),
    format2d(date.getMonth() + 1),
    format2d(date.getDate())
  ].join('-');

export const formatCurrentDate = () => formatDate(new Date());

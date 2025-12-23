const SIDE = 513;
const SIZE = SIDE * SIDE;
const ITERATIONS = 9;

const generateArray = (length, getItem) => {
  const array = [];

  for (let i = 0; i < length; i++) {
    const item = getItem(i);
    array.push(item);
  }

  return array;
};

// min <= rnd <= max
const getRandomInt = (min, max) =>
  Math.floor((max - min + 1) * Math.random()) + min;

const getRandomHeight = () => getRandomInt(0, 1024);

const getZero = () => 0;

const getDiamondOffset = (side, i) => (side - 1) / 2 ** i;

const getIndex = (x, y, width) => x + y * width;

const diamondStep = (heights, i) => {
  const offset = getDiamondOffset(SIDE, i);
  const halfOffset = offset / 2;
  const maxXY = SIDE - 1;

  for (let x0 = 0; x0 < maxXY; x0 += offset) {
    const x1 = x0 + offset;
    for (let y0 = 0; y0 < maxXY; y0 += offset) {
      const y1 = y0 + offset;
      const i0 = getIndex(x0, y0, SIDE);
      const i1 = getIndex(x1, y0, SIDE);
      const i2 = getIndex(x0, y1, SIDE);
      const i3 = getIndex(x1, y1, SIDE);
  
      const ci = getIndex(x0 + halfOffset, y0 + halfOffset, SIDE);
      heights[ci] = (heights[i0] + heights[i1] + heights[i2] + heights[i3]) / 4;
    }
  }
};

const getSquareNeighbors = (x, y, offset) => {
  const left = x - offset;

  if (left < 0) {
    return [ getIndex(x + offset, y, SIDE), getIndex(x, y + offset, SIDE), getIndex(x, y - offset, SIDE) ];
  }

  const right = x + offset;
  if (right >= SIDE) {
    return [ getIndex(left, y, SIDE), getIndex(x, y + offset, SIDE), getIndex(x, y - offset, SIDE) ];
  }

  const top = y - offset;
  if (top < 0) {
    return [ getIndex(left, y, SIDE), getIndex(right, y, SIDE), getIndex(x, y + offset, SIDE) ];
  }

  const bottom = y + offset;
  if (bottom >= SIDE) {
    return [ getIndex(left, y, SIDE), getIndex(x, top, SIDE), getIndex(right, y, SIDE) ];
  }

  return [ getIndex(left, y, SIDE), getIndex(x, top, SIDE), getIndex(right, y, SIDE), getIndex(x, bottom, SIDE) ];
};

const squareStep = (heights, i) => {
  const offset = getDiamondOffset(SIDE, i);
  const halfOffset = offset / 2;

  for (let y = 0; y < SIDE; y += halfOffset) {
    for (let x = y % offset === 0 ? halfOffset : 0; x < SIDE; x += offset) {
      const ni = getSquareNeighbors(x, y, halfOffset);
      const ci = getIndex(x, y, SIDE);

      const v = ni.reduce((h, i) => h + heights[i], 0) / ni.length;
      heights[ci] = v;
    }
  }

  return heights;
};

const generateMap = () => {
  const heights = generateArray(SIZE, getZero);
  heights[0] = 1;
  heights[SIDE - 1] = 3;
  heights[SIZE - SIDE] = 3;
  heights[SIZE - 1] = 1;

  for (let i = 0; i < ITERATIONS; i++) {
    diamondStep(heights, i);
    squareStep(heights, i);
  }

  return heights;
};

const findMinMax = (items) => {
  let max = items[0];
  let min = items[0];

  for (let i = 1; i < items.length; i++) {
    if (items[i] > max) {
      max = items[i];
    } else if (items[i] < min) {
      min = items[i];
    }
  }

  return [ max, min ];
}

const normalize = values => {
  const [ min, max ] = findMinMax(values);
  for (let i = 0; i < values.length; i++) {
    values[i] = Math.floor(256 * (values[i] - min) / (max - min));
  }
  return values;
}

console.time('t');
const heights = normalize(generateMap());
console.timeEnd('t');

const ctx = canv.getContext('2d');

const imageData = ctx.createImageData(canv.width, canv.height);

for (let i = 0; i < SIZE; i++) {
  const i0 = i * 4;
  imageData.data[i0] = 0;
  imageData.data[i0 + 1] = 0;
  imageData.data[i0 + 2] = 0;
  imageData.data[i0 + 3] = heights[i];
}


ctx.putImageData(imageData, 0, 0);

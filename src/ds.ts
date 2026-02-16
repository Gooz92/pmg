import { generateArray, getZero } from './utils';

const SIDE = 513;
const ITERATIONS = 9;

const getStepOffset = (side: number, i: number) => (side - 1) / 2 ** i;

const getIndex = (x: number, y: number, width: number) => x + y * width;

const getSquareNeighbors = (x: number, y: number, offset: number) => {
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

const squareStep = (heights: number[], offset: number, getHeightDelta: () => number) => {
  const halfOffset = offset / 2;

  for (let y = 0; y < SIDE; y += halfOffset) {
    for (let x = y % offset === 0 ? halfOffset : 0; x < SIDE; x += offset) {
      const ni = getSquareNeighbors(x, y, halfOffset);
      const ci = getIndex(x, y, SIDE);

      const v = ni.reduce((h, i) => h + heights[i], 0) / ni.length;
      heights[ci] = v + getHeightDelta();
    }
  }

  return heights;
};

const diamondStep = (heights: number[], offset: number, getHeightDelta: () => number) => {
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
      const v = (heights[i0] + heights[i1] + heights[i2] + heights[i3]) / 4;
      heights[ci] = v + getHeightDelta();
    }
  }
};

const getInitialHeights = (side: number, getRandom: () => number) => {
  const size = side * side;
  const heights: number[] = generateArray(size, getZero);

  heights[0] = getRandom();
  heights[side - 1] = getRandom();
  heights[size - side] = getRandom();
  heights[size - 1] = getRandom();

  return heights;
};

const generateMap = (getRandom: () => number, roughness: number) => {
  const heights = getInitialHeights(SIDE, getRandom);

  const getHeightIterationHeightDelta = iteration =>
    (roughness * (2 * getRandom() - 1)) ** (iteration + 1);

  for (let i = 0; i < ITERATIONS; i++) {
    const getHeightDelta = () => getHeightIterationHeightDelta(i);
    const offset = getStepOffset(SIDE, i);
    diamondStep(heights, offset, getHeightDelta);
    squareStep(heights, offset, getHeightDelta);
  }

  return heights;
};

const findMinMax = (items: number[]) => {
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

const normalize = (values: number[]) => {
  const [ min, max ] = findMinMax(values);
  for (let i = 0; i < values.length; i++) {
    values[i] = Math.floor(256 * (values[i] - min) / (max - min));
  }
  return values;
};

export const generateGrayHeightMap = (getRandom: () => number, roughness: number) =>
  normalize(generateMap(getRandom, roughness));

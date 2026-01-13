import { generateGrayHeightMap } from './ds.js';
import { createRandom, MAX } from './random.js';
import { formatSeed, getRandomInt } from './utils.js';

const ctx = canv.getContext('2d');

const parseSeed = rawSeed => {
  return parseInt(rawSeed, 16);
};

const getDefaultSeed = () => getRandomInt(0, MAX - 1);

const draw = (ctx, grayMap) => {
  const { width, height } = ctx.canvas;
  const imageData = ctx.createImageData(width, height);

  for (let i = 0; i < grayMap.length; i++) {
    const i0 = i * 4;
    imageData.data[i0] = 0;
    imageData.data[i0 + 1] = 0;
    imageData.data[i0 + 2] = 0;
    imageData.data[i0 + 3] = grayMap[i];
  }

  ctx.putImageData(imageData, 0, 0);
};

const onSeed = listener => {
  if (!location.hash) {
    const seed = getDefaultSeed();
    location.hash = formatSeed(seed);
    listener(seed);
  } else {
    listener(parseSeed(location.hash.slice(1)));
  }

  window.addEventListener('hashchange', () => {
    listener(parseSeed(location.hash.slice(1)));
  });
};

onSeed(seed => {
  const random = createRandom(seed);
  draw(ctx, generateGrayHeightMap(random));
});

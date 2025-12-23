import { generateGrayHeightMap } from './ds.js';

const ctx = canv.getContext('2d');

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

draw(ctx, generateGrayHeightMap());

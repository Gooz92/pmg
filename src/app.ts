import $ from '@gooz92/ce';

import { generateGrayHeightMap } from './ds';
import { createRandom } from './random';
import { seedForm } from './seed-form';
import { formatSeed } from './seed-utils';
import { roughnessInput } from './roughnessInput';
import { HashParams } from './handle-app-hash-params';

const parseSeed = (rawSeed: string) =>
  parseInt(rawSeed, 16);

const renderGrayscale = (ctx: CanvasRenderingContext2D, grayscale: number[]) => {
  const { width, height } = ctx.canvas;
  const imageData = ctx.createImageData(width, height);

  for (let i = 0; i < grayscale.length; i++) {
    const i0 = i * 4;
    const value = grayscale[i];
    imageData.data[i0] = value;
    imageData.data[i0 + 1] = value;
    imageData.data[i0 + 2] = value;
    imageData.data[i0 + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
};

const mainPageRenderer = () => {
  const canvas = $('canvas', { width: 513, height: 513 });
  const ctx = canvas.getContext('2d')!;

  const seedFormComponent = seedForm(seed => {
    location.hash = seed;
  });

  const roughnessInputComponent = roughnessInput(50, () => {});

  return (seed: number) => {
    if (!canvas.isConnected) {
      document.body.append(
        canvas,
        seedFormComponent.element,
        roughnessInputComponent.element
      );
    }
    const random = createRandom(seed);
    renderGrayscale(ctx, generateGrayHeightMap(random));
    seedFormComponent.update(formatSeed(seed));
    roughnessInputComponent.update(50);
  };
};

const drawHeightMap = (ctx: CanvasRenderingContext2D, rawSeed: string) => {
  const random = createRandom(parseSeed(rawSeed));
  renderGrayscale(ctx, generateGrayHeightMap(random));
}

export const app = (params: HashParams) => {
  const canvas = $('canvas', { width: 513, height: 513 });
  const ctx = canvas.getContext('2d')!;
  const seedFormComponent = 
  drawHeightMap(ctx, params.seed);

  const element = $('div', [ canvas ]);

  return {
    element,
    update: (params: HashParams) => {
      drawHeightMap(ctx, params.seed);
    }
  };
};

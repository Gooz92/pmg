import $ from '@gooz92/ce';

import { generateGrayHeightMap } from '../ds';
import { createRandom } from '../random';
import { seedForm } from '../components/seed-form';
import { roughnessInput } from '../components/roughness-input';
import { HashParams } from './handle-app-hash-params';
import { parseSeed } from '../seed-utils';

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

const drawHeightMap = (ctx: CanvasRenderingContext2D, rawSeed: string, roughness: number) => {
  const random = createRandom(parseSeed(rawSeed));
  renderGrayscale(ctx, generateGrayHeightMap(random, roughness / 100));
};

export const app = (params: HashParams, setParams: (params: Partial<HashParams>) => void) => {
  const canvas = $('canvas', { id: 'canv', width: 513, height: 513 });
  const ctx = canvas.getContext('2d')!;

  const seedFormComponent = seedForm(params.seed, seed => {
    drawHeightMap(ctx, seed, +params.roughness);
    setParams({ seed });
  });

  const roughnessInputComponent = roughnessInput({
    value: +params.roughness,
    onInput: roughness => {
      drawHeightMap(ctx, params.seed, roughness);
    },
    onChange: roughness => {
      setParams({ roughness: String(roughness) });
    }
  });

  drawHeightMap(ctx, params.seed, +params.roughness);

  const element = $('div', [
    canvas,
    seedFormComponent.element,
    roughnessInputComponent.element
  ]);

  return {
    element,
    update: (params: HashParams) => {
      drawHeightMap(ctx, params.seed, +params.roughness);
      seedFormComponent.update(params.seed);
      roughnessInputComponent.update(+params.roughness);
    }
  };
};

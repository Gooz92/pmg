import $ from '@gooz92/ce';

import { generateGrayHeightMap } from './ds.js';
import { createRandom } from './random.js';
import { seedForm } from './seed-form.js';
import { getDefaultSeed, isRawSeedValid, formatSeed } from './seed-utils.js';

const parseSeed = rawSeed => {
  return parseInt(rawSeed, 16);
};

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
  let hasError = false;

  const handleSeedChanged = () => {
    const rawSeed = location.hash.slice(1);

    if (!isRawSeedValid(rawSeed)) {
      document.body.innerHTML = `<h1 class="error">Invalid seed: '${rawSeed}'</h1>`;
      hasError = true;
    } else {
      if (hasError) { 
        hasError = false;
        document.body.innerHTML = '';
      }
      listener(parseSeed(rawSeed));
    }
  };

  if (!location.hash || location.hash === '#') {
    const seed = getDefaultSeed();
    location.hash = formatSeed(seed);
    listener(seed);
  } else {
    handleSeedChanged();
  }

  window.addEventListener('hashchange', () => {
    handleSeedChanged();
  });
};

const mainPageRenderer = () => {
  const canvas = $('canvas', { width: 513, height: 513 });
  const ctx = canvas.getContext('2d');

  const seedFormComponent = seedForm(seed => {
    location.hash = seed;
  });

  return seed => {
    if (!canvas.isConnected) {
      document.body.append(canvas, seedFormComponent.element);
    }
    const random = createRandom(seed);
    draw(ctx, generateGrayHeightMap(random));
    seedFormComponent.update(formatSeed(seed));
  };
};

const renderMainPage = mainPageRenderer();

onSeed(seed => {
  renderMainPage(seed);
});

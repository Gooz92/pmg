import { cleanPlugin } from './clean.js';
import { writePlugin } from './write-plugin.js';

import indexTemplate from '../src/index.template.js';

const outdir = 'dist';

export const getConfig = ({ dev, versionInfo }) => ({
  entryPoints: [ 'src/index.ts' ],
  bundle: true,
  outfile: `${outdir}/app.js`,
  target: 'es2020',
  minify: !dev,
  sourcemap: dev,
  plugins: [
    cleanPlugin(outdir),
    writePlugin(indexTemplate({ versionInfo }), 'dist/index.html')
  ]
});

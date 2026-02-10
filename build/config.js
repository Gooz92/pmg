import { cleanPlugin } from './clean.js';
import { writePlugin } from './write-plugin.js';
import indexTemplate from '../src/index.template.js';

export const getConfig = ({ dev, versionInfo }) => ({
  entryPoints: [ 'src/app.ts' ],
  bundle: true,
  outdir: 'dist',
  target: 'es2020',
  minify: !dev,
  sourcemap: dev,
  plugins: [
    cleanPlugin(),
    writePlugin(indexTemplate({ versionInfo }), 'dist/index.html')
  ]
});

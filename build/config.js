import { cleanPlugin } from './clean.js';
import { copyPlugin } from './copy.js';

export const getConfig = ({ dev }) => ({
  entryPoints: [ 'src/app.js' ],
  bundle: true,
  outdir: 'dist',
  target: 'es2020',
  minify: !dev,
  sourcemap: dev,
  plugins: [
    cleanPlugin(),
    copyPlugin(
      [ 'src/index.html', 'dist/index.html' ]
    )
  ]
});

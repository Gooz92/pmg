import { build } from 'esbuild';
import { getConfig } from './config.js';

const IS_DEV = process.argv.includes('--dev');

await build(getConfig({ dev: IS_DEV }));

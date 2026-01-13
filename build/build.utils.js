import { readFileSync } from 'fs';
import { formatCurrentDate } from '../src/utils.js'; // ???

const readVersion = () => {
  const { version } = JSON.parse(readFileSync('package.json').toString());
  return 'v' + version;
};

export const getVersionInfo = () => `${readVersion()} (${formatCurrentDate()})`;

import { copyFile } from 'fs';

const logErr = (err) => {
  if (err) {
    console.log(err);
  }
};

export const copyPlugin = (...files) => ({
  name: 'copy',
  setup: (build) => {
    build.onEnd(() => {
      for (const [ from, to ] of files) {
        copyFile(from, to, logErr);
      }
    });
  }
});

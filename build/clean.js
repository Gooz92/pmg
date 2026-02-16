import { rmSync } from 'fs';

export const cleanPlugin = (dir) => ({
  name: 'clean',
  setup: (build) => {
    const { outdir = dir } = build.initialOptions;

    if (!outdir) {
      return;
    }

    build.onStart(() => {
      rmSync(outdir, { recursive: true, force: true });
    });
  }
});

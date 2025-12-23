import { rmSync } from 'fs';

export const cleanPlugin = () => ({
  name: 'clean',
  setup: (build) => {
    const { outdir } = build.initialOptions;

    if (!outdir) {
      return;
    }

    build.onStart(() => {
      rmSync(outdir, { recursive: true, force: true });
    });
  }
});

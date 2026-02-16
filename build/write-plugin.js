import { writeFileSync } from 'fs';

export const writePlugin = (content, dest) => ({
  name: 'write',
  setup: build => {
    build.onEnd(() => {
      writeFileSync(dest, content);
    });
  }
});

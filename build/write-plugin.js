import { writeFileSync } from 'fs';

export const writePlugin = (content, dest) => ({
  name: 'processTemplate',
  setup: build => {
    build.onEnd(() => {
      writeFileSync(dest, content);
    });
  }
});

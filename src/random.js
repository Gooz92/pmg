
const MAX = 4294967296; // 2 ** 32;

// mulberry32 implementation
// 0 <= r < 2 ** 32
export const createRandom = seed => () => {
  let t = seed += 0x6D2B79F5;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / MAX;
};

import { MAX } from "./random";
import { getRandomInt } from "./utils";

export const getDefaultSeed = () => getRandomInt(0, MAX - 1);

export const SEED_PATTERN = /^[\da-f]{8}$/;

export const isRawSeedValid = (rawSeed: string) => SEED_PATTERN.test(rawSeed);

export const formatSeed = (seed: number) => seed.toString(16).padStart(8, '0');

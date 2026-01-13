import { MAX } from "./random.js";
import { getRandomInt } from "./utils";

export const getDefaultSeed = () => getRandomInt(0, MAX - 1);

export const SEED_PATTERN = /^[\da-f]{8}$/;

export const isRawSeedValid = rawSeed => SEED_PATTERN.test(rawSeed);

export const formatSeed = rawSeed => rawSeed.toString(16).padStart(8, '0');

import { POP_TYPES } from './constants';

const numbers = (range) => {
  return Array.from({ length: range * 2 + 1 }, (_, index) => index - range);
};

const alphabet = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(i + 65)
);

const numerals = [
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
  'XI',
  'XII',
];

export const sortValues = (sortType, values) => {
  switch (sortType) {
    case POP_TYPES.NUMBER:
      return values.sort((a, b) => a - b);
    case POP_TYPES.ALPHABET:
      return values.sort();
    case POP_TYPES.NUMERAL:
      return values.sort((a, b) => numerals.indexOf(a) - numerals.indexOf(b));
    default:
      return values;
  }
};

export const generateValues = (sortType, range) => {
  switch (sortType) {
    case POP_TYPES.NUMBER:
      return numbers(range);
    case POP_TYPES.ALPHABET:
      return alphabet;
    case POP_TYPES.NUMERAL:
      return numerals;
    default:
      return [];
  }
};

export const getPopType = () => {
  const popTypes = Object.values(POP_TYPES);
  return popTypes[Math.floor(Math.random() * popTypes.length)];
};

import { v4 as uuidv4 } from 'uuid';

export const uuid = () => uuidv4();

export const formatNumUnit = (value: number) => {
  const cardinalityNum = 10000;
  const units = ['', '万', '亿', '万亿'];

  if (value < cardinalityNum) {
    return value;
  }
  const logarithm = Math.floor(Math.log(value) / Math.log(cardinalityNum));
  return `${(value / Math.pow(cardinalityNum, logarithm)).toFixed(0)}${
    units[logarithm]
  }`;
};

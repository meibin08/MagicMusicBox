/**
 * Created by lvs on 2019/02/9.
 */
// import format from './format';
import { prefixNames } from 'framework-utils';

export const Serialize = (data: object, firstCon = '&', secondCon = '=') => {
  return Object.keys(data).reduce((prev, key) => {
    const value = data[key];
    if (value != null) {
      prev += (prev && firstCon) + key + (String(value) && secondCon + value);
    }
    return prev;
  }, '');
};
interface Dictionary<T> {
  [key: string]: T;
}
export const Deserialize = (value: string, firstCon = '&', secondCon = '=') => {
  const result: Dictionary<string> = {};
  return value
    .replace('?', '')
    .split(firstCon)
    .reduce((prev, elem) => {
      const index = elem.indexOf(secondCon);
      if (index === -1) {
        prev[elem] = '';
      } else {
        prev[elem.slice(0, index)] = elem.slice(index + 1);
      }
      return prev;
    }, result);
};

export function clsPrefix(prefixCls: string) {
  return (...classNames: string[]) => {
    const prefixClsSplicer = classNames ? `${prefixCls}__` : prefixCls;
    return prefixNames(prefixClsSplicer, ...classNames) || prefixCls;
  };
}

export const AVtoJSON = (data) => data.toJSON();

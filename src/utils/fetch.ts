/*
 * @authors :Bin Mei
 * @date    :2019-03-20
 * @description：Fetch请求处理
 */
import promise from 'es6-promise';
import isomorphicFetch from 'isomorphic-fetch';
import { StaticToast, StaticLoading } from '@cube-src/components/common';
import { Serialize } from './serialization';
// import { Loading } from 'zarm';
import storage from './storage';

promise.polyfill();
declare const window: any;
// declare const wx: any;

interface Options {
  url: string;
  type: string;
  data?: object;
  action?: any;
  isloading?: boolean;
  headers?: object;
  error?: any;
  success?: any;
  [propName: string]: any;
  needLogin?: boolean;
}

export const fetch = (options: Options) => {
  const { url = '', type, data, isloading = true } = options;
  isloading && StaticLoading.show();
  // const { url = '', type, data } = options;
  const opts: any = {
    credentials: 'include',
    url: url,
    headers: {
      token: storage.get('token'),
      ...options.headers,
    },
  };
  if (type.toUpperCase() === 'GET') {
    opts.method = 'GET';
    if (typeof data === 'string') {
      opts.url = `${url}?${data}`;
    } else if (typeof data === 'object') {
      opts.url = `${url}?${Serialize(data)}`;
    }
  }
  if (type.toUpperCase() === 'POST') {
    opts.method = 'POST';
    opts.body = JSON.stringify(data || {});
    opts.headers = {
      ...opts.headers,
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }
  if (type.toUpperCase() === 'UPLOAD') {
    opts.method = 'POST';
    opts.body = data;
  }

  return isomorphicFetch(opts.url, opts)
    .then((req) => toJson(req, options))
    .then((res) => resHandler(res, options))
    .catch(() => {});
};

function toJson(resp: any, options: any) {
  if (resp.status >= 400) {
    return errorHandler(resp, options, resp.status);
  }
  return resp.json();
}

export async function fetchJson(options: Options) {
  return fetch(options);
}

// 请求成功处理
function resHandler(res: any, options: any) {
  const { isloading = true } = options;
  isloading && StaticLoading.hide();
  if (res.code === '20002') {
    const { pathname } = window.location;
    window.location.replace(pathname);

    return Promise.resolve({ code: 9999 });
  }
  if (res.status && res.status !== 200) {
    return errorHandler(res.error, options, res.status);
  }
  if (!res || res.code >= 20000) {
    options.error && options.error(res);
    StaticToast.error(res.message || '服务异常');
    return Promise.resolve(res);
  }
  options.success && options.success(res);
  return Promise.resolve(res);
}

// 异常处理
function errorHandler(error: any, options: any, status?: any) {
  const { isloading = true } = options;
  isloading && StaticLoading.hide();
  options.error && options.error(error);
  StaticToast.error(`网络异常，请稍后重试${status ? `(${status})` : ''}`);
  return Promise.reject(error);
}

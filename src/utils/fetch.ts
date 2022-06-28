/*
 * @authors :su south
 * @date    :2022-06-22
 * @description：Fetch请求处理
 */
import promise from 'es6-promise';
import isomorphicFetch from 'isomorphic-fetch';
// import { StaticToast, StaticLoading } from '@/src/components/common';
import { Serialize } from './serialization';
// import { Loading } from 'zarm';

promise.polyfill();
declare const window: any;

interface Options {
  url: string;
  type: string;
  data?: object;
  action?: any;
  needLoading?: boolean;
  headers?: object;
  error?: any;
  success?: any;
  [propName: string]: any;
  needLogin?: boolean;
}

export const fetch = (options: Options) => {
  const { url = '', type, data, needLoading = true } = options;
  // isloading && StaticLoading.show();
  // const { url = '', type, data } = options;
  const params = { ...data, realIP: '211.161.244.70' };
  const opts: any = {
    url,
    credentials: 'include',
    headers: {
      // Host: "music.163.com",
      ...options.headers,
      Accept: 'application/json',
    },
  };
  if (type.toUpperCase() === 'GET') {
    opts.method = 'GET';
    if (typeof data === 'string') {
      opts.url = `${url}?${params}`;
    } else if (typeof data === 'object') {
      opts.url = `${url}?${Serialize(params)}`;
    }
  }
  if (type.toUpperCase() === 'POST') {
    opts.method = 'POST';
    opts.body = JSON.stringify(params || {});
    opts.headers = {
      ...opts.headers,
    };
  }
  if (type.toUpperCase() === 'UPLOAD') {
    opts.method = 'POST';
    opts.body = data;
  }

  return isomorphicFetch(`https://magic-music-api.vercel.app${opts.url}`, opts)
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
  const { needLoading = true } = options;
  // isloading && StaticLoading.hide();
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
    // StaticToast.error(res.message || '服务异常');
    return Promise.resolve(res);
  }
  options.success && options.success(res);
  return Promise.resolve(res);
}

// 异常处理
function errorHandler(error: any, options: any, status?: any) {
  const { needLoading = true } = options;
  // isloading && StaticLoading.hide();
  options.error && options.error(error);
  // StaticToast.error(`网络异常，请稍后重试${status ? `(${status})` : ''}`);
  return error;
}

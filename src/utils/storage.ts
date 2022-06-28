function isJSON(str: any) {
  if (typeof str == 'string') {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
}
export class Storage {
  public props: { source?: any };
  public source: WindowLocalStorage;
  constructor(props?: { source?: any }) {
    this.props = props || {};
    this.source = this.props.source || (window && window.localStorage);
  }

  public get<T>(key: string): T | null {
    const data = this.source,
      timeout: number = data[`${key}__expires__`] || 0;
    if (timeout == 0) {
      const value =
        data[key] && isJSON(data[key]) ? JSON.parse(data[key]) : data[key];
      return value;
    }
    // 过期失效
    if (new Date().getTime() >= timeout) {
      this.remove(key);
      return undefined;
    }

    const value =
      data[key] && isJSON(data[key]) ? JSON.parse(data[key]) : data[key];
    return value;
  }

  // 设置缓存
  // timeout：过期时间（分钟）
  public set(key: string, value: object | string | number, timeout?: number) {
    let data = this.source;
    data[key] = JSON.stringify(value);
    if (timeout == 0) {
      return value;
    }
    if (timeout) {
      data[`${key}__expires__`] = new Date().getTime() + 1000 * 60 * timeout;
    }
    return value;
  }

  public remove(key: string) {
    let data = this.source,
      value = data[key];
    delete data[key];
    delete data[`${key}__expires__`];
    return value;
  }
}

export default new Storage();

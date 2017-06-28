var config = require('../config.js');

class storage {

  constructor(props) {
    this.props = props || {}
    this.source = this.props.source || wx
  }

  get(key) {
    const data = this.source,
          timeout = data.getStorageSync(`${key}__expires__`)

    // 过期失效
    if (Date.now() >= timeout) {
      this.remove(key)
      return;
    }
    const value = data.getStorageSync(key)
    return value
  }

  // 设置缓存
  // timeout：过期时间（分钟）
  set(key, value, timeout) {
    let data = this.source

    data.setStorageSync(key,(value))
    if (timeout)
      data.setStorageSync(`${key}__expires__`,(Date.now() + 1000*60*timeout));
    return value
  }

  remove(key) {
    let data = this.source
        data.removeStorageSync(key)
        data.removeStorageSync(`${key}__expires__`)
    return undefined;
  }
}
const Store = new storage();
module.exports = Store;
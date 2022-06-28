const cookies = {
  get: (name: string) => {
    let arr;
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    if ((arr = document.cookie.match(reg))) return decodeURIComponent(arr[2]);
    return null;
  },
  set: (name, value, expire = 60) => {
    const minute = expire;
    const exp = new Date();
    exp.setTime(exp.getTime() + minute * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(
      value
    )};expires=${exp.toUTCString()};path=/`;
  },
  remove: (name) => {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = cookies.get(name);
    if (cval != null)
      document.cookie = `${name}=${cval};expires=${exp.toUTCString()};path=/`;
  },
};

export default cookies;

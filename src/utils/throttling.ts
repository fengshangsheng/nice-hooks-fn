// 防抖
export default function antiShake(fn: Function, ms = 300) {
  function _() {
    let flag = false;
    let timeout: NodeJS.Timeout;

    return () => {
      if (flag) {
        clearTimeout(timeout);
      }
      flag = true;
      timeout = setTimeout(() => {
        if (typeof fn === 'function') {
          flag = false;
          fn();
        }
      }, ms);
    };
  }

  return _();
}

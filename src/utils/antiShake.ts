// 节流
export default function throttling(fn: Function, ms = 300) {
  function _() {
    let flag = false;
    return () => {
      if (flag) {
        return;
      }
      flag = true;
      setTimeout(() => {
        flag = false;
      }, ms);

      if (typeof fn === 'function') {
        fn();
      }
    };
  }

  return _();
}


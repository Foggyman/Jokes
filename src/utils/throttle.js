function throttle(func, timeout) {
  let timer;
  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      func.apply(this, args);
      timer = null;
    }, timeout);
  };
}

export default throttle;

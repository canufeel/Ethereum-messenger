
export const preventDefaultHelper = (e, cb, ctx, ...args) => {
  e.preventDefault();
  if (ctx) {
    cb.call(ctx, ...args);
  } else {
    cb(...args);
  }
};

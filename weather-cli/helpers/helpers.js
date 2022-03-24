const getArgs = args => {
  const sliceArgs = args.slice(2);

  return sliceArgs.reduce((acc, c, ndx) => {
    if (c[0] === '-') {
      const next = sliceArgs[ndx + 1];

      if (ndx === sliceArgs.length - 1 || next[0] === '-') {
        acc[c.slice(1)] = true;
      } else {
        acc[c.slice(1)] = next;
      }
    }

    return acc;
  }, {});
};

export default getArgs;

export const partition = <T>(arr: T[], fn: (v: T) => boolean) =>
  arr.reduce((acc, v) => {
    if (fn(v)) {
      acc[0].push(v);
    } else {
      acc[1].push(v);
    }
    return acc;
  }, [[], []] as [T[], T[]]);

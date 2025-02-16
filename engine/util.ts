export const partition = <T>(arr: T[], fn: (v: T) => boolean) =>
  arr.reduce((acc, v) => {
    if (fn(v)) {
      acc[0].push(v);
    } else {
      acc[1].push(v);
    }
    return acc;
  }, [[], []] as [T[], T[]]);

export const sample = <T>(arr: T[]): T | undefined => {
  if (arr.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export function memoize<This, Args extends unknown[], Return>(
  target: (this: This, ...args: Args) => Return,
  _context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >,
) {
  const cache = new Map<string, Return>();
  function memoizedMethod(this: This, ...args: Args): Return {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = target.call(this, ...args);
    cache.set(key, result);
    return result;
  }
  return memoizedMethod;
}

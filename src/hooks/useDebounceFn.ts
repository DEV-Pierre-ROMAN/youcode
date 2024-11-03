import { useRef } from "react";

export const useDebounceFn = <T extends unknown[]>(
  fn: (...args: T) => void,
  delay = 500
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const returnfn = (...args: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  return returnfn;
};

import { useEffect } from "react";
import useTimeoutFn from "./use-timeout-fn";

interface useDebounceProps {
  fn: () => void;
  ms: number;
  deps: any;
}

const useDebounce = ({ fn, ms, deps }: useDebounceProps) => {
  const { run, clear } = useTimeoutFn({ fn, ms });

  // eslint-disable-next-line
  useEffect(run, deps);

  return clear;
};

export default useDebounce;

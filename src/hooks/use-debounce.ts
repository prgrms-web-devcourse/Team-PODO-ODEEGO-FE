import { useEffect } from "react";
import useTimeoutFn from "./use-timeout-fn";

interface Props {
  fn: () => void;
  ms: number;
  deps: string[];
}

const useDebounce = ({ fn, ms, deps }: Props) => {
  const [run, clear] = useTimeoutFn({ fn, ms });

  useEffect(run, [...deps, run]);

  return clear;
};

export default useDebounce;

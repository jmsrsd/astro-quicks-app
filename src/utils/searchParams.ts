import { navigate } from "astro:transitions/client";
export type UseSearchParamsState = {
  [k: string]: string;
};

export type UseSearchParamsStateSetter = (state: UseSearchParamsState) => void;

export type UseSearchParamsProps = { url: URL };

export type UseSearchParamsResult = [
  UseSearchParamsState,
  UseSearchParamsStateSetter,
];

export type UseSearchParams = typeof useSearchParams;

export function useSearchParams(props: { url: URL }): UseSearchParamsResult {
  const url = new URL(props.url.toString());

  const searchParams = url.searchParams;

  const state: UseSearchParamsState = Object.fromEntries([
    ...searchParams.entries(),
  ]);

  function setState(newValue: typeof state) {
    const newSearchParams = new URLSearchParams(Object.entries(newValue));

    navigate(`${url.pathname}?${newSearchParams.toString()}`);
  }

  return [state, setState];
}

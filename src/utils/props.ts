export type UsePropsArgs = { url: URL; props: Record<string, any> };

export function useProps(args: UsePropsArgs) {
  const { url } = args;

  const params = url.searchParams;

  const props = { ...args.props };

  for (const key of [...params.keys()]) {
    props[key] = params.get(key) ?? props[key];
  }

  return props;
}

export function propsToParams(props: Record<string, any>) {
  const result = new URLSearchParams();

  for (const key of Object.keys(props)) {
    result.set(key, `${props[key]}`);
  }

  return result;
}

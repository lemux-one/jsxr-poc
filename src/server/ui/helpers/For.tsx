function For(props: {
  each: unknown[];
  children?: (item: unknown) => unknown;
}) {
  return props.each.map((item) => props.children?.(item));
}

export { For };
export default For;

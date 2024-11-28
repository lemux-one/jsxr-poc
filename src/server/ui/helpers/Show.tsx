function Show(props: {
  if: boolean | (() => boolean);
  children?: unknown;
  else?: unknown;
}) {
  if (props.if) {
    return <>{props.children}</>;
  } else {
    return <>{props.else}</>;
  }
}

export { Show };
export default Show;

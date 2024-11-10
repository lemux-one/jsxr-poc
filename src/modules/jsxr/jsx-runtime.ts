namespace JSX {
  export interface IntrinsicElements {
    [key: string]: any;
  }
}

type TProps = any;
function jsxHandler(tag: unknown, { children, ...attrs }: TProps) {
  return { tag, attrs, children };
}

function jsxFragmentHandler(children: unknown) {
  return { tag: null, children };
}

export { JSX };
export const jsx = jsxHandler;
export const jsxs = jsxHandler;
export const Fragment = jsxFragmentHandler;

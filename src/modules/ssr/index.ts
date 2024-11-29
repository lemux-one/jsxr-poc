function isSelfClosingTag(tag: string) {
  return ["br", "img", "input", "hr", "meta", "link"].includes(tag);
}

function renderAttrs(attrs: any) {
  return attrs
    ? Object.keys(attrs)
        .map((attrName) => {
          if (attrs[attrName] === null || attrs[attrName] === undefined) {
            return "";
          }
          if (typeof attrs[attrName] === "boolean") {
            return attrs[attrName] ? ` ${attrName}` : "";
          }
          return ` ${attrName}="${attrs[attrName]}"`;
        })
        .join("")
    : "";
}

function renderChildren(children: unknown) {
  if (!children) return "";
  if (Array.isArray(children)) return children.map(html).join("");
  return html(children);
}

export function html(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return `${node}`;
  if (Array.isArray(node)) return node.map(html).join("");
  if (node.tag === null) {
    return renderChildren(node.children); // Fragment: only children matter
  }
  if (node.tag) {
    const { tag, attrs = {}, children } = node;
    if (typeof tag === "function") {
      return tag.name === "jsxFragmentHandler"
        ? html(tag(children)) // Fragment
        : html(tag({ ...attrs, children })); // FC
    }
    const doctype = tag === "html" ? "<!DOCTYPE html>" : "";
    return isSelfClosingTag(tag)
      ? `${doctype}<${tag}${renderAttrs(attrs)}/>`
      : `${doctype}<${tag}${renderAttrs(attrs)}>${renderChildren(
          children
        )}</${tag}>`;
  }
  console.error(`Unsupported node: ${JSON.stringify(node)}`);
  return "";
}

import { test, expect } from "bun:test";
import { Fragment } from "jsxr/jsx-runtime";

test("br element with no props", () => {
  expect(<br />).toEqual({ tag: "br", attrs: {}, children: undefined });
});

test("span element with no props and no children", () => {
  expect(<span></span>).toEqual({
    tag: "span",
    attrs: {},
    children: undefined,
  });
});

test("p element with class and text as children", () => {
  expect(<p class="txt">Dummy text</p>).toEqual({
    tag: "p",
    attrs: { class: "txt" },
    children: "Dummy text",
  });
});

test("ul element with two li children", () => {
  expect(
    <ul>
      <li>First</li>
      <li>Second</li>
    </ul>
  ).toEqual({
    tag: "ul",
    attrs: {},
    children: [
      { tag: "li", attrs: {}, children: "First" },
      { tag: "li", attrs: {}, children: "Second" },
    ],
  });
});

test("fragment with no props and no children", () => {
  expect(<></>).toEqual({ tag: Fragment, attrs: {}, children: undefined });
});

test("fragment with no props and one children", () => {
  expect(
    <>
      <br />
    </>
  ).toEqual({
    tag: Fragment,
    attrs: {},
    children: { tag: "br", attrs: {}, children: undefined },
  });
});

test("fragment wrapped into a component alias", () => {
  const FragmentWrapper = (
    <>
      <br />
    </>
  );
  expect(<FragmentWrapper />).toEqual({
    tag: {
      tag: Fragment,
      attrs: {},
      children: { tag: "br", attrs: {}, children: undefined },
    },
    attrs: {},
    children: undefined,
  });
});

test("simple greeting component of a single element with no props and no children", () => {
  const SimpleGreeting = () => <span>Hi</span>;
  expect(<SimpleGreeting />).toEqual({
    tag: SimpleGreeting,
    attrs: {},
    children: undefined,
  });
});

test("greeting component with props", () => {
  const Greeting = (props: { name: string }) => {
    const { name } = props;
    return <span>Hello, {name}</span>;
  };
  expect(<Greeting name="Bun" />).toEqual({
    tag: Greeting,
    attrs: { name: "Bun" },
    children: undefined,
  });
});

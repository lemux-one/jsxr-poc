import { test, expect } from "bun:test";
import { html } from ".";

test("empty fragment", () => {
  const rendered = html(<></>);
  expect(rendered).toEqual("");
});

test("fragment with children", () => {
  const rendered = html(
    <>
      <span>Dummy</span>
    </>
  );
  expect(rendered).toEqual("<span>Dummy</span>");
});

test("fragment with children having props", () => {
  const rendered = html(
    <>
      <p class="txt">Dummy</p>
    </>
  );
  expect(rendered).toEqual('<p class="txt">Dummy</p>');
});

test("fragment with nested children having props and using self closing html tags", () => {
  const rendered = html(
    <>
      <span class="greeting">
        Hello
        <br />
        Bun!
      </span>
      <p class="txt">Dummy p</p>
    </>
  );
  expect(rendered).toEqual(
    '<span class="greeting">Hello<br/>Bun!</span><p class="txt">Dummy p</p>'
  );
});

test("span with no props and no children", () => {
  const rendered = html(<span></span>);
  expect(rendered).toEqual("<span></span>");
});

test("span with class and text children", () => {
  const rendered = html(<span class="txt">This is a text</span>);
  expect(rendered).toEqual('<span class="txt">This is a text</span>');
});

test("doctype prefix", () => {
  const rendered = html(<html lang="eng"></html>);
  expect(rendered).toEqual('<!DOCTYPE html><html lang="eng"></html>');
});

test("simple component with props and no children", () => {
  function SimpleComponent(props: { class: string }) {
    return <p {...props}>Dummy text</p>;
  }
  expect(html(<SimpleComponent class="simple" />)).toEqual(
    '<p class="simple">Dummy text</p>'
  );
});

test("simple component with only children props", () => {
  function WrapperComponent(props: any) {
    return <p>{props.children}</p>;
  }
  expect(html(<WrapperComponent>Child</WrapperComponent>)).toEqual(
    "<p>Child</p>"
  );
});

test("boolean attribute when true", () => {
  expect(html(<input type="checkbox" checked={true} />)).toEqual(
    '<input type="checkbox" checked/>'
  );
  expect(html(<input type="checkbox" checked />)).toEqual(
    '<input type="checkbox" checked/>'
  );
});

test("boolean attribute when false or nullish", () => {
  expect(html(<input type="checkbox" checked={false} />)).toEqual(
    '<input type="checkbox"/>'
  );
  expect(html(<input type="checkbox" checked={undefined} />)).toEqual(
    '<input type="checkbox"/>'
  );
  expect(html(<input type="checkbox" checked={null} />)).toEqual(
    '<input type="checkbox"/>'
  );
});

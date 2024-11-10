export function BaseLayout(props: any) {
  const { title, children } = props;
  return (
    <html lang="eng">
      <head>
        <title>{title} | JSXR Playground</title>
      </head>
      <body>{children}</body>
      <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
    </html>
  );
}

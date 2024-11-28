export function BaseLayout(props: any) {
  const { title, children } = props;
  return (
    <html lang="eng">
      <head>
        <title>{title} | JSXR Playground</title>
        <link rel="stylesheet" href="/static/index.css"></link>
      </head>
      <body>{children}</body>
      <script src="/static/index.js"></script>
    </html>
  );
}

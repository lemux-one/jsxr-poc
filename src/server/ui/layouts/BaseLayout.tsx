export function BaseLayout(props: any) {
  const { title, children } = props;
  return (
    <html lang="eng">
      <head>
        <meta charset="UTF-8" />
        <title>{title} | JSXR Playground</title>
        <link rel="stylesheet" href="/static/index.css"></link>
      </head>
      <body>{children}</body>
      <script src="/static/index.js"></script>
    </html>
  );
}

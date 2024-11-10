# JSX runtime proof of concept (JSXr-PoC)

PoC for a node-based server with SSR using a custom, dependency-free JSX implementation and a few opinionated abstractions to create a framework-like DX powered by Bun for development and NodeJS for production.

# Quickstart

## Pre-requisites

Having a shell able to handle POSIX 'cp' commands and '&&' command chaining operator. Probably Windows CMD is the only one unable to fulfill those requirements (just a hunch, not actually tested 😁).

## Launch it locally

The following steps will bundle and run the project is it would be run in a production environment.

```sh
gh repo clone lemux-one/jsxr-poc
cd ./jsxr-poc
bun install
bun preview
```

For a dev mode, having a more robust DX, do the following instead.

```sh
gh repo clone lemux-one/jsxr-poc
cd ./jsxr-poc
bun install
bun dev
```

# Goals

1. **Keep dependencies to an absolute minimum (if any)**. The "node_modules" folder should, ideally, only hold type definitions for development and nothing once the app is bundled. Ergo: all features must be either built-in in the target platform (NodeJS/Browser) or self implemented.

2. **SSR from the ground up**. Every HTML-like server response must be derived from a TSX component. No explicit HTML files as static assets. The only exception would be to provide a SSG pipeline while creating the final distribution bundle. HTML always an output, never an input.

3. **TypeScript only code base**. However the typing is not enforced to be as strict as possible. Lousely defined types based on "any", "unknown" and the like are welcome to simplify rather complex types that might not be fully known before hand.

4. **Server side and client side must coexist and cooperate**. The project structure must allow shared code for both sides to be easily reused and the bundling pipeline must generate at least one bundle for the server and one other bundle for the client (the later has to be also injected into the generated HTML output).

5. **Tests are meant for tricky features**. There is no point on aiming at high percent coverage. The real deal is to have tests that prevent already working features from breaking after some unintended change. The main focus is on shared code and public APIs.

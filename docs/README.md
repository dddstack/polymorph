# @dddstack/polymorph

Polymorph makes flexible, polymorphic web components.

A polymorphic component is a component that can be rendered as any DOM element.

## Supported Frameworks

Polymorph currently supports the following frameworks:

- [Preact](https://preactjs.com)
- [Qwik](https://qwik.builder.io)
- [React](https://react.dev)
- [Solid](https://www.solidjs.com)

## Installation

```bash
npm install @dddstack/polymorph-{preact,qwik,react,solid}
```

## Usage

```tsx
import { polymorph } from "@dddstack/polymorph-react";

const p = polymorph();

const App = () => {
  return (
    <p.body>
      <p.nav />
      <p.div as="main">
        <p.div />
      </p.div>
    </p.body>
  );
};
```

## `As` Prop

All Polymorph components include an `as` prop. The `as` prop can render a component as any DOM element.

```tsx
import { polymorph } from "@dddstack/polymorph-react";

const p = polymorph();

const Main = () => {
  return (
    // Rendered as <main>
    <p.div as="main">Main</p.div>
  );
};
```

## Polymorph Components

Polymorph can create reusable polymorphic components for any HTML DOM element.

```tsx
import { polymorph } from "@dddstack/polymorph-react";

const p = polymorph();

const PDiv = p("div");

const Base = ({ children, ...props }: Props) => (
  // Rendered as <div>
  <PDiv {...props}>{children}</PDiv>
);

const WithAs = ({ children, ...props }: Props) => (
  // Rendered as <main>
  <PDiv as="main" {...props}>
    {children}
  </PDiv>
);
```

## Transformers

`polymorph` accepts a transformer function to apply properties and transformations to all HTML DOM elements.

The transformer's input properties will automatically apply to Polymorph components. The transformer will be applied to a Polymorph component's properties before the component is dynamically rendered.

Transformers act as a type-safe middleware between a component's function call and its final rendered state.

```tsx
import { polymorph } from "@dddstack/polymorph-react";

const transformer = (props: { highlight?: string }) => {
  const { hightlight, ...rest } = props;

  if (highlight) return { "data-highlight": highlight, ...rest };

  return rest;
};

const p = polymorph(transformer);

const App = () => {
  return (
    // All components have optional highlight property
    <p.main>
      <p.span highlight="Polymorph">
        Polymorph is very powerful.
      </p.span>
    </p.main>
  );
};
```

import type {
  Polymorph,
  Transformer,
  TransformerProps,
  WithAs
} from "@dddstack/polymorph-generics";
import type {
  ComponentProps as PreactComponentProps,
  JSX
} from "preact";
import { createElement } from "preact";
import { forwardRef } from "preact/compat";

export type As = keyof JSX.IntrinsicElements;

export type ComponentProps<AsType extends As> = WithAs<
  As,
  PreactComponentProps<AsType>
>;

export type Component<
  AsType extends As,
  TransformerPropsType extends TransformerProps
> = {
  (props: ComponentProps<AsType> & TransformerPropsType): any;
};

export const mechanic = <
  AsType extends As,
  TransformerPropsType extends TransformerProps
>(
  asType: AsType,
  transformer: Transformer<TransformerPropsType>
) =>
  forwardRef(
    (
      { as, children, ...rest }: ComponentProps<AsType> & any,
      ref
    ) =>
      createElement(
        as ?? asType,
        { ref, ...transformer(rest) },
        children
      )
  );

export const defaultTransformer = (props: TransformerProps) =>
  props;

export const polymorph = <
  TransformerPropsType extends TransformerProps
>(
  transformer: Transformer<TransformerPropsType> = defaultTransformer
) => {
  const cache = new Map<As, any>();

  return new Proxy(mechanic, {
    apply: (_, __, argArray: [As]) =>
      mechanic(...argArray, transformer),
    get: (_, DOMElement: As) => {
      if (!cache.get(DOMElement))
        cache.set(DOMElement, mechanic(DOMElement, transformer));

      return cache.get(DOMElement);
    }
  }) as Polymorph<
    As,
    { [AsType in As]: Component<As, TransformerPropsType> }
  >;
};

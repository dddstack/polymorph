import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { createElement } from "@builder.io/qwik";
import type {
  Polymorph,
  Transformer,
  TransformerProps,
  WithAs
} from "@dddstack/polymorph-generics";

import type { As } from "./as.types";

export type ComponentProps<AsType extends As> = WithAs<
  As,
  QwikIntrinsicElements[AsType]
>;

export type Component<
  AsType extends As,
  TransformerPropsType extends TransformerProps
> = {
  (props: ComponentProps<AsType> & TransformerPropsType): any;
};

export const mechanic =
  <AsType extends As, TransformerPropsType extends TransformerProps>(
    asType: AsType,
    transformer: Transformer<TransformerPropsType>
  ) =>
  ({ as, children, ...rest }: ComponentProps<AsType> & any) =>
    createElement(as ?? asType, transformer(rest), children);

export const defaultTransformer = (props: TransformerProps) => props;

export const polymorph = <TransformerPropsType extends TransformerProps>(
  transformer: Transformer<TransformerPropsType> = defaultTransformer
) => {
  const cache = new Map<As, any>();

  return new Proxy(mechanic, {
    apply: (_, __, argArray: [As]) => mechanic(...argArray, transformer),
    get: (_, DOMElement: As) => {
      if (!cache.get(DOMElement))
        cache.set(DOMElement, mechanic(DOMElement, transformer));

      return cache.get(DOMElement);
    }
  }) as Polymorph<As, { [AsType in As]: Component<As, TransformerPropsType> }>;
};

import type {
  Polymorph,
  Transformer,
  TransformerProps,
  WithAs
} from "@dddstack/polymorph-generics";
import type { ComponentProps as SolidComponentProps, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

export type As = keyof JSX.IntrinsicElements;

export type ComponentProps<AsType extends As> = WithAs<
  As,
  SolidComponentProps<AsType>
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
  (props: ComponentProps<AsType> & any) => {
    const [local, others] = splitProps(props, ["as"]);

    return <Dynamic component={local.as ?? asType} {...transformer(others)} />;
  };

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

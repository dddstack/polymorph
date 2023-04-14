import type { TransformerProps } from "./transformerProps.types";

export type Transformer<TransformerPropsType extends TransformerProps> = (
  props: TransformerPropsType
) => TransformerProps;

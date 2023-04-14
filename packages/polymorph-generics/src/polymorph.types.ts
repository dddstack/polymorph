export type Polymorph<
  As extends string,
  ComponentPropsType extends { [AsType in As]: any }
> = {
  [AsType in As]: ComponentPropsType[AsType];
} & {
  <AsType extends As>(asType: AsType): ComponentPropsType[AsType];
};

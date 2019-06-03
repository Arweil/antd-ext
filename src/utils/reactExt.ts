export function setStateAsync<K extends keyof S, S>(
  $this: React.Component<{}, S> | React.PureComponent<{}, S>,
  params: Pick<S, K>
) {
  return new Promise((resolve) => {
    $this.setState(params, resolve);
  });
};

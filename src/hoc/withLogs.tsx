export const withLogs = <P extends object>(
  WrappedComponent: React.FC<P>,
  componentName?: string
) => {
  const withLogs: React.FC<P & { message?: string }> = (props) => {
    const msg = props.message || 'Hello from';
    const name = componentName || WrappedComponent.name;
    console.log(`${msg} ${name}`);
    return <WrappedComponent {...props} />;
  };

  return withLogs;
};

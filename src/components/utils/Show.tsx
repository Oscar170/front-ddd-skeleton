const Show: React.FC<{ when: boolean; fallback?: React.ReactNode }> = ({
  when,
  children,
  fallback = null,
}) => {
  return <>{when ? children : fallback}</>;
};

export default Show;

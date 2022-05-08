import { Children } from "react";

const Match: React.FC<{ fallback?: React.ReactNode }> = ({
  children,
  fallback,
}) => {
  const childrens = Children.toArray(children) as React.ReactElement<{
    when: boolean;
    children: React.ReactNode;
  }>[];

  const matchedElemeent = childrens.find((child) => child.props.when);

  return <>{matchedElemeent ? matchedElemeent.props.children : fallback}</>;
};

export const Case: React.FC<{ when: boolean }> = () => {
  return null;
};

export default Match;

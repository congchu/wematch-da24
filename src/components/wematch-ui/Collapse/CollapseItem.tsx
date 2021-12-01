import * as React from "react";
import CollapseItemContext from "./CollapseItemContext";

interface Props {
  preExpanded?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function CollapseItem(props: Props) {
  const { children, preExpanded = false, ...restProps } = props;
  const [expanded, setExpanded] = React.useState<boolean>(preExpanded);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <CollapseItemContext.Provider value={{ expanded, toggleExpansion }}>
      <div {...restProps}>{children}</div>
    </CollapseItemContext.Provider>
  );
}

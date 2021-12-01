import * as React from "react";
import styled, { css } from "styled-components";
import CollapseItemContext from "./CollapseItemContext";
import { grayBg, gray33 } from "styles/colors";

const Panel = styled.div<{ expanded: boolean }>`
  background-color: ${grayBg};
  padding: 16px;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -1px;
  color: ${gray33};

  ${({ expanded }) =>
    !expanded &&
    css`
      display: none;
    `}
`;

export function CollapsePanel(props: React.HTMLAttributes<Element>) {
  const { children, ...restProps } = props;

  return (
    <CollapseItemContext.Consumer>
      {({ expanded }) => (
        <Panel expanded={expanded} {...restProps}>
          {children}
        </Panel>
      )}
    </CollapseItemContext.Consumer>
  );
}

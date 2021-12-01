import * as React from "react";
import styled from "styled-components";
import CollapseItemContext from "./CollapseItemContext";
import { Down, Up } from "../Icon";
import { gray33 } from "styles/colors";

interface Props extends React.HTMLAttributes<Element> {
  text: string;
}

const Header = styled.strong`
  display: block;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -1px;
  color: ${gray33};
  margin: 0;
  padding: 22px 0 17px;
  line-height: 24px;
  position: relative;
  border-bottom: 1px solid #dee1eb;
  .icon {
    position: absolute;
    right: 4px;
  }
`;

export function CollapseHeader(props: Props) {
  const { text, ...restProps } = props;

  return (
    <CollapseItemContext.Consumer>
      {({ toggleExpansion, expanded }) => (
        <Header onClick={toggleExpansion} {...restProps}>
          {text}
          {expanded ? <Down className="icon" /> : <Up className="icon" />}
        </Header>
      )}
    </CollapseItemContext.Consumer>
  );
}

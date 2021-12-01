import React from "react";
import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  expand: boolean;
}

const Container = styled.div<{ expand: boolean }>`
  display: ${(props) => (props.expand ? "block" : "none")};
`;
export default function Collapse({ expand, children }: Props) {
  return <Container expand={expand}>{children}</Container>;
}

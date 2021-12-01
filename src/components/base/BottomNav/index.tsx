import * as React from "react";
import styled from "styled-components";
import { lineDefault } from "styles/colors";

type Props = React.HTMLAttributes<HTMLElement>;

const Container = styled.div`
  padding-bottom: 56px;
`;
const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;
const Ul = styled.ul`
  height: 56px;
  background-color: #fbfcfd;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid ${lineDefault};
  box-sizing: border-box;
`;

const BottomNav: React.FC<Props> = ({ children, ...restProps }) => {
  return (
    <Container {...restProps}>
      <Nav>
        <Ul>{children}</Ul>
      </Nav>
    </Container>
  );
};

export default BottomNav;

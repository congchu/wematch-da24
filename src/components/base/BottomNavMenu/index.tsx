import * as React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import styled, { css } from "styled-components";
import { gray33, pointBlue } from "styles/colors";

interface Props extends NavLinkProps {
  to: string;
  isHref?: boolean;
}

const AnchorStyles = css`
  font-size: 10px;
  text-align: center;
  color: ${gray33};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 9px;
  height: 56px;
  box-sizing: border-box;
  cursor: pointer;
  span {
    margin-top: 4px;
  }
  &:hover {
    color: ${pointBlue};
    path {
      fill: ${pointBlue};
    }
  }
  &.active {
    span {
      color: ${pointBlue};
    }
    path {
      fill: ${pointBlue};
    }
  }
`;

const NavAnchor = styled(NavLink)`
  ${AnchorStyles}
`;

const Anchor = styled.a`
  ${AnchorStyles}
`;

const BottomNavMenu: React.FC<Props> = ({ children, to, isHref = false, ...restProps }) => {
  return (
    <li>
      {isHref ? (
        <Anchor href={to}>{children}</Anchor>
      ) : (
        <NavAnchor to={to} {...restProps}>
          {children}
        </NavAnchor>
      )}
    </li>
  );
};

export default BottomNavMenu;

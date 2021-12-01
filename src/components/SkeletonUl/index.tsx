import React from "react";
import styled, { keyframes } from "styled-components";

interface ISkeleton {
  width: string;
  isRound?: boolean;
}

const skeleton = keyframes`
  0% {
    background-position: -468px 0
}
  100% {
    background-position: 468px 0
}
`;

const SkeletonLine = styled.div<ISkeleton>`
  display: inline-block;
  position: relative;
  overflow: hidden;
  height: 100%;
  width: ${(props) => (props.width ? props.width : "100%")};
  background: #ebeef2;
  min-height: 12px;

  border-radius: ${(props) => props.isRound && "50%"};

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #ebeef2 0%, #d7dbe2 20%, #ebeef2 40%, #ebeef2 100%);
    animation-name: ${skeleton};
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    background-size: 1000px 104px;
  }
`;

const SkeletonLoading = styled.div`
  position: relative;
`;
export const SkeletonAnimation: React.FC = ({ children }) => <SkeletonLoading>{children}</SkeletonLoading>;
export const Skeleton = ({ width = "0%", isRound = false }) => <SkeletonLine width={width} isRound={isRound} />;

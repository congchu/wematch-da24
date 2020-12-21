import React from "react";
import styled, {keyframes} from "styled-components";

interface ISkeleton{
  width: string;
  isRound?: boolean;
}

const skeleton = keyframes`
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
`
const SkeletonLine = styled.div<ISkeleton>`
  display: inline-block;
  position: relative;
  overflow: hidden;
  height: 100%;
  width: ${(props) => props.width ? props.width : '100%'};
  background:  #ddd;
  min-height: 12px;

  border-radius: ${props => props.isRound && '50%'};

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #ddd, #e8e8e8);
    animation-name: ${skeleton};
    animation-duration: 1.2s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
}
`;
export const Skeleton = ({width='0%', isRound=false}) => (
  <SkeletonLine width={width} isRound={isRound}/>
);
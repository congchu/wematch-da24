import React from "react";
import styled, {keyframes} from "styled-components";

interface ISkeleton{
  width: string;
  height?: string;
  isRound?: boolean;
}

const skeleton = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
  /*0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }*/
`
const SkeletonLine = styled.div<ISkeleton>`
  display: inline-block;
  position: relative;
  overflow: hidden;
  height: ${(props) => props.height ? props.height : '100%'};
  width: ${(props) => props.width ? props.width : '100%'};
  background:  #ddd;
  min-height: 12px;

  border-radius: ${props => props.isRound ? '50%' : 'inherit'};

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    //background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    //background: linear-gradient(to right, transparent, rgba(255, 255, 255, .2), transparent);
    //background: linear-gradient(90deg, #ddd 0%, #e8e8e8 20%, #ddd 40%, #ddd 100%);
    background: linear-gradient(to right, #d8d8d8 0%, #bdbdbd 20%, #d8d8d8 100%);
    animation-name: ${skeleton};
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
}
`;
export const Skeleton = ({width='0%', height='100%', isRound=false}) => (
  <SkeletonLine width={width} height={height} isRound={isRound}/>
);
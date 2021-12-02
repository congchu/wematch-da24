import React, { useState } from "react";
import Styled from "styled-components";

type Props = { color: string; size?: string };
const Spinner = ({ color, size }: Props) => {
  return (
    <Container color={color === "main" ? "#1672f7" : "#ffffff"} size={size ? size : "24px"}>
      <div className="circle">
        <div className="circle1 child"></div>
        <div className="circle2 child"></div>
        <div className="circle3 child"></div>
        <div className="circle4 child"></div>
        <div className="circle5 child"></div>
        <div className="circle6 child"></div>
        <div className="circle7 child"></div>
        <div className="circle8 child"></div>
        <div className="circle9 child"></div>
      </div>
    </Container>
  );
};

export default Spinner;

const Container = Styled.div<{ color: string; size: string }>`
.circle {
        width: ${({ size }) => size};
        height: ${({ size }) => size};
        position: relative;
    
        .child {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
    
        .child:before {
            content: '';
            display: block;
            margin: 0 auto;
            width: 20%;
            height: 20%;
    
            background-color: ${({ color }) => color};
            border-radius: 100%;
            -webkit-animation: circleBounceDelay 1.2s infinite ease-in-out both;
            animation: circleBounceDelay 1.2s infinite ease-in-out both;
        }
    
        .circle2 {
            -webkit-transform: rotate(40deg);
        }
    
        .circle3 {
            -webkit-transform: rotate(80deg);
        }
    
        .circle4 {
            -webkit-transform: rotate(120deg);
            -ms-transform: rotate(120deg);
            transform: rotate(120deg);
        }
    
        .circle5 {
            -webkit-transform: rotate(160deg);
            -ms-transform: rotate(160deg);
            transform: rotate(160deg);
        }
    
        .circle6 {
            -webkit-transform: rotate(200deg);
            -ms-transform: rotate(200deg);
            transform: rotate(200deg);
        }
    
        .circle7 {
            -webkit-transform: rotate(240deg);
            -ms-transform: rotate(240deg);
            transform: rotate(240deg);
        }
    
        .circle8 {
                -webkit-transform: rotate(280deg);
                -ms-transform: rotate(280deg);
                transform: rotate(280deg);
            }
      
         .circle9 {
            -webkit-transform: rotate(320deg);
            -ms-transform: rotate(320deg);
            transform: rotate(320deg);
        }
    
        .circle2:before {
            -webkit-animation-delay: -1.0s;
            animation-delay: -1.0s;
        }
    
        .circle3:before {
            -webkit-animation-delay: -0.8s;
            animation-delay: -0.8s;
        }
    
        .circle4:before {
            -webkit-animation-delay: -0.6s;
            animation-delay: -0.6s;
        }
    
        .circle5:before {
            -webkit-animation-delay: -0.5s;
            animation-delay: -0.5s;
        }
    
        .circle6:before {
            -webkit-animation-delay: -0.4s;
            animation-delay: -0.4s;
        }
    
        .circle7:before {
            -webkit-animation-delay: -0.3s;
            animation-delay: -0.3s;
        }
    
        .circle8:before {
            -webkit-animation-delay: -0.2s;
            animation-delay: -0.2s;
        }
    
        .circle9:before {
            -webkit-animation-delay: -0.1s;
            animation-delay: -0.1s;
        }
    }
    
    
    
    @-webkit-keyframes circleBounceDelay {
    
        0%,
        80%,
        100% {
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 0;
        }
    
        40% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes circleBounceDelay {
    
        0%,
        80%,
        100% {
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 0;
        }
    
        40% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
        }
    }
`;

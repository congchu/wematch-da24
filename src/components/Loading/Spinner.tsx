import React, { useState } from "react";
import Styled from "styled-components";

const Spinner = () => {
  return (
    <Container>
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

const Container = Styled.div`
    .circle {
        width: 24px;
        height: 24px;
        position: relative;
    }
    .circle .child {
    width: 100%;
    height: 100%;
    
    position: absolute;
    left: 0;
    top: 0;
    }
    .circle .child:before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 20%;
    height: 20%;
    background-color: #ffffff;
    border-radius: 100%;
    -webkit-animation: circleBounceDelay 1.2s infinite ease-in-out both;
            animation: circleBounceDelay 1.2s infinite ease-in-out both;
    }
    .circle .circle2 {
    -webkit-transform: rotate(40deg);
        -ms-transform: rotate(40deg);
            transform: rotate(40deg); }
    .circle .circle3 {
    -webkit-transform: rotate(80deg);
        -ms-transform: rotate(80deg);
            transform: rotate(80deg); }
    .circle .circle4 {
    -webkit-transform: rotate(120deg);
        -ms-transform: rotate(120deg);
            transform: rotate(120deg); }
    .circle .circle5 {
    -webkit-transform: rotate(160deg);
        -ms-transform: rotate(160deg);
            transform: rotate(160deg); }
    .circle .circle6 {
    -webkit-transform: rotate(200deg);
        -ms-transform: rotate(200deg);
            transform: rotate(200deg); }
    .circle .circle7 {
    -webkit-transform: rotate(240deg);
        -ms-transform: rotate(240deg);
            transform: rotate(240deg); }
    .circle .circle8 {
    -webkit-transform: rotate(280deg);
        -ms-transform: rotate(280deg);
            transform: rotate(280deg); }
            .circle .circle9 {
            -webkit-transform: rotate(320deg);
                -ms-transform: rotate(320deg);
                    transform: rotate(320deg); }
            .circle .circle9 {
            -webkit-transform: rotate(320deg);
                -ms-transform: rotate(320deg);
                    transform: rotate(320deg); }
    .circle .circle2:before {
    -webkit-animation-delay: -1.0s;
            animation-delay: -1.0s; }
    .circle .circle3:before {
    -webkit-animation-delay: -0.8s;
            animation-delay: -0.8s; }
    .circle .circle4:before {
    -webkit-animation-delay: -0.6s;
            animation-delay: -0.6s; }
    .circle .circle5:before {
    -webkit-animation-delay: -0.5s;
            animation-delay: -0.5s; }
    .circle .circle6:before {
    -webkit-animation-delay: -0.4s;
            animation-delay: -0.4s; }
    .circle .circle7:before {
    -webkit-animation-delay: -0.3s;
            animation-delay: -0.3s; }
    .circle .circle8:before {
    -webkit-animation-delay: -0.2s;
            animation-delay: -0.2s; }
    .circle .circle9:before {
    -webkit-animation-delay: -0.1s;
            animation-delay: -0.1s; }

    @-webkit-keyframes circleBounceDelay {
    0%, 80%, 100% {
        -webkit-transform: scale(0);
                transform: scale(0);
                opacity: 0.5;
    } 40% {
        -webkit-transform: scale(1);
                transform: scale(1);
    }
    }

    @keyframes circleBounceDelay {
    0%, 80%, 100% {
        -webkit-transform: scale(0);
                transform: scale(0);
    } 40% {
        -webkit-transform: scale(1);
                transform: scale(1);
    }
`;

import React, { useEffect, useRef, useState } from 'react'
import styled, { createGlobalStyle, css, keyframes } from 'styled-components'

import ToastPortal from './Portal'
import { CONTAINER_CLASSNAME } from './'
import { Props, ToastType } from './types'

import { Check, Exclamation } from 'components/Icon/index'
import * as colors from 'styles/colors'



const ToastStyle = createGlobalStyle`
  .wematch-toastContainer {
    //width: 344px;
    width: 100%;
    position: fixed;
    margin: 0 auto;
    bottom: 56px; /*** CHECK POINT ***/
    //top: 8px;
    left: 0;
    right: 0;
    z-index: 1;  /*** CHECK POINT ***/

    @media screen and (min-width:1200px) {
      width: 720px;
      bottom: 0px;
    }
    @media screen and (min-width:768px) {
      text-align: center;
    }
  }
`

const OpenAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);// 1. 아래서 직선으로 위로 올라오기/
  } to {
      transform: translateY(0)
    }
`


const CloseAnimation = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  } 
  to {
      transform: scale(1) translateY(100%);
      opacity: 0
  }
`



const ToastItem = styled.div<{ isDestroying: boolean; type: ToastType} >`
    font-size: 14px;
    overflow: hidden;
    margin-top: 2px;
    animation: ${OpenAnimation} 0.4s ease-in-out;
    animation-fill-mode: forwards;
    width: 100%;
    color: #fff;
    height: 56px;
  
    /* Animation for Destroying */
    ${props => props.isDestroying && css`
      animation: ${CloseAnimation} 0.4s ease-out;
      animation-fill-mode: forwards;
    `};
  
    @media screen and (min-width:1200px) {
      width: 720px;
      
    }
  
    .toastText {
     padding: 18px;

      p {
        display: inline;
        padding-left: 10px;
      }
  
      .centre {
        vertical-align: 20%;
        padding-left: 6.5px;
      }

    }

    ${props => props.type === 'detail' && css`
      background-color: ${colors.gray33};
    `}
    ${props => props.type === 'success' && css`
      background-color: ${colors.pointSky};
    `}
    ${props => props.type === 'error' && css`
      background-color: #E95D76;
    `}
  
}

`

const CLICK_TO_REMOVE_TOAST = 400

export default function Toast({ message, type= 'detail', duration= 3000 }: Props){

  const ref = useRef<HTMLDivElement>(null)
  const [isDestroying, setIsDestroying] = useState<boolean>(false)
  const [isDestroyed, setIsDestroyed] = useState<boolean>(false)
  const [time, setTime] = useState<number>(duration)

  const remove = () => {
    setTime(CLICK_TO_REMOVE_TOAST)
  }

  useEffect(() => {
    let t1: NodeJS.Timeout
    let t2: NodeJS.Timeout
    if (!isDestroyed) {
      t1 = setTimeout(() => {
        setIsDestroying(true)
      }, time - CLICK_TO_REMOVE_TOAST)
      t2 = setTimeout(() => {
        const container = document.querySelector(`.${CONTAINER_CLASSNAME}`) as Element
        container.removeChild(ref.current as HTMLDivElement)
        setIsDestroyed(true)
      }, time)
    }
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [isDestroyed, time])

  return (
    <ToastPortal>
      <ToastStyle />
      <ToastItem ref={ref} isDestroying={isDestroying} type={type}
        onClick={remove}  >
        <div className='toastText'>
          {
            type === 'error' ? <Exclamation width={17} height={17} /> : <Check width={15} height={15} fill={colors.white}/>
          }
          {
            type === 'error' ? <p className='centre' >{message}</p> : <p>{message}</p>
          }
        </div>
      </ToastItem>
    </ToastPortal>
  )
}

export const MemorizedToast = React.memo(Toast)


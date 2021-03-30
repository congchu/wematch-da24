import * as React from 'react'
import {ReactHTML, useEffect, useRef, useState} from "react"
import styled, {css} from 'styled-components'
import {useRouter} from 'hooks/useRouter'

import {Minus, Plus} from 'components/wematch-ui/Icon'
import * as colors from 'styles/colors'

export type faqCategory = '공통' | '이사' | '청소'

interface Props extends React.HTMLAttributes<HTMLDivElement>  {
    isFaq?: boolean;
    category?: faqCategory;
    title: string;
    date?:string;
    postNum?:number;
    defaultExpand?: boolean;
    expand?: boolean;
    clickable?: boolean;
}


const S = {
    Container: styled.div`
      display: flex;
      position: relative;
      flex-direction: column;
      justify-content: center;
    `,
    Header: styled.div`
      display: flex;
      align-items: center;
      cursor: pointer;
      
      overflow: hidden;
      line-height: 1.5;
      color: #333;
      font-weight: 600;
      font-size: 16px;
      letter-spacing: -1px;
      padding: 0px 64px 0px 24px;
      background-size: 16px;
      position: relative;
      .textWrapper {
        display: inline-block;
        em {
          color: #1672f7;
        }
        h6{
          font-weight: normal;
          display: block;
          font-size: 15px;
          line-height: 16px;
          color: #888;
        }
      }
      span {
        display: inline;
        position: absolute;
        top: 25%;
        right: 24px;
      }
      svg {
        float: right;
      }
      
      @media screen and (min-width: 768px) {
        //padding-top: 52px;
      }
      
    `,
    Button: styled.div`
      top: 8px;
      right: 8px;
      font-size: 14px;
      position: absolute;
    `,
    ContentsWrapper : styled.div<{isCollapsed: boolean}>`
      max-height: 0;
      overflow: hidden;
      transition: all .5s;
      ${props => props.isCollapsed && css`
        height: auto;
        max-height: 100vh;
        transition: all 0.5s;
      `};
      display: block;
      font-size: 15px;
      line-height: 22px;
      color: #333;
      letter-spacing: -1px;
      padding: 0 24px;
      margin: 5px 0 14px 0;
      .contentStyle {
        padding-top: 16px;
      }
    `,

    Contents : styled.div`
      padding-top: 26px;
      overflow: visible;
    `


}


function Accordion({ isFaq, category ,title, children, expand=false, date, postNum, clickable=false } : Props) {

    const wholeRef = useRef<HTMLDivElement>(null)
    const parentRef = useRef<HTMLDivElement>(null)
    const childRef = useRef<HTMLDivElement>(null)
    const [isCollapse, setIsCollapse] = useState(expand)
    const scrolledTopLength = window.pageYOffset; // 스크롤된 길이


    useEffect(()=>{
        if(wholeRef.current === null)
            return
        if(expand){
            setIsCollapse(true)
            window.scroll({
                top: scrolledTopLength + wholeRef.current.getBoundingClientRect().y - 100,
                behavior: 'smooth'
            })
        }else{
            setIsCollapse(false)
        }
    },[expand])


    const clickableItemHandler = () => {
        if(wholeRef.current === null)
            return
        if(clickable){
            setIsCollapse(!isCollapse)
            window.scroll({
                top: scrolledTopLength + wholeRef.current.getBoundingClientRect().y - 100,
                behavior: 'smooth'
            })
        }else{
            return
        }
    }


    return(
        <S.Container>
            <S.Header ref={wholeRef} onClick={ () => clickableItemHandler()} >
                <div className='textWrapper'>
                    {category? <em>Q {category}<br/></em> : <></>}
                    {title}
                    <h6>{ (date && postNum) && <>{date}..{postNum}</>}</h6>
                </div>
                <span>
                    {
                        isCollapse
                            ? <Minus style={{marginTop: 0}} color={colors.pointBlue}/>
                            :<Plus style={{marginTop: 0}}/>
                    }
                </span>
            </S.Header>
            <S.ContentsWrapper ref={parentRef} isCollapsed={isCollapse} >
                <S.Contents ref={childRef}>{children}</S.Contents>
            </S.ContentsWrapper>
        </S.Container>
    )

}

export default React.memo(Accordion);
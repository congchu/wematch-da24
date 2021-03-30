import * as React from 'react'
import {ReactHTML, useEffect, useRef, useState} from "react"
import styled from 'styled-components'
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
    urlDetector?: boolean;
    animation?: boolean;
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
      
      height: 0;
      width: inherit;
      //padding: 0 8px;
      //overflow: auto;
      overflow: auto;
      transition: height 0.35s ease, background 0.35s ease;
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


function AccordionCollapse({ isFaq, category ,title, children, expand=false, date, postNum, urlDetector, animation } : Props) {

    const wholeRef = useRef<HTMLDivElement>(null)
    const parentRef = useRef<HTMLDivElement>(null)
    const childRef = useRef<HTMLDivElement>(null)
    const [isCollapse, setIsCollapse] = useState(expand)


    useEffect(()=>{
        if (parentRef.current === null || childRef.current === null) {
            return;
        }
        if(urlDetector){
            parentRef.current.focus()
            // parentRef.current.style.height = `${childRef.current.clientHeight}px`
            parentRef.current.style.height = animation ? `${childRef.current.clientHeight}px` : `auto`
        }else{
            parentRef.current.style.height = "0"
        }
    },[urlDetector])

    const handleButtonClick = React.useCallback(
        (event) => {
            event.stopPropagation();
            if (parentRef.current === null || childRef.current === null) {
                return;
            }
            if (parentRef.current.clientHeight > 0) {
                parentRef.current.style.height = "0"
            } else {
                parentRef.current.style.height = `${childRef.current.clientHeight}px`
            }
            setIsCollapse(!isCollapse);
        },
        [isCollapse]
    );




    return(
        <S.Container>
            <S.Header ref={wholeRef} >
                <div className='textWrapper'>
                    {isFaq? <em>Q {category ? category : '공통'}<br/></em> : <></>}
                    {title}
                    <h6>{ (date && postNum) && <>{date}..{postNum}</>}</h6>
                </div>
                {/*<span>{icon}</span>*/}
                <span>
                    {
                        urlDetector
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

export default React.memo(AccordionCollapse);
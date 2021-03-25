import * as React from 'react'
import styled from 'styled-components'
import {Minus, Plus} from 'components/wematch-ui/Icon'
import * as colors from 'styles/colors'
import {useEffect, useRef, useState} from "react";
import {useRouter} from "../../../hooks/useRouter";

export type faqCategory = '공통' | '이사' | '청소'

interface Props extends React.HTMLAttributes<HTMLDivElement>  {
    category?: faqCategory;
    title: string;
    date?:string;
    postNum?:number;
    defaultExpand?: boolean;
    expand?: boolean;
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
      overflow: ${props => props.isCollapsed ? 'auto': 'hidden'};
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
      padding-top: 16px;
    `


}


function AccordionCollapse({ category ,title, children, expand=false, date, postNum } : Props) {

    const router = useRouter()
    const wholeRef = useRef<HTMLDivElement>(null)
    const parentRef = useRef<HTMLDivElement>(null)
    const childRef = useRef<HTMLDivElement>(null)
    const [isCollapse, setIsCollapse] = useState(expand)
    const [selected, setSelected] = useState< null | number >(null)
    const icon = !isCollapse ? <Plus style={{marginTop: 0}}/> : <Minus style={{marginTop: 0}} color={colors.pointBlue}/>

    // const handleButtonClick = React.useCallback(
    //     (event) => {
    //         event.stopPropagation();
    //         if (parentRef.current === null || childRef.current === null) {
    //             return;
    //         }
    //         if (parentRef.current.clientHeight > 0) {
    //             parentRef.current.style.height = "0"
    //         } else {
    //             parentRef.current.style.height = `${childRef.current.clientHeight}px`
    //         }
    //         setIsCollapse(!isCollapse);
    //     },
    //     [isCollapse]
    // );
    //

    const handleButtonClick = () => {
        if (parentRef.current === null || childRef.current === null) {
            return;
        }
        if(parentRef.current.clientHeight > 0){ //자기자신 누르면 (열려있을대 닫기)
            parentRef.current.style.height = "0"
            // setSelected(null)
            router.push(`/notice`)
        }else if (!expand && postNum){ // 다른 아이템 누르면 expand 가 false였는데 눌리면
            // setSelected(postNum)
            router.push(`/notice/${postNum}`)
        }else{
            parentRef.current.style.height = `${childRef.current.clientHeight}px`
            if(postNum){
            // setSelected(postNum)
            router.push(`/notice/${postNum}`)
            }
        }
        setIsCollapse(!isCollapse)
    }


    /* 선택된 아이템 구분 expand = selected의 의미  */
    useEffect(() => {
        if (parentRef.current === null || childRef.current === null) {
            return;
        }
        if (expand) {
            /* 열릴때 */
            parentRef.current.style.height = `${childRef.current.clientHeight}px`
            setIsCollapse(true)
        } else {
            /* 닫힐때 */
            parentRef.current.style.height = "0"
            setIsCollapse(false)
        }
    }, [expand])




    return(
        <S.Container>
            <S.Header onClick={handleButtonClick} ref={wholeRef}>
            {/*<S.Header onClick={() => setSelected(postNum?postNum:null)} ref={wholeRef}>*/}
                <div className='textWrapper'>
                    {category? <em>Q {category}<br/></em> : <></>}
                    {title}
                    <h6>{ (date && postNum) && <>{date}..{postNum}</>}</h6>
                </div>
                <span>{icon}</span>
            </S.Header>
            <S.ContentsWrapper ref={parentRef} isCollapsed={isCollapse} >
                <S.Contents ref={childRef}>{children}</S.Contents>
            </S.ContentsWrapper>
        </S.Container>
    )



}

export default React.memo(AccordionCollapse);
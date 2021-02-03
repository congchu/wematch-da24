import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import * as colors from 'styles/colors'

import {Minus, Plus} from 'components/wematch-ui/Icon'

export type faqCategory = '공통' | '이사' | '청소';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    category?: string;
    title?: string;
    date?:string;
    postNum?:string;
    defaultExpand: boolean;
}


const S = {
    TopTitleWrap: styled.div`
      overflow: hidden;
      line-height: 1.5;
      color: #333;
      font-weight: 600;
      padding: 0px 64px 16px 24px;
      background-size: 16px;
      cursor: pointer;
      font-size: 16px;
      letter-spacing: -1px;

      svg {
        float: right;
      }

      em {
        font-size: 16px;
        color: #1672f7;
        letter-spacing: -1px;

      }

      span {
        font-size: 16px;
        letter-spacing: -1px;
      }

      @media screen and (min-width: 768px) {
        //padding-top: 52px;
      }
    `,
    TitleWrap: styled.div`
      overflow: hidden;
      line-height: 1.5;
      color: #333;
      font-weight: 600;
      font-size: 16px;
      letter-spacing: -1px;
      padding: 0px 64px 0px 24px;
      background-size: 16px;
      cursor: pointer;
      position: relative;
      
      .textWrapper {
        display: inline-block;
        em {
          color: #1672f7;
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
      
    h6{
      font-weight: normal;
      display: block;
      font-size: 15px;
      line-height: 16px;
      color: #888;
    }
      
      @media screen and (min-width: 768px) {
        //padding-top: 52px;
      }
    `,
    Container: styled.div<{expand: boolean}>`
        display: ${props => props.expand ? 'block' : 'none'};
        //border-bottom: 1px solid #EBEEF2;
        padding-top: 16px;
    `,
    AnswerWrap: styled.div`
        display: block;
        font-size: 15px;
        line-height: 22px;
        color: #333;
        letter-spacing: -1px;
        padding: 5px 24px 14px 24px;
        
    `
}

/*
* < USAGE >  JAN.2021
* FAQ : category, title, defaultExpand
* 공지사항 : title, date, postNum
* */
export default function Collapsed({ category ,title, children, defaultExpand, date, postNum }: Props) {

    const [expand, setExpand] = useState(true)


    useEffect( () => {
        setExpand(defaultExpand)
    },[])

    return(
        <>
            <S.TitleWrap onClick={() => setExpand(!expand)} className="toggle">
                <div className='textWrapper'>
                    {category? <em>Q {category}<br/></em> : <></>}
                    {title}
                    <h6>{date && <>{date}..{postNum}</>}</h6>
                </div>
                <span>{expand ? <Plus style={{marginTop: 0}}/> : <Minus style={{marginTop: 0}} color={colors.pointBlue}/>}</span>
            </S.TitleWrap>
            <S.AnswerWrap>
                <S.Container expand={expand}>
                    {children}
                </S.Container>
            </S.AnswerWrap>
        </>

    )

}

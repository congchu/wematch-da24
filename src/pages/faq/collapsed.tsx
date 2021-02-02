import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import * as colors from 'styles/colors'
import Layout from 'components/base/Layout'
import CollapseItem from "./collapseItem";
import {Down, Minus, Plus, Up} from "../../components/wematch-ui/Icon";

export type faqCategory = '공통' | '이사' | '청';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    category?: string;
    title?: string;
    defaultExpand: boolean;
}


const S = {
    TopTitleWrap: styled.div`
      overflow: hidden;
      font-size: 14px;
      line-height: 1.5;
      color: #333;
      font-weight: 600;
      padding: 0px 64px 16px 24px;
      background-size: 16px;
      cursor: pointer;

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
      font-size: 14px;
      line-height: 1.5;
      color: #333;
      font-weight: 600;
      padding: 0px 64px 16px 24px;
      background-size: 16px;
      cursor: pointer;

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
    Container: styled.div<{expand: boolean}>`
    display: ${props => props.expand ? 'block' : 'none'};
    //border-bottom: 1px solid #EBEEF2;
    `,
    AnswerWrap: styled.div`
        display: block;
        font-size: 15px;
        line-height: 22px;
        color: #333;
        letter-spacing: -1px;
        padding: 5px 24px 14px 24px
    `
}

export default function Collapsed({ category ,title, children, defaultExpand }: Props) {

    const [expand, setExpand] = useState(true)


    useEffect( () => {
        setExpand(defaultExpand)
    },[])

    return(
        <>
            <S.TopTitleWrap onClick={() => setExpand(!expand)} className="toggle">
                <em>Q{category}</em>
                <br/>
                <span>{title}</span>
                {expand ? <Plus style={{marginTop: 0}}/> : <Minus style={{marginTop: 0}} color={colors.pointBlue}/>}
            </S.TopTitleWrap>
            <S.AnswerWrap>
                <S.Container expand={expand}>
                    {children}
                </S.Container>
            </S.AnswerWrap>
        </>

    )

}

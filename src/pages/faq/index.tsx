import React, {useState} from 'react'
import styled from 'styled-components'
import * as colors from 'styles/colors'
import Layout from 'components/base/Layout'
import CollapseItem from "./collapseItem";
import {Down, Minus, Plus, Up} from "../../components/wematch-ui/Icon";
import Collapsed from "./collapsed";

export type faqCategory = '공통' | '이사' | '청';

const S = {
    TitleWrap: styled.div`
      overflow: hidden;
      svg {
        float: right;
      }
      
      em {
        font-size: 16px;
        color: #1672f7;
        letter-spacing: -1px;
        font-weight: 500
      }
      
      span {
        font-size: 16px;
        letter-spacing: -1px;
        font-weight: 500
      }
      
      @media screen and (min-width: 768px) {
        //padding-top: 52px;
      }
    `,
}

export default function FaqPage() {

    const [expand, setExpand] = useState(true)


    return(
        <Layout title="자주 묻는 질문">
            {/*이렇게 나중에 나누기*/}
            <Collapsed category='공통' title='소비자평가등급은 무엇인가요?' defaultExpand={true}>
                이사/청소 업체의 서비스 품질을 가장 정확하게 예측할 수 있는 객관적인 지표입니다. <br/>
                소고기, 호텔 등을 고를 때 공인된 등급을 확인하듯, 이사/청소 업체 선택 시 가장 합리적인 기준이 됩니다. <br/>
                <br/>
                소비자평가등급에 대해 보다 자세한 내용은 아래 링크에서 확인해주세요.<br/>
                <br/>
                <a href="https://da24.wematch.com/da24.asp">바로가기 >></a>
            </Collapsed>
        </Layout>
    )

}

import React from 'react'
import styled from 'styled-components'

import Layout from 'components/base/Layout'
import AccordionCollapse from 'components/common/AccordionCollapse'

export type faqCategory = '공통' | '이사' | '청소';

const S = {
    CollapsedWrap: styled.div `
      padding-top: 18px;
      border-bottom: 1px solid #d7dbe2;
    `,
    TopCollapsedWrap: styled.div`
      padding-top: 0px;
      border-bottom: 1px solid #d7dbe2;
    `
}

export default function NoticePage() {

    return(
        <Layout title="공지사항">
            {/* Notice : TopCollaseWrap is seperated for proper padding */}
            <S.TopCollapsedWrap>
                <AccordionCollapse title='[공지사항]공지사항' date='YYYY.MM.DD' postNum='NNN' defaultExpand={true} >
                    공지사항 내용
                </AccordionCollapse>
            </S.TopCollapsedWrap>
            <S.CollapsedWrap>
                <AccordionCollapse title='[공지사항]공지사항' date='YYYY.MM.DD' postNum='NNN' defaultExpand={false} >
                    공지사항 내용
                </AccordionCollapse>
            </S.CollapsedWrap>
            <S.CollapsedWrap>
                <AccordionCollapse title='[공지사항]공지사항' date='YYYY.MM.DD' postNum='NNN' defaultExpand={false} >
                    공지사항 내용
                </AccordionCollapse>
            </S.CollapsedWrap>
            <S.CollapsedWrap>
                <AccordionCollapse title='[공지사항]공지사항' date='YYYY.MM.DD' postNum='NNN' defaultExpand={false} >
                    공지사항 내용
                </AccordionCollapse>
            </S.CollapsedWrap>

        </Layout>
    )

}

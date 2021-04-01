import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'

import Layout from 'components/base/Layout'
import AccordionCollapse from 'components/common/Accordion'

import * as backofficeSelector from 'store/backoffice/selectors'
import * as backofficeActions from 'store/backoffice/actions'
import * as colors from 'styles/colors'


export type faqCategory = '공통' | '이사' | '청소'

const S = {
    CollapsedWrap: styled.div<{index?: number}> `
      padding-top: ${props => props.index === 0 ? '0px' : '18px'};
      border-bottom: 1px solid ${colors.lineDefault};
      pre{
        white-space: pre-wrap;
        img{
          max-width: 100%;
          height: auto;
        }
        p{
          width: 100%;
        }
      }
    `,
    TopCollapsedWrap: styled.div`
      padding-top: 0px;
      border-bottom: 1px solid ${colors.lineDefault};
    `
}

export default function FaqPage() {


    const dispatch = useDispatch()
    const getFaqList = useSelector(backofficeSelector.getFaqList)

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])


    useEffect(() => {
        dispatch(backofficeActions.fetchFaqListAsync.request())
    }, [])


    return(
        <Layout title="자주 묻는 질문">
            <div>
                {getFaqList.faq?.map((faq, index) => {
                    return (
                        <S.CollapsedWrap key={index} index={index} >
                            <AccordionCollapse key={index} category={faq.service_type ? faq.service_type : '공통'} title={faq.title} postNum={faq.id}>
                                {/*{notice.contents}*/}
                                <pre dangerouslySetInnerHTML={{__html: faq.contents}} />
                            </AccordionCollapse>
                        </S.CollapsedWrap>
                    )
                })}
            </div>
        </Layout>
    )

}


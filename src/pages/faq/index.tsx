import React, {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'

import Layout from 'components/base/Layout'
import AccordionCollapse from 'components/common/AccordionCollapse'

import * as backofficeSelector from 'store/backoffice/selectors'
import * as backofficeActions from 'store/backoffice/actions'
import * as values from 'constants/values'

export type faqCategory = '공통' | '이사' | '청소'

const S = {
    CollapsedWrap: styled.div<{index?: number}> `
      padding-top: ${props => props.index === 0 ? '0px' : '18px'};
      border-bottom: 1px solid #d7dbe2;
      .first1 {
        padding-top: 0px;
        border-bottom: 1px solid #d7dbe2;
      }
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
      border-bottom: 1px solid #d7dbe2;
    `
}

export default function FaqPage() {

    const nextPage = useRef(1)
    // const [isFetching, setIsFetching] = useInfiniteScroll(moreNotice)

    const dispatch = useDispatch()
    const getFaqList = useSelector(backofficeSelector.getFaqList)

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])


    useEffect(() => {
        dispatch(backofficeActions.fetchFaqListAsync.request({
            page: 1,
            size: values.DEFAULT_NOTICE_LIST_SIZE
        }))
    }, [])


    useEffect( () => {

        if (getFaqList.moreLoading || getFaqList.hasMore ) {
            nextPage.current += 1
            dispatch(backofficeActions.fetchFaqMoreListAsync.request({
                page: nextPage.current,
                size: values.DEFAULT_NOTICE_LIST_SIZE
            }))
        }

    }, [getFaqList.moreLoading, getFaqList.hasMore, getFaqList.loading])

    return(
        <Layout title="자주 묻는 질문">
            <div>
                {getFaqList.faq?.map((faq, index) => {
                    return (
                        <S.CollapsedWrap key={index} index={index}>
                            <AccordionCollapse isFaq key={index} category={faq.service_type} title={faq.title} postNum={faq.id} animation>
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

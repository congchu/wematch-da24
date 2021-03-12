import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'

import Layout from 'components/base/Layout'
import AccordionCollapse from 'components/common/AccordionCollapse'

import * as backofficeActions from 'store/backoffice/actions'
import * as backofficeSelector from 'store/backoffice/selectors'
import * as values from 'constants/values'


export type faqCategory = '공통' | '이사' | '청소';


const S = {
    CollapsedWrap: styled.div<{index?: number}> `
      padding-top: ${props => props.index === 0 ? '0px' : '18px'};
      border-bottom: 1px solid #d7dbe2;

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
}

export default function NoticePage() {

    // const moreNotice = () => {
    //     nextPage.current += 1
    //     dispatch(backofficeActions.fetchNoticeMoreListAsync.request({
    //         page: nextPage.current,
    //         size: values.DEFAULT_NOTICE_LIST_SIZE
    //     }))
    //     setIsFetching(false)
    // }

    const nextPage = useRef(1)
    // const [isFetching, setIsFetching] = useInfiniteScroll(moreNotice)

    const dispatch = useDispatch()
    const getNoticeList = useSelector(backofficeSelector.getNoticeList)

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])


    useEffect(() => {
        dispatch(backofficeActions.fetchNoticeListAsync.request({
            page: 1,
            size: values.DEFAULT_NOTICE_LIST_SIZE
        }))
    }, [])


    useEffect( () => {

        if (getNoticeList.moreLoading || getNoticeList.hasMore ) {
            nextPage.current += 1
            dispatch(backofficeActions.fetchNoticeMoreListAsync.request({
                page: nextPage.current,
                size: values.DEFAULT_NOTICE_LIST_SIZE
            }))
        }

    }, [getNoticeList.moreLoading, getNoticeList.hasMore, getNoticeList.loading])



    return(
        <Layout title="공지사항">
            <div>
                {getNoticeList.notices?.map((notice, index) => {
                    return (
                        <S.CollapsedWrap key={index} index={index}>
                            <AccordionCollapse key={index} title={notice.title} date={notice.created_at} postNum={notice.id}>
                                {/*{notice.contents}*/}
                                <pre dangerouslySetInnerHTML={{__html: notice.contents}} />
                            </AccordionCollapse>
                        </S.CollapsedWrap>
                    )
                })}
            </div>
        </Layout>
    )

}


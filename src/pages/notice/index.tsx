import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'

import Layout from 'components/base/Layout'
import Accordion from 'components/common/Accordion'

import * as backofficeActions from 'store/backoffice/actions'
import * as backofficeSelector from 'store/backoffice/selectors'
import * as colors from 'styles/colors'


export type faqCategory = '공통' | '이사' | '청소';


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
}

export default function NoticePage() {

    const dispatch = useDispatch()
    const getNoticeList = useSelector(backofficeSelector.getNoticeList)

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(backofficeActions.fetchNoticeListAsync.request())
    }, [])


    return(
        <Layout title="공지사항">
            <div>
                { getNoticeList.notices?.map((notice, index) => {
                    return (
                        <S.CollapsedWrap key={index} index={index}>
                            <Accordion key={index} title={notice.title} date={notice.created_at} postNum={notice.id}>
                                {/*{notice.contents}*/}
                                <pre dangerouslySetInnerHTML={{__html: notice.contents}} />
                            </Accordion>
                        </S.CollapsedWrap>
                    )
                })}
            </div>
        </Layout>
    )

}



import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams,Link} from 'react-router-dom'
import {useRouter} from 'hooks/useRouter'
import styled from 'styled-components'

import Layout from 'components/base/Layout'
import AccordionCollapse from 'components/common/Accordion'

import * as backofficeActions from 'store/backoffice/actions'
import * as backofficeSelector from 'store/backoffice/selectors'
import * as values from 'constants/values'
import {INotice} from "../../types/backoffice";


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

    const dispatch = useDispatch()
    const router = useRouter()
    const params = useParams<{ id: string}>()
    const getNoticeList = useSelector(backofficeSelector.getNoticeList)
    const [url, setUrl] = useState('/notice')


    useEffect(() => {
        if(params.id){
            setUrl('/notice/'+params?.id+'/')
        }

        /**** PAGE SIZE 지우기 ***/
        dispatch(backofficeActions.fetchNoticeListAsync.request({
            page: 1,
            size: values.DEFAULT_NOTICE_LIST_SIZE
        }))
    }, [])


    const clicker = (idx: number) => {
        if(url.includes('/'+idx)){
            setUrl('/notice')
        }else{
            setUrl('/notice/'+idx+'/')
        }
    }

    useEffect(()=>{
        router.push(url)
    },[url])


    return(
        <Layout title="공지사항">
            <div>
                { getNoticeList.notices?.map((notice, index) => {
                    return (
                        <S.CollapsedWrap key={index} index={index} className='collapseItem'
                                         onClick={(e) => clicker(notice.id)}>
                            <AccordionCollapse
                               key={index} title={notice.title}
                               date={notice.created_at} postNum={notice.id}
                               expand={url.includes('/'+notice.id+'/')}
                            >
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



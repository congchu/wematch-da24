import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {useRouter} from 'hooks/useRouter'
import styled from 'styled-components'

import Layout from 'components/base/Layout'
import AccordionCollapse from 'components/common/AccordionCollapse'

import * as backofficeActions from 'store/backoffice/actions'
import * as backofficeSelector from 'store/backoffice/selectors'
import * as values from 'constants/values'
import {number} from "@storybook/addon-knobs";


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
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState< null | number >(parseInt(params?.id))

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])


    useEffect(() => {
        dispatch(backofficeActions.fetchNoticeListAsync.request({
            page: 1,
            size: values.DEFAULT_NOTICE_LIST_SIZE
        }))
        setLoading(false)
    }, [dispatch])


    // useEffect(()=>{
    //     if(selected){
    //         router.push(`/notice/${selected}`)
    //     }
    //     else{
    //         router.push(`/notice`)
    //     }
    // },[selected])

    const selection = document.querySelectorAll('.collapseItem')
    // function collapseSetting(){
    //     selection.forEach(l => l.classList.remove('active'))
    // }
    // selection.forEach(l => l.addEventListener('click', collapseSetting))

    return(
        <Layout title="공지사항">
            <div>
                { !loading && getNoticeList.notices?.map((notice, index) => {
                    return (
                        <S.CollapsedWrap key={index} index={index} className='collapseItem' onClick={(e) => {
                            setSelected(notice.id)
                            // selection.forEach(l => l.classList.remove('active'))
                        }}>
                            <AccordionCollapse
                               key={index} title={notice.title}
                               date={notice.created_at} postNum={notice.id}
                               expand={selected === notice.id}
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



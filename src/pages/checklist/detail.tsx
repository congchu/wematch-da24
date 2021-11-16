import React from 'react'
import styled, { css } from 'styled-components'
import Layout from 'components/base/Layout'
import { useParams } from 'react-router-dom'

const S = {
  ImageContainer: styled.div`
    padding: 0;
    display: block;
    margin: 0;
    width: 100%;
    overflow: hidden;

    @media screen and (min-width: 768px) {
      width: 608px;
      margin: 0 auto;
    }
    @media screen and (min-width: 1200px) {
      overflow: visible;
      position: relative;
      width: 720px;
      margin: 0 auto;
    }
    img {
      display: block;
      width: 100%;
    }
  `
}


type checklistType = 'moveestimation'| 'cleanestimation'| 'moveprep'| 'cleancheck';

function ChecklistDetail() {
  /** */
  const params = useParams<{ type: checklistType }>()

  const list = {
    moveestimation: { imageUrl: 'https://da24.wematch.com/img/etc/1.%20wematch_checklist_move_visit.jpg', alt: '이사 견적 시 체크리스트' },
    cleanestimation: { imageUrl: 'https://da24.wematch.com/img/etc/4.%20wematch_checklist_clean_call.jpg', alt: '청소 견적 시 체크리스트' },
    moveprep: { imageUrl: 'https://da24.wematch.com/img/etc/3.%20wematch_checklist_move_prepare.jpg', alt: '이사 준비 체크리스트' },
    cleancheck: { imageUrl: 'https://da24.wematch.com/img/etc/5.%20wematch_checklist_clean_after.jpg', alt: '청소 당일 점검 사항' }
  }

  return (
    <Layout
      title="체크리스트"
      subTitle={
        <>
          이사/청소 준비 어려우셨죠?
          <br />
          체크리스트만 따라해보세요!
        </>
      }>
      <S.ImageContainer>
        <img src={list[params.type].imageUrl} alt="청소 견적 시 체크리스트" />
      </S.ImageContainer>
    </Layout>
  )
}

export default ChecklistDetail

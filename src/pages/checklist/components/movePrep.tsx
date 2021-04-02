import React from 'react'
import styled, { css } from 'styled-components'
import Layout from 'components/base/Layout'


const S = {

    ImageContainer: styled.div`
      padding: 0;
      display: block;
      margin: 0;
      width: 100%;
      overflow: hidden;

      @media screen and (min-width: 768px){
        width: 608px;
        margin: 0 auto;
      }
      @media screen and (min-width: 1200px){
      overflow: visible;
      position: relative;
      width: 720px;
      margin: 0 auto;
      }
      img{
        display: block;
        width: 100%;
      }
      
    `,


}




function MovePrep() {
    return (
        <Layout title='체크리스트' subTitle={<>이사/청소 준비 어려우셨죠?<br/>체크리스트만 따라해보세요!</>}>
            <S.ImageContainer>
                <img src="https://da24.wematch.com/img/etc/3.%20wematch_checklist_move_prepare.jpg" alt="이사 준비 체크리스트"/>
            </S.ImageContainer>
        </Layout>
    )

}

export default MovePrep

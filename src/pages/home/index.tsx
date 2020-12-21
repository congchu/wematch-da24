import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useCookies } from 'react-cookie'
import queryString from 'query-string'
import { RouteComponentProps } from 'react-router'
import useScrollDirection from 'hooks/useScrollDirection'

import MainHeader from 'components/common/MainHeader'
import MoveForm from 'pages/home/components/MoveForm'
import MainVisual from 'pages/home/components/MainVisual'
import Review from 'pages/home/components/Review'
import PartnerBanner from 'pages/home/components/PartnerBanner'
import MainFooter from 'components/common/MainFooter'
import BottomNav from 'components/common/BottomNav'
import NewModal from 'components/NewModalTemplate'

import * as colors from 'styles/colors'

const S = {
    Container: styled.div``,
    Group: styled.div``,
    Wrapper: styled.div`
      position: relative;
      width: 100%;
      margin-top: -75px;
      z-index: 1;
      border-top-left-radius: 32px;
      border-top-right-radius: 32px;
      background: ${colors.white};
      //box-shadow: 0px -4px 30px rgba(0, 0, 0, 0.2);
      
      @media (min-width: 1200px) {
        max-width: 768px;
        left: 50%;
        transform: translate(-50%, 0);
        margin-top: -36px;
        
        box-shadow: none;
      }
    `,
}

const Home:React.FC<RouteComponentProps> = ({ location}) => {
    const [cookies, setCookie] = useCookies(['0dj38gepoekf98234aplyadmin'])
    const HomeRef = useRef<HTMLDivElement>(null)
    const [isFixed, setIsFixed] = useScrollDirection()

    useEffect(() => {
        const mda = queryString.parse(location.search).mda || '';
        setCookie('0dj38gepoekf98234aplyadmin', `agentid=${mda}`)
    }, [])

    return (
        <S.Container ref={HomeRef}>
            <S.Group ref={HomeRef}>
                <MainHeader isFixed={isFixed} />
                <MainVisual />
            </S.Group>
            <S.Wrapper>
                <MoveForm headerRef={HomeRef} isFixed={isFixed} setIsFixed={setIsFixed} />
                <Review />
                <PartnerBanner />
            </S.Wrapper>
            <MainFooter />
            <BottomNav />
            {/*인증번호 초과 모달*/}
            {/*<NewModal visible={true} title={"인증번호 입력시간 초과"} content={"인증번호 입력가능시간이 초과 되었습니다. 인증번호를 다시 받아주세요!"} confirmText={"확인"}/>*/}
            {/*필수정보 미입력 모달*/}
            {/*<NewModal visible={true} title={"필수정보 미입력"} content={"로그인/가입을 위한 필수정보를 입력해주세요! (이름,휴대폰번호,인증번호)"} confirmText={"확인"}/>*/}
            {/*로그인/가입 취소 모달*/}
            {/*<NewModal visible={true} title={"로그인/가입 취소"} content={"로그인/가입을 취소하시면 내 신청내역을 확인할 수 없습니다. 취소하시겠어요?"} confirmText={"계속 진행하기"} cancelText={"취소"}/>*/}
        </S.Container>
    )
}

export default Home;

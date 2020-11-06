import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useCookies } from 'react-cookie'
import queryString from 'query-string'
import { RouteComponentProps } from 'react-router'
import useScrollDirection from 'hooks/useScrollDirection'

import MainHeader from 'pages/new/components/MainHeader'
import MoveForm from 'pages/new/components/MoveForm'
import MainVisual from 'pages/new/components/MainVisual'
import Review from 'pages/new/components/Review'
import PartnerBanner from 'pages/new/components/PartnerBanner'
import MainFooter from 'pages/new/components/MainFooter'
import BottomNav from 'pages/new/components/BottomNav'

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
        </S.Container>
    )
}

export default Home;

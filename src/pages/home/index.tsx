import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useCookies } from 'react-cookie'
import queryString from 'query-string'
import { RouteComponentProps } from 'react-router'

import MainHeader from 'components/common/MainHeader'
import MoveForm from 'pages/home/components/MoveForm'
import MainFooter from 'components/common/MainFooter'
import BottomNav from "components/common/BottomNav"
import TipList from 'components/da24/main/TipList'
import ServiceCenterList from 'components/da24/main/ServiceCenterList'
import * as colors from 'styles/colors';
import * as constants from 'constants/env';
import ConfirmPopup from 'pages/partner/Cart/component/ConfirmPopup'

const S = {
    Container: styled.div`
        @media (min-width: 768px) {
            margin: 0 auto;
            width: 720px;
        }
    `,
    Content: styled.div`
      
    `,
    CheckListBanner: styled.div`
        display: block;
        overflow: hidden;
        position: relative;
        height: 88px;
        background-color: ${colors.pointSky};
        
        a {
            display: block;
            position: relative;
            height: 100%;
            padding: 24px;
            font-size: 16px;
            line-height: 24px;
            color: ${colors.white};
            letter-spacing: -1px;
            box-sizing: border-box;
        }  
        
        strong {
            display: block;
            font-weight: bold;
        }
        p {
            margin-top: 2px;
        }
        
        .dot {
            display: inline-block;
            width: 4px;
            height: 4px;
            margin: 12px 0 0 6px;
            border-radius: 4px;
            background-color: #f0fd26;
            vertical-align: top;
        }
        
        .icon {
            position: absolute;
            top: 50%;
            right: 16px;
            width: 56px;
            height: 56px; 
            margin-top: -28px;
            background-repeat: no-repeat;
            background-size: 100% auto;
            background-image: url('//marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/icon/icon_report.png')
        }
    `,
    CampaignBannerContainer: styled.div`
        margin-left: 16px;
        margin-right: 24px;
    `,
    CampaignBanner: styled.div`
        display: block;
        overflow: hidden;
        position: relative;
        height: 200px;
        margin: 27px 0;
        border-radius: 8px;
        background: url('//marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/bg/m/bg_happymove.png') 0 -2px no-repeat;
        background-size: 100% auto;
        box-shadow: 0 4px 10px rgba(188, 192, 198, .4);
        
        img {
            display:block;
            width:100%;
            vertical-align:top;
        }
        
        a {
            height: 100%;
            padding: 24px;
            font-size: 16px;
            line-height: 24px;
            color: ${colors.white};
            letter-spacing: -1px;
            box-sizing: border-box;
            
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            
            strong {
                font-size:13px;
                line-height:20px;
            }
            
            p {
                position:absolute;
                bottom:20px;
                left:24px;
                font-size:18px;
                line-height:26px;
            }
        }
    `,
    PartnerBanner: styled.div`
        border-top: 1px solid ${colors.lineDeco};
        display: block;
        overflow: hidden;
        position: relative;
        height: 88px;
        
        a {
            display: block;
            position: relative;
            height: 100%;
            padding: 24px;
            font-size: 16px;
            line-height: 24px;
            color: ${colors.gray33};
            letter-spacing: -1px;
            box-sizing: border-box;
        }  
        
        strong {
            display: block;
            font-weight: bold;
        }
        p {
            margin-top: 2px;
        }
                
        .icon {
            position: absolute;
            top: 50%;
            right: 16px;
            width: 56px;
            height: 56px; 
            margin-top: -28px;
            background-repeat: no-repeat;
            background-size: 100% auto;
            background-image: url('//marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/icon/service_move.png')
        }
        
         @media (min-width: 768px) {
            border-top: none;
        }
    `,
}

const ServiceList = {
    Section: styled.section`
        padding: 40px 24px 28px;
        border-bottom: 8px solid #ebeef2;
        box-shadow: none;
    `,
    Title: styled.strong`
        display: block;
        font-weight: 700;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: -1px;
        margin-bottom: 20px;
    `,
    Tags: styled.ul`
        overflow: hidden;
        margin: 0 -5px;
    `,
    Tag: styled.li`
        float: left;
        margin: 0 5px 5px; 
        background: ${colors.lineDeco};
        border-radius: 20px;
        a {
            display:block;
            padding:10px 21px 6px;
            font-size:16px;
        }
    `,
}

const Home:React.FC<RouteComponentProps> = ({location}) => {
    const [cookies, setCookie] = useCookies(['0dj38gepoekf98234aplyadmin'])

    useEffect(() => {
        const mda = queryString.parse(location.search).mda || '';
        setCookie('0dj38gepoekf98234aplyadmin', `agentid=${mda}`)
    }, [])
    return (
        <>
            <MainHeader />
            <S.Container>
                <S.Content>
                    <MoveForm />
                    <ServiceList.Section>
                        <ServiceList.Title>이런 서비스도 필요하신가요?</ServiceList.Title>
                        <ServiceList.Tags>
                            <ServiceList.Tag><a href={constants.MAIN_URL + '/용달_화물'}>용달/화물</a></ServiceList.Tag>
                            <ServiceList.Tag><a href={constants.MAIN_URL + '/도어락'}>도어락</a></ServiceList.Tag>
                            <ServiceList.Tag><a href={constants.MAIN_URL + '/줄눈시공'}>줄눈시공</a></ServiceList.Tag>
                        </ServiceList.Tags>
                    </ServiceList.Section>
                    <TipList title="좋은 이사업체를 잘 찾는 공식" />
                    <S.CheckListBanner>
                        <a href={`${constants.MOVE_URL}/checklist.asp`}>
                            <strong>이사 준비 어려우셨죠?</strong>
                            <p>
                                체크리스트만 따라해보세요 <span className="dot" />
                            </p>
                            <span className="icon" />
                        </a>
                    </S.CheckListBanner>
                    <ServiceCenterList title="고객센터" />
                    <S.CampaignBannerContainer>
                        <S.CampaignBanner>
                            <img src="https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/bg/m/bg_happymove.png"
                                 alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,해피이사" />
                            <a href="https://marketdesigners.com/happyCampaign" target="_blank">
                                <strong>해피이사 캠페인 #3</strong>
                                <p>
                                    도움이 필요한 이웃과 <br />
                                    도움을 줄수 있는 전문업체를 <br />
                                    연결하고 지원합니다.
                                </p>
                            </a>
                        </S.CampaignBanner>
                    </S.CampaignBannerContainer>
                    <S.PartnerBanner>
                        <a href={constants.MOVE_URL + "/partnernew.asp"}>
                            <strong>위매치다이사의 파트너가 되세요</strong>
                            <p>업체 등록문의 하기</p>
                            <span className="icon" />
                        </a>
                    </S.PartnerBanner>
                </S.Content>
                <MainFooter />
                <BottomNav />
            </S.Container>
        </>
    )
}

export default Home;
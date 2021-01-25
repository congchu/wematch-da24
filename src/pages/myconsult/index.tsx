import BottomNav from 'components/common/BottomNav';
import MainHeader from 'components/common/MainHeader';
import useScrollDirection from 'hooks/useScrollDirection';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMedia } from 'react-use-media';
import styled from 'styled-components';
import * as colors from 'styles/colors'
import { ConsultCard, FindCard } from './components/MyConsultCard';
import * as userActions  from 'store/user/actions';
import { useDispatch } from 'react-redux';


const MyConsult = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const isDesktop = useMedia({
        minWidth: 1200,
      })

      const handleLogout = () => {
          //TODO: add logout logic

        history.replace('/');
      }

    useEffect(() => {
        dispatch(userActions.fetchUserConsultAsync.request({name: '강혜림', phone: '01026663903'}))
    }, [])


    return (
        <Container>
            {isDesktop && <MainHeader />}
            <Header>
                <div>
                    <span className="title">송인걸</span>
                    <span className="phone">010-****-9609</span>
                </div>
            </Header>
            <Content>
                <Wrapper>
                    <ContentTitle>내 신청내역</ContentTitle>
                    <Separator />
                    <ContentSection style={{marginBottom: '16px'}}>
                        <ContentSubTitle>
                            <span className="bold">STEP &nbsp; 1</span>
                            <span>&nbsp; &#124; &nbsp;입주/이사청소</span>
                        </ContentSubTitle>
                        <ContentList>
                            <FindCard title="입주/이사청소" link="https://wematch.com/clean_step_01.asp" />
                            <ConsultCard category={'clean'} link={'/'} categoryTitle={'원룸이사'} dateOfReceipt={'2020.02.04'} dateOfService={'2020.03.02'} />
                        </ContentList>
                    </ContentSection>
                    <ContentSection>
                        <ContentSubTitle>
                            <span className="bold">STEP &nbsp; 2</span>
                            <span>&nbsp; &#124; &nbsp;이사</span>
                        </ContentSubTitle>
                        <ContentList>
                            <FindCard title="이사" link="/" />
                        </ContentList>
                    </ContentSection>
                </Wrapper>
                <Wrapper>
                    <ContentTitle>지난 신청내역</ContentTitle>
                    <Separator />
                    {/* <ContentList>
                        
                    </ContentList> */}
                    <NoContent>
                        지난 신청내역이 없습니다.
                    </NoContent>
                    <Separator />
                    <LogoutWrapper>
                        <button onClick={handleLogout}>로그아웃</button>
                    </LogoutWrapper>
                </Wrapper>
            </Content>
            <BottomNav />
        </Container>
    )
}

export default MyConsult;

const Container = styled.div`
`;

const Header = styled.div`
    position: relative;
    width: 100%;
    height: 152px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    
    div {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 64px 0 24px 24px;
        box-sizing: border-box;
    }

    @media (min-width: 1200px) {
        div {
            max-width: 768px;
            left: 50%;
            transform: translate(-50%, 0);
            padding: 0;
            height: 100%;
            justify-content: flex-end;
            padding-bottom: 24px;
        }
    }

    .title {
        font-weight: 500;
        font-size: 24px;
        line-height: 36px;
        color: ${colors.gray33}
    }

    .phone {
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.5px;
        color: ${colors.gray33}
    }
`

const Content = styled.div`
    position: relative;
    padding: 0px 24px;

    @media (min-width: 1200px) {
        max-width: 768px;
        left: 50%;
        transform: translate(-50%, 0);
        padding: 0;
        box-shadow: none;
      }
`

const Wrapper = styled.div`
    width: 100%;
    padding-top: 24px;
`;

const ContentTitle = styled.h4`
    font-weight: 700;
    font-size: 20px;
    line-height: 30px;
    color: ${colors.gray33};
    padding-bottom: 16px;
`

const Separator = styled.div`
    width: 100%;
    border-bottom: 1px solid ${colors.lineDefault};
`;

const ContentSubTitle = styled.div`
    padding-top: 24px;
    padding-bottom: 16px;
    .bold {
        font-weight: 700;
    }

    span {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: ${colors.gray66};   
    }
`

const ContentSection = styled.div`
`

const ContentList = styled.div`
    a {
        margin-bottom: 8px;

        &:last-child {
            margin-bottom: 0;
        }
    }
`;

const NoContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 184px;
    font-size: 16px;
    line-height: 24px;
    color: ${colors.gray99};
`;

const LogoutWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 104px;

    button {
        text-decoration: underline;
        font-size: 16px;
        color: ${colors.gray33};
        line-height: 24px;
    }
`;
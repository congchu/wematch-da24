import BottomNav from 'components/common/BottomNav';
import React from 'react';
import styled from 'styled-components';
import * as colors from 'styles/colors'
import { FindCard } from './components/MyConsultCard';


const MyConsult = () => {

    return (
        <Container>
            <Header>
                <span className="title">송인걸</span>
                <span className="phone">010-****-9609</span>
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
            </Content>
            <BottomNav />
        </Container>
    )
}

export default MyConsult;

const Container = styled.main``;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 152px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 64px 0 24px 24px;
    box-sizing: border-box;

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
    padding: 0px 24px;
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

const ContentList = styled.div``;
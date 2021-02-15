import React, { useEffect, useState } from 'react';
import BottomNav from 'components/common/BottomNav';
import MainHeader from 'components/common/MainHeader';
import { useHistory } from 'react-router-dom';
import { useMedia } from 'react-use-media';
import styled from 'styled-components';
import * as colors from 'styles/colors'
import { ConsultCard, FindCard } from './components/MyConsultCard';
import * as userActions from 'store/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import * as userSelector from 'store/user/selectors';
import dayjs from 'dayjs';
import { IOrder } from 'store/user/types';
import Button from 'components/common/Button';
import LoginModal from 'components/common/Modal/LoginModal';
import { deleteCookie } from 'lib/cookie';
import { useCookies } from 'react-cookie';
import { get } from 'lodash';

const MyConsult = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [cookies] = useCookies(['x-wematch-token']);
    const isDesktop = useMedia({
        minWidth: 1200,
    })
    const [visibleLoginModal, setVisibleLoginModal] = useState(false);

    const handleLogout = () => {
        dispatch(userActions.signOut());
        deleteCookie('x-wematch-token');
        history.replace('/');
    }

    const { data: { clean_orders, move_orders }, loading } = useSelector(userSelector.getConsult);
    const { user, token } = useSelector(userSelector.getUser);
    const wematchToken = get(cookies, 'x-wematch-token');

    useEffect(() => {
        if(token && user) {
            dispatch(userActions.fetchUserConsultAsync.request({ name: user.name, phone: user.tel }))
        }
    }, [dispatch, token, user])


    const handleSelectConsult = (order: IOrder) => {
        dispatch(userActions.selectOrder({order}));
    }


    // TODO: 로딩 디자인 필요
    if(loading) {
      return <Container>로딩중입니다...</Container>
    }

    if(!user && wematchToken === undefined) {
        return (
            <Container>
                {isDesktop && <MainHeader isFixed={true} border={true}/>}
                <LoginContent>
                    <LoginWrapper>
                        <strong>쉽고, 빠르게 로그인/가입하기</strong>
                        <p>로그인 또는 가입을 하시면 무료 견적상담 및 <br/> 내 신청내역 기능을 자유롭게 이용하실 수 있어요!</p>
                    </LoginWrapper>
                    <Button theme="primary" border={true} bold={true} onClick={() => setVisibleLoginModal(true)} id={'dsl_myrequests_gate_button'}>로그인/가입</Button>               
                </LoginContent>
                <BottomNav />
                <LoginModal visible={visibleLoginModal} onClose={() => setVisibleLoginModal(!visibleLoginModal)} onSuccess={() => setVisibleLoginModal(!visibleLoginModal)}/>
            </Container>
        )
    }

    return (
        <Container>
            {isDesktop && <MainHeader isFixed={true} />}
            <Header>
                <div>
                    <span className="title">{user?.name}</span>
                    <span className="phone">{`${user?.tel.slice(0, 3)}-****-${user?.tel.slice(7)}`}</span>
                </div>
            </Header>
            <Content>
                <Wrapper id={'dsl_myrequests_list'}>
                    <ContentTitle>내 신청내역</ContentTitle>
                    <Separator />
                    <ContentSection style={{ marginBottom: '16px' }}>
                        <ContentSubTitle>
                            <span className="bold">STEP &nbsp; 1</span>
                            <span>&nbsp; &#124; &nbsp;입주/이사청소</span>
                        </ContentSubTitle>
                        <ContentList>
                            {
                                clean_orders.length === 0 ? <FindCard title="입주/이사청소" link="https://wematch.com/clean_step_01.asp" /> :
                                    clean_orders.map((order: IOrder) => <ConsultCard handleSelectConsult={() => handleSelectConsult(order)} key={order.idx} category={'clean'} link={'/myconsult/detail'} categoryTitle={order.type} dateOfReceipt={dayjs(order.submit_date).format('YYYY.MM.DD')} dateOfService={dayjs(order.moving_date).format('YYYY.MM.DD')} />)
                            }
                        </ContentList>
                    </ContentSection>
                    <ContentSection style={{paddingBottom: 40}}>
                        <ContentSubTitle>
                            <span className="bold">STEP &nbsp; 2</span>
                            <span>&nbsp; &#124; &nbsp;이사</span>
                        </ContentSubTitle>
                        <ContentList>
                            {
                                move_orders.length === 0 ? <FindCard title="이사" link="/" /> :
                                    move_orders.map((order: IOrder) => <ConsultCard handleSelectConsult={() => handleSelectConsult(order)} key={order.idx} category={'move'} link={'/myconsult/detail'} categoryTitle={order.type} dateOfReceipt={dayjs(order.submit_date).format('YYYY.MM.DD')} dateOfService={dayjs(order.moving_date).format('YYYY.MM.DD')} />)
                            }
                        </ContentList>
                    </ContentSection>
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
    padding-top: 0;
      
      @media screen and (min-width: 768px) {
        padding-top: 56px;
      }
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

const LoginContent = styled.div`
position: relative;
padding: 0px 24px;

@media (min-width: 1200px) {
    max-width: 312px;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 0;
    box-shadow: none;
    padding-top: 50px;
    strong {
        text-align: center;
    }

    p {
        text-align: center;
    }
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

const LoginWrapper = styled.div`
    padding-top: 78px;
    margin-bottom: 84px;
    strong {
        display: block;
        font-weight: bold;
        font-size: 20px;
        color: ${colors.gray33};
        line-height: 27px;
        letter-spacing: -0.02rem;
        margin-bottom: 17px;
    }

    p {
        font-size: 16px;
        line-height: 22px;
        letter-spacing: -0.5px;
        color: ${colors.gray66};
    }
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
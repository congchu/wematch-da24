import Collapse from 'components/base/Collapse';
import { LevelA, LevelB, LevelC, LevelN, LevelS, Triangle } from 'components/Icon';
import { Down, Info, Up } from 'components/wematch-ui/Icon';
import { MOVE_URL } from 'constants/env';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as colors from 'styles/colors';
import * as userActions from 'store/user/actions';
import * as userSelector from 'store/user/selectors';
import { useSelector } from 'react-redux';
import { Previous } from 'components/wematch-ui/Icon'
import MainHeader from 'components/common/MainHeader'
import { useMedia } from 'react-use-media';
import { Link, useHistory } from 'react-router-dom';
import ToastPopup from 'components/wematch-ui/ToastPopup';
import { dataLayer } from 'lib/dataLayerUtil';
import { IPartnerDetail } from 'types/partner';
import Card from "../partner/Cart/component/Card";
import NewLevelN from "../../components/Icon/generated/NewLevelN";
import NewLevelS from "../../components/Icon/generated/NewLevelS";
import NewLevelA from "../../components/Icon/generated/NewLevelA";


const S = {
  Container: styled.div`
    background-color: #FAFAFA;
    padding-top: 56px;
      
      @media screen and (min-width: 768px) {
        padding-top: 126px;
      }
  `,
  TopContents: styled.div`
      padding: 16px 0 25px;
      background-color: white;
      border: 0.5px solid ${colors.lineDefault};
      @media screen and (max-width: 320px) {
        padding: 40px 0 0;
      }
    `,
  ContentsWrap: styled.div`
      position: relative;
      padding: 0 24px 42px;
      @media screen and (min-width: 768px) {
        width: 720px;
        margin: 0 auto;
        padding: 0 0 42px;
      }

      .toggle {
        cursor: pointer;
      }
    `,
  Icon: styled.div`
      position: relative;
      width: 56px;
      height: 56px;
      margin: 0 auto;
      border-radius: 50%;
      background-color: #1672F7;
      display: flex;
      justify-content: center;
      align-items: center;
    `,
  TopTitle: styled.p`
      margin-top: 15px;
      font-size: 18px;
      text-align: center;

      em {
        font-weight: 700;
      }

      span {
        display: inline-block;
        margin-top: 14px;
        font-size: 14px;
        line-height: 20px;
      }

      @media screen and (min-width: 1200px) {
        font-size: 24px;
      }
    `,
  TitleWrap: styled.div`
      overflow: hidden;
      padding-top: 32px;

      svg {
        float: right;
      }

      @media screen and (min-width: 768px) {
        padding-top: 52px;
      }
    `,
  BoxTitle: styled.strong`
      display: block;
      float: left;
      padding-bottom: 10px;
      font-size: 22px;
      font-weight: 700;
      line-height: 24px;

      em {
        color: #1672F7;
      }
    `,
  LevelInfo: styled.p`
      float: right;
      padding-top: 4px;
      font-size: 12px;
      cursor: pointer;
      color: ${colors.gray66};
      line-height: 18px;
      display: flex;
      align-items: center;
      img {
        margin-right: 4px;
      }
    `,
  Card:  styled.li`
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.06);
    background-color: ${colors.white};
    padding: 16px;
    margin: 16px 0;
    box-sizing: border-box;
  `,
  LevelInfoBox: styled.div<{ visible: boolean }>`
      display: ${props => (props.visible ? 'block' : 'none')};
      position: absolute;
      top: 64px;
      right: 24px;
      width: 193px;
      height: 56px;
      padding: 10px;
      border-radius: 4px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.75);
      color: #fff;
      box-sizing: border-box;
      line-height: 18px;

      svg {
        position: absolute;
        top: -8px;
        right: 20px;
      }

      @media screen and (min-width: 768px) {
        top: 84px;
        right: 0;
      }
    `,
  CompanyList: styled.ul`
     
    `,
  ListBox: styled.div`
      overflow: hidden;

      svg {
        float: left;
        @media screen and (max-width: 320px) {
          width: 48px;
          height: 48px;
        }
      }
    `,
  CompanyTitle: styled.p`
      overflow: hidden;
      float: left;
      width: 76%;
      margin: 7px 0 0 10px;
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
      text-overflow: ellipsis;

      span {
        display: inline-block;
        margin-top: 12px;
        font-size: 14px;
        font-weight: 400;
        @media screen and (max-width: 320px) {
          margin-top: 6px;
          font-size: 12px;
        }
      }

      @media screen and (max-width: 320px) {
        margin: 5px 0 0 10px;
        font-size: 15px;
      }
    `,
  LinkCompany: styled(Link)`
      display: block;
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
    color: ${colors.pointBlue};
    @media screen and (max-width: 320px) {
      margin-top: 12px;
      font-size: 13px;
    }
    `,
  MoveInfo: styled.ul`
      padding: 21px 0 6px;

      li {
        overflow: hidden;
        margin-bottom: 15px;
      }
    `,
  HorizontalBar: styled.div`
    width: 100%;
    height: 1px;
    background-color: ${colors.lineDefault};
    margin: 16px 0;
  `,
  MoveText: styled.p`
      float: left;
      width: 27%;
      padding-top: 3px;
      font-size: 16px;
      color: ${colors.gray88};
    `,
  MoveSubtext: styled.p`
      float: left;
      width: 73%;
      font-size: 16px;
      color: #333;
      line-height: 22px;
    `,
  MoveOption: styled.ul`
      padding-top: 24px;

      li {
        overflow: hidden;
        margin-bottom: 20px;
      }

      li:first-child {
        padding-bottom: 16px;
        border-bottom: 1px solid #EBEEF2;
      }
    `,
  ServiceList: styled.div`
      overflow: hidden;
      clear: both;
    `,
  ServiceLink: styled.a`
      float: left;
      width: 25%;

      svg {
        display: block;
        margin: 17px auto 0;
      }
    `,
  ServiceText: styled.p`
      margin-top: 20px;
      font-size: 15px;
      text-align: center;
    `,
  Button: styled.button`
      display: block;
      width: 100%;
      height: 56px;
      font-size: 18px;
      background: #1672F7;
      color: #fff;
      @media screen and (min-width: 1200px) {
        width: 720px;
        margin: 0 auto 106px;
      }
    `
}

const MyConsultDetail = () => {

  const { data: { name, phone, }, selected: selectedOrder } = useSelector(userSelector.getConsult)
  const [infoVisible, setInfoVisible] = useState(false)
  const [sessionVisible, setSessionVisible] = useState(false);
  const [expand, setExpand] = useState(true)

  const toggleInfoBox = () => {
    setInfoVisible(!infoVisible)
  }

  const history = useHistory();


  const isDesktop = useMedia({
    minWidth: 1200,
  })

  useEffect(() => {
    if (!selectedOrder) {
      setSessionVisible(true);
    }
  }, [selectedOrder]);

  return (
    <S.Container>
      {isDesktop ? <MainHeader isFixed={true} border={true} /> : (
        <Header>
          <div className="icon" onClick={() => history.goBack()}>
            <Previous size={16} color={colors.black} />
          </div>
          <h1>{`${selectedOrder ? selectedOrder.type : ''} 신청내역`}</h1>
        </Header>
      )}
      <S.TopContents>
        <S.Icon>
          <img src={require('assets/images/white_list.svg')} alt="icon" />
        </S.Icon>
        <S.TopTitle>
          <em>{selectedOrder?.type}</em> 신청내역 <br />
          <span>업체에서 연락이 없다면 먼저 전화해주세요!<br /> 전화번호를 문자로 보내드립니다.</span>
        </S.TopTitle>
      </S.TopContents>
      <S.ContentsWrap>
        <S.TitleWrap>
          <S.BoxTitle>매칭업체 정보</S.BoxTitle>
        </S.TitleWrap>
        <S.CompanyList>
          {selectedOrder?.partners.map((list: IPartnerDetail, index: number, arr: IPartnerDetail[]) => (
            <S.Card key={index}>
              <S.ListBox>
                {list.level === "NEW" && <NewLevelN />}
                {list.level === "S" && <NewLevelS/>}
                {(list.level !== "NEW" && list.level !== "S") && <NewLevelA/>}
                <S.CompanyTitle>
                  {list.adminname} <br />
                  <span>{list.level_text}</span>
                </S.CompanyTitle>
              </S.ListBox>
              <S.HorizontalBar />
              <S.LinkCompany to={`/requests/completed/${list.adminid}`} onClick={() => {
                dataLayer({
                  event: 'myrequest_detail',
                  category: '내신청내역_상세',
                  action: '고객평가_확인',
                  label: `${arr.length}_${index + 1}`,
                  CD6: selectedOrder.type,
                  CD8: `${list.level}등급`
                })
              }}>
                {/*<em>{list.feedback_cnt}</em> 명의 고객 평가 확인*/}
                {`업체 정보 자세히 보기 (후기 ${list.feedback_cnt}개)`}
              </S.LinkCompany>
            </S.Card>
          ))}
        </S.CompanyList>
        <S.TitleWrap onClick={() => setExpand(!expand)} className="toggle">
          <S.BoxTitle>내 신청 정보</S.BoxTitle>
          {expand ? <Up style={{ marginTop: 6 }} /> : <Down style={{ marginTop: 6 }} />}
        </S.TitleWrap>
        <Collapse expand={expand}>
          <S.MoveInfo>
            <li>
              <S.MoveText>연락처</S.MoveText>
              <S.MoveSubtext>{`(${name}) ${phone}`}</S.MoveSubtext>
            </li>
            <li>
              <S.MoveText>이사날짜</S.MoveText>
              <S.MoveSubtext>{selectedOrder?.moving_date}</S.MoveSubtext>
            </li>
            <li>
              <S.MoveText>{!selectedOrder?.type.includes('청소') ? `출발지` : `청소지`}</S.MoveText>
              <S.MoveSubtext>{selectedOrder?.start_address}{selectedOrder?.type !== '원룸이사' && !selectedOrder?.type.includes('청소') && '층'}</S.MoveSubtext>
            </li>
            {
              !selectedOrder?.type.includes('청소') && (
                <li>
                  <S.MoveText>도착지</S.MoveText>
                  <S.MoveSubtext>{selectedOrder?.end_address}{selectedOrder?.type !== '원룸이사' && '층'}</S.MoveSubtext>
                </li>
              )
            }
            {
              selectedOrder?.type === '원룸이사' && (
                <li style={{ borderTop: `1px solid ${colors.lineDeco}`, paddingTop: 20 }}>
                  <S.MoveText>짐량</S.MoveText>
                  <S.MoveSubtext>{selectedOrder?.stuff}</S.MoveSubtext>
                </li>
              )
            }
            <li style={{ borderTop: `1px solid ${colors.lineDeco}`, paddingTop: 20 }}>
              <S.MoveText>전달메모</S.MoveText>
              <S.MoveSubtext>{selectedOrder?.memo}</S.MoveSubtext>
            </li>
          </S.MoveInfo>
        </Collapse>
      </S.ContentsWrap>
      <ToastPopup visible={sessionVisible} confirmText={'홈으로 가기'} confirmClick={() => history.push('/')} showHeaderCancelButton={false}>
        <p>{'정보가 만료되었습니다.\n다시 조회해주세요'}</p>
      </ToastPopup>
    </S.Container>
  )
}

export default MyConsultDetail;

const Header = styled.div`
    position: fixed;
      top: 0;
      left: 0;
      height: 56px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${colors.white};
      z-index: 1;
      .icon {
        position: absolute;
        left: 24px;
        top: 19px;
        width: 24px;
        height: 24px;
      }
      
      h1 {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.03em;
        ${colors.gray33}
      }
`;
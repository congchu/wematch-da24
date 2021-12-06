import React from "react";
import Styled from "styled-components";

import PopupTemplate from "components/wematch-ui/PopupTemplate";

import * as colors from "styles/colors";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const S = {
  Container: Styled.div`
        position: relative;
        padding: 0 24px;
        height: 100%;
        overflow-y: auto;
        margin-top: 56px;
    `,
  TermsWrap: Styled.div`
        padding-top: 10px;
        top: 0;
        left: 24px;
        right: 24px;
        font-size: 13px;
        line-height: 20px;
        color: ${colors.gray33};
        
        @media (min-width: 1200px) {
          width: 312px;
        }
        
        h4 {
            display: block;
            margin-bottom: 3px;
            font-size: 15px;
            font-weight: bold;
            line-height: 26px;
            color: ${colors.gray33};
        }
    `,
  Title: Styled.h1`
        font-size: 24px;
        font-weight: 700;
        line-height: 35px;
        color: ${colors.gray33};
        margin-bottom: 25px;
    `,
  Agree: Styled.div`
        padding-top: 10px;
    `
};

const TermsModal: React.FC<Props> = (props) => {
  const { visible = false, onClose } = props;

  return (
    <PopupTemplate visible={visible} onClose={onClose}>
      <S.Container>
        <S.TermsWrap>
          <S.Title>
            이용약관 및 <br />
            개인정보처리방침
          </S.Title>
          <p>
            (주)다이사(이하 “회사”)는 서비스 제공을 위해 필요한 최소한의 정보를 아래와 같이 수집합니다. 정보주체인 이용자는 본 개인정보의 수집 및 이용에 관한 동의를 거부하실 권리가 있으나, 해당 정보는 서비스 제공에 필요한 최소한의 개인정보이므로 동의를 해주셔야 서비스를 이용하실 수
            있습니다.{" "}
          </p>
          <S.Agree>
            <h4>1. 개인정보 수집 및 이용 목적</h4>
            <ul>
              <li>
                (1) 이용자의 이사/청소조건에 맞는 추천 서비스 제공
                <br />
                이사/청소전문대행사(회원사)의 이사견적 비교제공 및 이사진행을 위한 사전연락, 전화견적 · 방문견적 및 방문이사진행
              </li>
              <li>
                (2) 이용자 사후관리
                <br />
                계약 이행 후, 회사 및 이사/청소전문대행사(회원사)에 대한 피드백 반영을 위한 해피콜, AS, 이사 후평가를 위한 이용자 확인
              </li>
              <li>
                (3) 신규서비스 개발 및 마케팅, 광고에의 활용
                <br />
                <ul>
                  <li>• 신규서비스 개발 및 고객맞춤/통계학적 특성에 따른 서비스 제공, 서비스 유효성 확인, 이벤트 정보 및 참여기회 제공, 광고성 정보 제공, 접속빈도 파악, 서비스이용 통계</li>
                  <li>• 이메일링 및 SMS 제공 (서비스 관련 뉴스, 이벤트, 업데이트 정보 등의 소식)</li>
                </ul>
              </li>
            </ul>
          </S.Agree>
          <S.Agree>
            <h4>2. 수집하려는 개인정보 항목</h4>
            <ul>
              <li>• 필수항목: 이름, 전화번호(휴대폰번호), 출발지주소, 도착지주소, 이사일자 또는 청소일자</li>
              <li>• 선택항목1: 평수 및 통계학적 정보 (기타 서비스 이용 증진 목적)</li>
              <li>• 선택항목2: 고객-상담원간 상담내용 녹취 (고객 상담 시)</li>
            </ul>
            <p>회사는 서비스 이용 도중 추가적인 정보를 수집할 수 있으며, 이 경우 별도의 개인정보 수집 및 이용 동의를 받습니다.</p>
          </S.Agree>
          <S.Agree>
            <h4>3. 개인정보 제3자 제공 </h4>
            <p>
              회사는 서비스의 원활한 제공을 위해 최소한의 범위 내에서 아래와 같이 제3자에게 정보를 제공합니다. 정보주체인 이용자는 본 개인정보의 수집 및 이용에 관한 동의를 거부하실 권리가 있으나, 해당 정보는 서비스 제공에 필요한 최소한의 개인정보이므로 동의를 해주셔야 서비스를 이용하실 수
              있습니다.{" "}
            </p>
            <br />
            <ul>
              <li>
                제공 업체 : (주)다이사 회원사 <br />
                제공 목적 : 이사/청소 중개 <br />
                제공 항목 : 항목2의 필수 항목 <br />
                제공받는 자의 개인정보 보유/이용기간 : 이용목적 달성 시 혹은 회원계약 종료 시 <br />
                <br />
              </li>
              <li>
                제공 업체 : (주)엠디서비스 <br />
                제공 목적 : (주)다이사 회원사의 영업/상담대행 (이사/청소견적서비스 및 고객주문정보, 이사, 청소, 기타 부가서비스 등 고객상담 서비스 및 민원처리 업무, 주문 또는 취소처리 관리) <br />
                제공 항목 : 항목2의 필수 항목 <br />
                제공받는 자의 개인정보 보유/이용기간 : 이용목적 달성 시 혹은 회원계약 종료 시 <br />
                <br />
              </li>
              <li>
                제공 업체 : ㈜마켓디자이너스 <br />
                제공 목적 : 이사/청소 신청내역 조회, 위매치 통합 부가서비스 제공, 신규서비스 추천
                <br />
                제공 항목 : 항목2의 필수 항목 <br />
                제공받는 자의 개인정보 보유/이용기간 : 이용목적 달성 시 혹은 회원계약 종료 시 <br />
              </li>
            </ul>
          </S.Agree>
          <S.Agree>
            <h4>4. 개인정보 보유 및 이용기간</h4>
            <p>회사는 이용자의 서비스 이용기간 또는 고지 및 약정기간동안 이용자의 개인정보를 보유합니다.</p>
            <p>단, 다음의 정보에 대해서는 관계 법령의 규정에 의거하여 법령에서 명시한 기간 동안 정보를 보존합니다.</p>
            <ul>
              <li>(1) 계약 또는 청약철회 등에 관한 기록 : 5년</li>
              <li>(2) 대금결제 및 재화 등의 공급에 관한 기록 : 5년</li>
              <li>(3) 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년</li>
            </ul>
          </S.Agree>
          <S.Agree>
            <h4>기타 서비스 상의 개인정보 처리에 대한 사항은 위매치다이사 개인정보처리방침 및 이용약관에 준거하여 적용합니다.</h4>
          </S.Agree>
        </S.TermsWrap>
      </S.Container>
    </PopupTemplate>
  );
};

export default TermsModal;

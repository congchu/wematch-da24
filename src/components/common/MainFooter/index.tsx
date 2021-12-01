import * as React from "react";
import styled from "styled-components";
import { gray33, gray66, gray88, lineDefault, lineDeco } from "styles/colors";
import { Down, Up } from "components/wematch-ui/Icon";
import { checkIos } from "lib/checkDevice";
import BlankLink from "components/base/BlankLink";
import { useRouter } from "hooks/useRouter";

const S = {
  Footer: styled.footer`
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -1px;
    background-color: #fbfcfd;
    border-top: 1px solid ${lineDefault};
  `,
  Container: styled.div`
    position: relative;
    margin: 0 auto;
    padding: 33px 0 37px;
    .desktop {
      display: none;
    }

    @media (max-width: 1199px) {
      max-width: 360px;
      .mobile {
        text-align: center;
      }
    }
    @media (min-width: 1200px) {
      width: 992px;
      .desktop {
        display: block;
      }
      .mobile {
        display: none;
      }
    }
  `,
  ExternalLink: styled.a`
    font-size: 14px;
    color: ${gray66};
    line-height: 20px;
    display: inline-block;
    position: relative;
    margin-right: 22px;
    &:not(:last-child):after {
      content: "";
      height: 12px;
      width: 1px;
      background-color: ${lineDefault};
      display: inline-block;
      position: absolute;
      right: -12px;
      top: 4px;
    }

    @media (max-width: 1199px) {
      font-size: 13px;
      margin-right: 10px;
      line-height: 22px;
      &:not(:last-child):after {
        display: none;
      }

      .down {
        margin-left: 2px;
      }
    }
    &.companyInfo {
      @media (min-width: 1200px) {
        display: none;
      }
    }
  `,
  PartnerCenter: styled.p`
    vertical-align: text-top;
    display: inline-block;
    font-size: 18px;
    color: ${gray33};
    span {
      color: ${gray66};
    }
    @media (max-width: 1199px) {
      font-size: 13px;
      vertical-align: baseline;
      line-height: 22px;
    }
  `,
  Description: styled.p<{ visible: boolean }>`
    font-size: 14px;
    line-height: 24px;
    color: ${gray88};
    letter-spacing: -1px;
    margin-top: 20px;
    .mobile-enter {
      display: none;
    }
    span {
      margin-top: 8px;
    }
    @media (max-width: 1199px) {
      display: ${({ visible }) => (visible ? "block" : "none")};
      border-top: 1px solid ${lineDeco};
      margin-top: 16px;
      font-size: 10px;
      text-align: center;
      line-height: 15px;
      padding: 16px 24px 0;
      .mobile-enter {
        display: inline;
      }
      .desktop-enter {
        display: none;
      }
    }
  `,
  Copyright: styled.small`
    display: inline-block;
    font-size: 14px;
    color: ${gray88};
    margin-top: 42px;
    line-height: 20px;

    @media (max-width: 1199px) {
      display: none;
    }
  `,
  WrapSnsLinks: styled.div`
    position: absolute;
    right: 0;
    top: 200px;
    .mobile {
      display: none;
    }
    .store {
      vertical-align: top;
      display: inline-block;
      height: 40px;
      min-width: 120px;
      box-sizing: border-box;
      padding: 12px 16px;
      border: 1px solid #c3c7d0;
      border-radius: 20px;
      position: relative;
      font-size: 14px;
      color: ${gray88};
      cursor: pointer;
      margin-left: 16px;
      &:before {
        content: "";
        width: 24px;
        height: 24px;
        background-size: cover;
        background-position: center center;
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -5px;
      }
      &.mobile {
        width: 32px;
        min-width: 32px;
        height: 32px;
      }
      @media (min-width: 1200px) {
        margin-left: 24px;
      }
    }
    .playstore {
      background-image: url(${require("assets/images/components/MainFooter/footer-mobile-playstore-default.svg")});

      @media (min-width: 1200px) {
        &:before {
          background-image: url(${require("assets/images/components/MainFooter/footer-playstore-default.svg")});
        }
      }
    }
    .appstore {
      margin-right: 24px;
      background-image: url(${require("assets/images/components/MainFooter/footer-mobile-appstore-default.svg")});

      @media (min-width: 1200px) {
        &:before {
          background-image: url(${require("assets/images/components/MainFooter/footer-appstore-default.svg")});
        }
      }
    }
    .sns {
      vertical-align: top;
      cursor: pointer;
      background-size: cover;
      background-position: center center;
      display: inline-block;
      height: 40px;
      width: 40px;
      &:not(:first-child) {
        margin-left: 16px;
      }
      @media (max-width: 1199px) {
        height: 32px;
        width: 32px;
      }
    }
    .facebook {
      background-image: url(${require("assets/images/components/MainFooter/footer-facebook-default.svg")});
    }
    .youtube {
      background-image: url(${require("assets/images/components/MainFooter/footer-youtube-default.svg")});
    }
    .blog {
      background-image: url(${require("assets/images/components/MainFooter/footer-blog-default.svg")});
    }
    .desktop {
      display: none;
    }
    @media (min-width: 1200px) {
      .desktop {
        display: inline-block;
        background-image: none;
      }
      .mobile {
        display: none;
      }
    }

    @media (max-width: 1199px) {
      text-align: center;
      position: static;
      margin-top: 26px;
      .mobile {
        display: inline-block;
      }
      .store {
        padding: 0;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        box-sizing: border-box;
        background-size: cover;
        background-position: center center;
      }
    }
  `
};

export default function MainFooter() {
  const [visibleDescription, setVisibleDescription] = React.useState<boolean>(false);
  const [isIos, setIsIos] = React.useState<boolean>(false);
  const router = useRouter();

  const handleVisibleDescription = () => {
    setVisibleDescription(!visibleDescription);
  };

  React.useEffect(() => {
    setIsIos(checkIos());
  }, [isIos]);

  return (
    <S.Footer>
      <S.Container>
        <div className="desktop">
          <S.ExternalLink href="https://marketdesigners.com/">회사소개</S.ExternalLink>
          <S.ExternalLink href="https://da24.wematch.com/terms">이용약관</S.ExternalLink>
          <S.ExternalLink href="https://da24.wematch.com/terms#privacy">개인정보처리방침</S.ExternalLink>
          <S.ExternalLink className="companyInfo">사업자정보</S.ExternalLink>
          <S.ExternalLink className="companyInfo">사업자정보</S.ExternalLink>
          <S.ExternalLink onClick={() => router.push("/contact")}>문의하기</S.ExternalLink>
          <S.ExternalLink onClick={() => router.push("/notice")}>
            {/*<S.ExternalLink onClick={()=> window.location.href = 'https://da24.wematch.com/notice.asp'}>*/}
            공지사항
          </S.ExternalLink>
          {/*<S.PartnerCenter>*/}
          {/*    <span>고객센터</span> 1522-2483 (평일 9시~18시)*/}
          {/*</S.PartnerCenter>*/}
        </div>
        <div className="mobile">
          {/*<S.PartnerCenter>*/}
          {/*    <span>고객센터</span> 1522-2483 (평일 9시~18시)*/}
          {/*</S.PartnerCenter><br />*/}
          <S.ExternalLink href="https://marketdesigners.com/" target="_blank">
            회사소개
          </S.ExternalLink>
          <S.ExternalLink href="https://da24.wematch.com/terms" target="_blank">
            이용약관 및 개인정보처리방침
          </S.ExternalLink>
          <br />
          <S.ExternalLink onClick={() => router.push("/faq")}>
            {/*<S.ExternalLink onClick={()=> window.location.href = 'https://da24.wematch.com/faq.asp'}>*/}
            자주 묻는 질문
          </S.ExternalLink>
          <S.ExternalLink onClick={() => router.push("/contact")}>문의하기</S.ExternalLink>
          <S.ExternalLink onClick={() => router.push("/notice")}>
            {/*<S.ExternalLink onClick={()=> window.location.href = 'https://da24.wematch.com/notice.asp'}>*/}
            공지사항
          </S.ExternalLink>
          <S.ExternalLink onClick={handleVisibleDescription} className="companyInfo">
            사업자정보
            {visibleDescription ? <Up className="down" size={10} color={gray66} /> : <Down className="down" size={10} color={gray66} />}
          </S.ExternalLink>
        </div>
        <S.Description visible={visibleDescription}>
          (주)마켓디자이너스 대표 김현영ㅣ서울시 강남구 테헤란로 518, 섬유센터 10층
          <br className="mobile-enter" /> 사업자등록번호 840-87-00656ㅣ통신판매업신고 제2017-서울강남-01493호
          <br />
          (주)다이사 대표 김현영ㅣ서울 강남구 테헤란로20길 9 동궁빌딩 3층
          <br className="mobile-enter" /> 사업자등록번호 539-86-00313 <br />
          <span>
            위매치는 통신판매중개자로서 거래당사자가 아니며, 입점회원사가 제공하는 서비스에
            <br className="mobile-enter" />
            대한 이행, 계약사항 및 분쟁에 책임지지 않습니다.
            <br className="desktop-enter" />
            고객의 피드백을 수집하여 자동화된
            <br className="mobile-enter" /> 업체 등급 부여 및 후기 생성 관련 기술은 특허출원이 완료되었습니다.
          </span>
        </S.Description>
        <S.Copyright>copyrightⓒwematch inc. All rights reserved.</S.Copyright>
        <S.WrapSnsLinks>
          <BlankLink className="sns facebook" href="https://www.facebook.com/officialwematch" />
          <BlankLink className="sns blog" href="https://blog.naver.com/wematch" />
          <BlankLink className="sns youtube" href="https://www.youtube.com/channel/UCNDJGdsSbLNUf53-8dMWx2w?view_as=subscriber" />
          <BlankLink className="desktop store playstore" href="https://play.google.com/store/apps/details?id=com.goodthought.da24">
            &nbsp;&nbsp;구글플레이
          </BlankLink>
          <BlankLink className="desktop store appstore" href="https://itunes.apple.com/kr/app/%EB%8B%A4%EC%9D%B4%EC%82%AC/id1066642270?mt=8">
            &nbsp;&nbsp;앱스토어
          </BlankLink>
          <BlankLink className="mobile store playstore" href="https://play.google.com/store/apps/details?id=com.goodthought.da24" />
          <BlankLink className="mobile store appstore" href="https://itunes.apple.com/kr/app/%EB%8B%A4%EC%9D%B4%EC%82%AC/id1066642270?mt=8" />
        </S.WrapSnsLinks>
      </S.Container>
    </S.Footer>
  );
}

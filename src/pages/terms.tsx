import React from 'react'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    ul {
      ul{
        padding-left: 1%;
      }
    }
    .wrapHead {
      height: 72px;
      padding: 0 24px;
      a {
        display: inline-block;
        padding-top: 26px;
      }
    }
    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-track {
      background-color: $white;
    }
    ::-webkit-scrollbar-thumb {
      background-color: $line_end;
      border-radius: 1px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
    ::-webkit-scrollbar-button:start:decrement,::-webkit-scrollbar-button:end:increment {
      width: 4px;
      height: 180px;
      background: $line_end;
    }
    .title_head {
      padding: 8px 24px 0;
      font-weight: 600;
      font-size: 22px;
      line-height: 24px;
    }
    .wrap_agree {
      padding: 55px 24px 60px;
      font-size: 14px;
      line-height: 22px;
      color: $gray66;
      .title_agree {
        padding-bottom: 16px;
        font-weight: 600;
        font-size: 18px;
        line-height: 1.1;
        color: $gray33;
      }
      .desc_agree {
        padding-top: 30px;
        &.fst {
          padding-top: 0;
        }
      }
      .title_g {
        display: block;
        font-weight: normal;
      }
    }
    @media screen and (min-width: 768px) {
      .wrap_agree, .title_head {
        padding-left: 32px;
        padding-right: 32px;
      }
      .wrapHead {
        padding: 0 40px;
      }
    }
    @media screen and (min-width:1200px) {
      .wrapHead {
        padding: 0;
        width:992px;
        margin: 0 auto
      }
      .cont_agree {
        padding: 72px 0 80px;
      }
      .title_head {
        width: 992px;
        margin: 0 auto;
        padding-top: 0;
        font-size: 22px;
        line-height: 30px;
      }
      .wrap_agree {
        width: 992px;
        margin: 0 auto;
        padding: 56px 0 0;
      }
    }
`

export default function TermsPage() {
  return (
    <>
      <GlobalStyle />
      <div className="wrapHead">
        <a href="https://wematch.com">
          <img src={require('assets/images/header_logo.svg')} alt="위매치" width="110"/>
        </a>
      </div>
      <section className="cont_agree">
        <h2 className="title_head">
            위매치다이사 서비스 이용약관
        </h2>
        <div className="wrap_agree">
          <h3 className="title_agree">
              제 1 장 총 칙
          </h3>
          <div className="desc_agree fst">
            <strong className="title_g">제 1 조 (목적)</strong>
            <p>
                이 약관은 (주)다이사(이하 `회사`)가 운영하는 위매치다이사 사이트(http://da2④wematch.com, 이하 `위매치다이사`)를 통해서 제공하는 서비스(이하 `서비스`)를 이용함에 있어 사업자와 이용자간의 이사 · 청소 종합서비스에 대한 계약사항 및 회사와 이용자간의 권리 및 의무 및 책임사항을 규정함을 목적으로 합니다. 위매치다이사는 이용자간 유용한 의사결정을 할 수 있도록 도와드리는 이사 · 청소 관련 종합서비스 소개사이트로써 계약 관련한 책임은 당사자간에 있습니다.
            </p>
          </div>
          <div className="desc_agree">
            <strong className="title_g">제 2 조 (용어의 정의)</strong>
            <ul>
                <li>① 이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</li>
                <ul>
                    <li>1. 서비스 : `서비스`라 함은 구현되는 단말기(PC, TV, 휴대형단말기 등의 각종 유무선 장치를 포함)와 상관없이 `이용자`가 이용할 수 있는 위매치다이사 및 위매치다이사 관련 제반 서비스를 의미합니다.</li>
                    <li>2. 사업자 : 이사화물(이삿짐)의 운송 및 이에 부대 하는 포장, 보관, 정리 등의 이사 관련 서비스 또는 청소서비스를 취급하는 사업자(이하 `사업자`)를 말합니다.</li>
                    <li>3. 이용자 : 서비스에 접속하여 이 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원(이하 `이용자`)을 말합니다.</li>
                    <li>4. 회원 : ‘회원’이라 함은 서비스에 개인정보를 제공하여 회원등록을 한 자로서, 서비스의 정보를 지속적으로 제공받으며, 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</li>
                    <li>5. 게시물 : 회원 및 이용고객이 회사가 제공하는 서비스에 게시 또는 등록하는 부호(URL 포함), 문자, 음성, 음향, 영상(동영상 포함), 이미지(사진 포함), 파일 등을 말합니다.</li>
                </ul>
            </ul>
          </div>
          <div className="desc_agree">
            <strong className="title_g">제 3 조 (약관등의 명시와 설명 및 개정)</strong>
            <ul>
                <li>① 회사는 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호, 모사전송번호, 전자우편주소, 사업자등록번호, 통신판매업신고번호, 개인정보관리책임자 등을 이용자가 쉽게 알 수 있도록 사이트의 초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.</li>
                <li>② 회사는 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회, 배송책임, 환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.</li>
                <li>③ 회사는 전자상거래등에서의소비자보호에관한법률, 약관의규제에관한법률, 전자거래기본법, 전자서명법, 정보통신망이용촉진등에관한법률, 방문판매등에관한법률, 소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
                <li>④ 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 사이트의 초기화면에 그 적용일자 7일이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 회사는 개정전 내용과 개정후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.</li>
                <li>⑤ 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기간내에 회사에 송신하여 회사의 동의를 받은 경우에는 개정약관 조항이 적용됩니다. 또한 공지된 적용일자 이후에 이용자가 회사의 서비스를 계속 이용하는 경우에는 개정된 약관에 동의하는 것으로 봅니다. 개정된 약관에 동의하지 아니하는 이용자는 언제든지 자유롭게 서비스 이용계약을 해지할 수 있습니다.</li>
                <li>⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래등에서의소비자보호에관한법률, 약관의규제등에관한법률, 공정거래위원회가 정하는 전자상거래등에서의소비자보호지침 및 관계법령 또는 상관례에 따릅니다.</li>
            </ul>
          </div>
        </div>

        <div className="wrap_agree">
            <h3 className="title_agree">
                제 2 장 이용 계약의 체결
            </h3>
            <div className="desc_agree fst">
                <strong className="title_g">제 4 조 (서비스의 제공 및 변경)</strong>
                <ul>
                    <li>
                        ① 회사는 다음과 같은 업무를 수행합니다.
                        <ul>
                            <li>1) 서비스 등에 대한 마켓 플레이스 서비스</li>
                            <li>2) 정보 제공 서비스</li>
                            <li>3) 광고 서비스</li>
                            <li>4) 기타 회사가 정하는 서비스</li>
                        </ul>
                    </li>
                    <li>② 회사는 서비스 제공과 관련한 회사 정책의 변경 등 기타 상당한 이유가 있는 경우 등 운영상, 기술상의 필요에 따라 제공하고 있는 서비스의 전부 또는 일부를 변경 또는 중단할 수 있습니다.</li>
                    <li>
                        ③ 서비스의 내용, 이용방법, 이용시간에 대하여 변경 또는 서비스 중단이 있는 경우에는 변경 또는 중단될 서비스의 내용 및 사유와 일자 등은 그 변경 또는 중단 전에 회사 "사이트" 또는 서비스 내 "공지사항" 화면 등 “회원”이 충분히 인지할 수 있는 방법으로 사전에 공지합니다.
                    </li>
                </ul>
            </div>
            <div className="desc_agree">
                <strong className="title_g">제 5 조 (서비스의 중단)</strong>
                <ul>
                    <li>
                        ① 서비스의 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴 1일 24시간을 원칙으로 합니다. 다만, 정기 점검 등의 필요로 회사가 정한 날이나 시간은 제외됩니다. 정기점검시간은 서비스제공화면에 공지한 바에 따릅니다.
                    </li>
                    <li>② 회사는 서비스의 원활한 수행을 위하여 필요한 기간을 정하여 사전에 공지하고 서비스를 중지할 수 있습니다. 단, 불가피하게 긴급한 조치를 필요로 하는 경우 사후에 통지할 수 있습니다.</li>
                    <li>③ 회사는 컴퓨터 등 정보통신설비의 보수점검•교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.</li>
                </ul>
            </div>
            <div className="desc_agree">
                <strong className="title_g">제 6 조 (이용자 및 사업자의 회원이입)</strong>
                <ul>
                    <li>
                        ① 이용자 또는 사업자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원이입을 신청합니다.
                    </li>
                    <li>
                        ② 회사는 회원으로 가입할 것을 신청한 이용자 또는 사업자 중 다음 각호에 해당하는 신청에 대하여는 승인을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.
                        <ul>
                            <li>1. 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 다만 회원자격 상실 후 3년이 경과한 자로서 회사의 회원재가입 승낙을 얻은 경우에는 예외로 함</li>
                            <li>2. 등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
                            <li>3. 부정한 용도 또는 영리를 추구할 목적으로 본 서비스를 이용하고자 하는 경우</li>
                            <li>4. 관계법령에 위배되거나 사회의 안녕질서 혹은 미풍양속을 저해할 수 있는 목적으로 신청한 경우</li>
                            <li>5. 14세 미만 아동이 법정대리인(부모 등)의 동의를 얻지 아니한 경우</li>
                            <li>6. 이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하여 신청하는 경우</li>
                            <li>7. 기타 회원으로 등록하는 것이 서비스의 기술상 현저히 지장이 있다고 판단되는 경우</li>
                        </ul>
                    </li>
                    <li>③ 회원이입계약의 성립시기는 회사의 승낙이 회원에게 도달한 시점으로 합니다.</li>
                    <li>④ 사업자의 경우, 회사는 서비스관련설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.</li>
                    <li>⑤ 회원은 등록사항에 변경이 있는 경우, 변경일로부터 60일 이내에 전자우편 기타 방법으로 회사에 그 변경사항을 알려야 합니다.</li>
                </ul>
            </div>
            <div className="desc_agree">
                <strong className="title_g">제 7 조 (회원 탈퇴 및 자격 상실 등)</strong>
                <ul>
                    <li>① 회원은 회사에 언제든지 탈퇴를 요청할 수 있으며 회사는 특별한 사정이 없는 한 이를  즉시 처리합니다.</li>
                    <li>
                        ② 회원이 다음 각호의 사유에 해당하는 경우, 회사는 회원자격을 제한 및 정지시킬 수 있습니다.
                        <ul>
                            <li>1. 가입 신청시에 허위 내용을 등록한 경우</li>
                            <li>2. 서비스를 이용하여 구입한 재화등의 대금, 기타 회사가용에 관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우</li>
                            <li>3. 다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우</li>
                            <li>4. 서비스를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</li>
                            <li>5. 사업자의 경우, 고객평가정보가 허위작성 또는 조작된 경우</li>
                            <li>6. 사업자의 경우, 환급과 관련된 견적 및 계약 등의 정보제공을 의도적으로 누락하거나 왜곡한 경우</li>
                            <li>7. 기타 1~6의 사례가 과거에 있었던 경우</li>
                        </ul>
                    </li>
                    <li>③ 회사가 회원 자격을 제한, 정지 시킨후, 동일한 행위가 2회이상 반복되거나 30일이내에 그 사유가 시정되지 아니하는 경우 회사는 회원자격을 상실시킬 수 있습니다.</li>
                    <li>④ 회사가 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 회원에게 이를 통지하고, 회원등록 말소전에 최소한 30일 이상의 기간을 정하여 소명할 기회를 부여합니다</li>
                </ul>
            </div>
            <div className="desc_agree">
                <strong className="title_g">제 8 조 (회원의 ID 및 비밀번호에 대한 의무)</strong>
                <ul>
                    <li>① ID와 비밀번호에 관한 관리책임은 회원에게 있습니다.</li>
                    <li>② 회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.</li>
                    <li>③ 회원은 자신의 ID 및 비밀번호를 도난 당하거나 제3자가 사용하고 있음을 인지한 경우에는 즉시 회사에 통보하고 회사의 조치가 있는 경우에는 그에 따라야 합니다.</li>
                    <li>④ 회원은 제3항에 따른 통지를 하지 않거나 회사의 조치에 응하지 아니하여 발생하는 모든 불이익에 대한 책임은 회원에게 있습니다.</li>
                </ul>
            </div>
            <div className="desc_agree">
                <strong className="title_g">제 9 조 (회원의 의무)</strong>
                <ul>
                    <li>① 회원는 관계법령 및 이 약관의 규정, 회사의 정책, 이용안내 등 회사가 통지 또는 공지하는 사항을 준수하여야 하며, 기타 회사 업무에 방해되는 행위를 하여서는 안됩니다.</li>
                    <li>
                        ② 회원는 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 안됩니다.
                        <ul>
                            <li>1. 서비스 신청 또는 변경 시 허위내용의 등록</li>
                            <li>2. 회사에 게시된 정보의 허가 받지 않은 변경</li>
                            <li>3. 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등)의 송신 또는 게시</li>
                            <li>4. 회사 또는 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                            <li>5. 외설, 폭력적인 메시지, 화상, 음성 기타 공공질서 미풍양속에 반하는 정보를 공개 또는 게시하는 행위</li>
                            <li>6. 고객/상담원/사업자와의 상담 내용이 욕설, 폭언, 성희롱 등에 해당하는 행위</li>
                            <li>7. 사업자의 경우, 포인트를 부정하게 적립하거나 사용하는 등의 행위</li>
                            <li>8. 허위 리뷰작성 등을 통해 서비스를 부정한 목적으로 이용하는 행위</li>
                            <li>9. 자신의 ID, PW를 제3자에게 양도하거나 대여하는 등의 행위</li>
                            <li>10. 정당한 사유 없이 당사의 영업을 방해하는 내용을 기재하는 행위</li>
                            <li>11. 회원이 회사를 사칭하는 경우</li>
                            <li>12. 기타 관계법령에 위반된다고 판단되는 행위</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="desc_agree">
                <strong className="title_g">제 10 조 (이용제한 등)</strong>
                <ul>
                    <li>① 회사는 회원이 이 약관의 의무를 위반하거나 서비스의 정상적인 운영을 방해한 경우, 경고, 일시정지, 영구이용정지 등의 서비스 이용제한 조치를 취할 수 있습니다.</li>
                    <li>② 사업자의 경우, 회사는 사업자 회원이 회사가 요청하는 고객 피해구제요청에 적극적으로 대응하지 않을 시, 2회 경고 후 영구이용정지를 할 수 있습니다.</li>
                    <li>③ 회원은 본 조에 따른 이용제한 등에 대해 회사가 정한 절차에 따라 이의신청을 할 수 있습니다.</li>
                </ul>
            </div>
            <div className="desc_agree">
                <strong className="title_g">제 11 조 (회사의 의무)</strong>
                <ul>
                    <li>① 회사는 지속적이고 안정적으로 서비스를 제공하기 위하여 관리자의 의무를 다하도록 노력합니다.</li>
                    <li>② 회사는 회원이 안정적인 사업을 이어갈 수 있도록 “사이트” 및 서비스 개선에 노력합니다.</li>
                    <li>③ 회사는 관계 법령이 정한 의무사항을 준수합니다.</li>
                </ul>
            </div>
            <div className="desc_agree">
                <strong className="title_g">제 12 조 (포인트)</strong>
                <ul>
                    <li>① 포인트는 사업자가 회원가입 후 서비스를 제공받을 수 있는 결제수단을 의미합니다.</li>
                    <li>② 포인트는 사업자의 구매활동, 이벤트 참여 등에 따라 회사가 적립, 부여하는 보너스포인트와 회원이 유료로 구매하는 충전포인트로 구분됩니다.</li>
                    <li>③ 포인트의 유효기간은 발급 시점에 회원에 고지되며, 따로 고지되지 않은 경우에 한해서 발급일로부터 5년을 유효기간으로 합니다. 유효기간까지 사용되지 않은 포인트는 소멸됩니다.</li>
                    <li>④ 회사가 무상으로 적립 또는 부여하는 보너스포인트는 현금환급 신청이 불가합니다.</li>
                    <li>⑤ 회사는 회원이 충전포인트에 대한 환급을 요구할 경우, 환급수수료를 공제하고 환급할 수 있으며, 환급조건 및 환급수수료에 대한 구체적인 내용은 회사에서 요청시 안내합니다.</li>
                    <li>⑥ 회원 탈퇴 시 미 사용한 보너스포인트는 소멸되며, 회사는 별도의 보상을 하지 않습니다.</li>
                    <li>⑦ 포인트의 차감은 충전포인트를 우선합니다. 단, 회사에서 별도로 정한 기준을 안내한 경우에는 그에 따르기로 합니다.</li>
                </ul>
            </div>
            {/*13조 스킵*/}
            <div className="desc_agree">
                <strong className="title_g">제 13 조 (개인정보보호)</strong>
                <ul>
                    <li>1. “제휴사”는 “고객”의 개인정보를 보호하기 위하여 정보통신망법 및 개인정보 보호법 등 관계 법령에서 정하는 바를 준수합니다.</li>
                    <li>2. “회사”는 관련법령 및 개인정보취급방침에 따라 “제휴사” 및 “고객”의 개인정보를 최대한 보호하기 위하여 노력합니다.</li>
                    <li>
                        3. “회사”의 공식 사이트 이외의 링크된 사이트에서는 “회사”의 개인정보취급방침이 적용되지 않습니다. 서비스를 제공하는 제3자의 개인정보 취급과 관련하여는 해당사이트 및 해당 제3자의 개인정보취급방침을 확인할
                        책임이 이용자에게 있으며, “회사”는 이에 대하여 책임을 부담하지 않습니다.
                    </li>
                    <li>
                        4. “회사”는 “제휴사”가 이 약관에 동의 시 다음과 같은 개인정보 수집 및 이용동의, 개인정보 제3자 제공동의에 대해 동의한 것으로 간주합니다.
                        <ul>
                            <li>1) 수납, 서비스 영업 및 관리를 목적으로 “제휴사＂의 개인정보(성명, 성별, 생년월일, 연락처, 결제사명, 결제자명, 카드번호, 유효기간, 휴대폰번호)를 수집 및 이용</li>
                            <li>2) 수납서비스 제공 및 동의 사실 통지, 고객센터 운영을 목적으로 “제휴사＂가 제공한 개인정보를 유니윌㈜, 효성에프엠에스㈜, 카드사(BC, 국민, 외환, 삼성, 신한, 롯데, 하나 SK, 현대 등), 결제 대행사(KG 이니시스, KCP), 효성ITX, MD서비스 등에 제공</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>

            {/*3장*/}
        <div className="wrap_agree">
            <h3 className="title_agree">
                제 3 장 계약 당사자의 의무
            </h3>
            <div className="desc_agree fst">
                <strong className="title_g">제 13 조 (제휴서비스 계약)</strong>
                <ul>
                    <li>① 제휴서비스에 대한 계약은 고객이 사업자가 제시한 상품의 판매 조건에 응하여 청약의 의사표시를 하고 이에 대하여 고객이 계약금의 일부를 사업자에게 지급 함으로써 고객과 사업자간에 체결됩니다.</li>
                    <li>② 회사는 온라인 마켓 플레이스만을 제공하며 제휴서비스의 분쟁과 책임 계약사항은 사업자와 고객간에 있습니다.</li>
                </ul>
            </div>
            <div className="desc_agree">
                <strong className="title_g">제 14 조 (사업자의 포인트 취소・환불)</strong>
                <p>회사의 서비스와 관련하여 건별 “포인트” 차감에 대해 각 사업자가 문제를 제기하는 경우, 별도의 포인트 환불 정책에 따릅니다.</p>
            </div>
            <div className="desc_agree">
                <strong className="title_g">제 15 조 (책임제한)</strong>
                <ul>
                    <li>① 회사는 사업자와 고객 간의 서비스거래를 중개하는 플랫폼 서비스만을 제공할 뿐, “제휴서비스”를 판매하는 당사자가 아니며, “제휴서비스”에 대한 품질 및 하자 등에 대한 책임은 사업자에게 있습니다.</li>
                    <li>② 회사는 사업자가 게재한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 관해서는 책임을 지지 않습니다.</li>
                    <li>③ 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
                    <li>④ 회사는 사업자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</li>
                    <li>⑤ 회사는 고객 및 사업자가 게재한 이용후기, 평가, 사진 등 정보/자료/사실의 신뢰도, 정확성에 대해서는 책임을 지지 않습니다.</li>
                    <li>⑥ 회사 및 회사의 임직원 그리고 대리인은 고의 또는 중대한 과실이 없는 한 다음과 같은 사항으로부터 발생하는 손해에 대해 책임을 지지 아니합니다.</li>
                    <ul>
                        <li>1. 사업자의 허위 또는 부정확성에 기인하는 손해</li>
                        <li>2. 서비스에 대한 접속 및 서비스의 이용과정에서 사업자의 귀책사유로 발생하는 손해</li>
                        <li>3. 서버에 대한 제3자의 모든 불법적인 접속 또는 서버의 불법적인 이용으로부터 발생하는 손해 및 제3자의 불법적인 행위를 방지하거나 예방하는 과정에서 발생하는 손해</li>
                        <li>4. 제3자가 서비스를 이용하여 불법적으로 전송, 유포하거나 또는 전송, 유포되도록 한 모든 바이러스, 스파이웨어 및 기타 악성 프로그램으로 인한 손해</li>
                    </ul>
                </ul>
            </div>
            <div className="desc_agree">
                <strong className="title_g">제 16 조 (회원의 ID 및 비밀번호에 대한 의무)</strong>
                <ul>
                    <li>① 제17조의 경우를 제외한 ID와 비밀번호에 관한 관리책임은 회원에게 있습니다.</li>
                    <li>② 회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.</li>
                    <li>③ 회원이 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 “몰”에 통보하고 회사의 안내가 있는 경우에는 그에 따라야 합니다.</li>
                </ul>
            </div>
            <div className="desc_agree">
                <strong className="title_g">제 17 조 (이용자의 의무)</strong>
                <ul>
                    <li>이용자는 다음 행위를 하여서는 안됩니다.</li>
                    <ul>
                        <li>① 신청 또는 변경시 허위 내용의 등록</li>
                        <li>② 타인의 정보 도용</li>
                        <li>③ 사이트에 게시된 정보의 변경</li>
                        <li>④ 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                        <li>⑤ 회사 · 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                        <li>⑥ 회사 · 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                        <li>⑦ 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 사이트에 공개 또는 게시하는 행위</li>
                    </ul>
                </ul>
            </div>
            <div className="desc_agree">
                <strong className="title_g">제 18 조 (연결 `서비스`와 ‘피연결서비스` 간의 관계)</strong>
                <ul>
                    <li>① 상위 서비스와 하위 서비스가 하이퍼 링크(예: 하이퍼 링크의 대상에는 문자, 그림 및 동화상 등이 포함됨)방식 등으로 연결된 경우, 전자를 연결 서비스(웹 사이트)이라고 하고 후자를 피연결서비스(웹사이트)이라고 합니다.</li>
                    <li>② 연결서비스는 피연결서비스가 독자적으로 제공하는 재화 등에 의하여 이용자와 행하는 거래에 대해서 보증책임을 지지 않는다는 뜻을 연결서비스의 초기화면 또는 연결되는 시점의 팝업화면으로 명시한 경우에는 그 거래에 대한 보증책임을 지지 않습니다.</li>
                </ul>
            </div>
            <div className="desc_agree">
                <strong className="title_g">제 19 조 (분쟁해결)</strong>
                <ul>
                    <li>① 회사는 사업자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 보상처리팀을 설치・운영합니다.</li>
                    <li>② 회사는 사업자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다.</li>
                    <li>③ 회사와 사업자 간에 발생한 분쟁과 관련하여 사업자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.</li>
                </ul>
            </div>
            <div className="desc_agree">
                <strong className="title_g">제 20 조 (준거법 및 관할법원)</strong>
                <ul>
                    <li>① 이 약관의 해석 및 회사와 회원간의 분쟁에 대하여는 대한민국의 법을 적용합니다.</li>
                    <li>② 서비스 이용 중 발생한 회원사와 회사간의 소송은 민사소송법에 의한 관할법원에 제소합니다.</li>
                </ul>
            </div>
            <div className="desc_agree">
                <strong className="title_g">제 21 조 (비용 정책)</strong>
                <p>"당사"와 "회원사" 간의 발생되는 비용은 "당사"의 영업 방침에 의해 변경될 수 있음을 안내 해드립니다.</p>
            </div>

        </div>


            {/*4장*/}
        <div className="wrap_agree">
            <h3 className="title_agree">
                제 4 장 게시물 운영정책
            </h3>
            <div className="desc_agree fst">
                <strong className="title_g">제 22 조 (운영 정책)</strong>
                <p>서비스 내 각종 게시물의 운영정책은 방송통신심의위원회의 정보통신에 관한 심의규정에 기반하며 이를 위반할 경우, "위매치다이사" 운영정책에 의해 관련 게시물은 예고 없이 삭제, 이동 될 수 있으며, 게시자는 글쓰기 기능제한 이용제한 등 사이트 이용에 제한을 받을 수 있습니다.</p>
            </div>
            <div className="desc_agree">
                <strong className="title_g">제 23 조 (게시물 규정)</strong>
                <ul>
                    <li>① 게시물이라 함은 이용자가 서비스를 이용하며 게시한 부호ㆍ문자ㆍ음성ㆍ음향ㆍ화상ㆍ동영상 등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 의미합니다.</li>
                    <li>② 이용자는 사업자의 서비스를 이용 후, 관련 평점 및 평가를 사이트에 자유롭게 등록할 수 있으며, 작성 게시물에 대한 모든 권리 및 책임은 이를 게시한 이용자에게 있습니다.</li>
                    <li>③ 2항에도 불구하고 회사는 회원이 게시하거나 등록하는 서비스의 내용물이 다음 각 호에 해당한다고 판단되는 경우에 사전통지 없이 삭제하거나 문제가 되는 부분을 삭제하거나 기호 등으로 수정할 수 있습니다. 단, 이에 대하여 회사는 어떠한 책임도 지지 않습니다.</li>
                    <ul>
                        <li>1. 욕설/비속어가 담겨있거나 연상시키는 게시물</li>
                        <li>2. 상업성 광고 및 홍보 글에 관한 게시물</li>
                        <li>3. 본인 또는 타인의 개인정보(신상정보, 위치, 연락처, 이메일 등)가 포함된 게시물</li>
                        <li>4. 정치적 견해 차이 및 인종/ 성별/ 지역/ 종교에 대한 차별, 비하가 담긴 게시물</li>
                        <li>5. 다른 회원 또는 제3자를 비방하거나 명예 손상, 음해 목적의 게시물 - 공개되었을 경우, 당사자의 권리침해가 우려되는 내용</li>
                        <li>6. 공공질서 및 미풍양속에 위반되는 게시물</li>
                        <li>7. 회사, 회사의 직원이나 관계자 및 운영자를 사칭하는 게시물</li>
                        <li>8. 기타 본 약관 및 관련 법령에 위반된다고 판단되는 게시물</li>
                    </ul>
                    <li>④ 회사는 제3항의 게시물 등록자에 대해 약관에서 공지하는 바에 따라 제재를 적용할 수 있습니다.</li>
                </ul>
            </div>
            <div className="desc_agree">
                <strong className="title_g">제 24 조 (저작권의 귀속 및 이용제한)</strong>
                <ul>
                    <li>① 회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.</li>
                    <li>② 이용자 및 사업자는 서비스를 이용함으로써 얻은 정보 중 회사에 지적재산권이 귀속된 정보를 회사의 사전 승낙없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.</li>
                    <li>③ 회사는 약정에 따라 이용자에게 귀속된 저작권을 사용하는 경우 당해 이용자에게 통보하여야 합니다.</li>
                    <li>④ 이용자가 작성한 저작물에 대한 모든 권리 및 책임은 이를 작성한 이용자에게 있으며, 회사는 이용자가 서비스에 게시하는 게시물은 서비스를 운영, 홍보 및 개선하고 새로운 서비스를 개발하기 위해 필요한 범위 내에서 일부 수정·복제·편집되어 사용될 수 있습니다. 단, 이렇게 창작된 2차적저작물 또는 편집저작물은 ㈜다이사 이외의 제 3자의 무단사용으로부터 보호됩니다. 또한 이용자가 게시하거나 등록하는 저작물의 내용이 다음 각 항에 해당한다고 판단되는 경우에 관련법에 의거하여 해당 저작물을 임시조치를 취하거나 사전통지 없이 삭제할 수 있습니다.</li>
                    <ul>
                        <li>1. 다른 이용자 또는 제 3자를 비방하거나 명예를 손상시키는 내용인 경우</li>
                        <li>2. 회사의 저작권 및 제 3자의 저작권 등 타인의 권리를 침해하는 내용인 경우</li>
                        <li>3. 타인의 명의를 도용한 경우</li>
                        <li>4. 개인간의 금전거래를 요구하는 경우</li>
                        <li>5. 회사가 서비스의 성격 및 게시물의 위치에 부합되지 않는다고 판단하는 경우</li>
                        <li>6. 기타 관계법령에 위배된다고 판단되는 경우</li>
                    </ul>
                </ul>
            </div>
        </div>



          {/*개인정보처리*/}
        <div id="privacy" className="wrap_agree">
          <h3 className="title_agree">
            개인정보처리방침
          </h3>
          <p>(주)다이사(이하 “회사”)는 위매치 서비스(이하 “서비스”)를 제공함에 있어 귀하의 개인정보보호를 매우 중요시하며, 『개인정보보호법』,『정보통신망 이용촉진 및 정보보호에 관한 법률』상의 개인정보보호규정 및 정보통신부가 제정한 『개인정보보호지침』을 준수하고 있습니다. 회사는 개인정보처리방침을 통하여 이용자가 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.</p>
          <div className="desc_agree">
            <strong className="title_g">1. 개인정보의 수집에 대한 동의</strong>
            <p>회사는 이용자가 회사의 개인정보처리방침 또는 이용약관의 내용에 대하여 「동의」 또는 「동의 안함」을 선택할 수 있는 절차를 마련하여, 「동의」를 선택하면 개인정보 수집에 대해 동의한 것으로 봅니다.</p>
            <p>단, 회사는 다음 각 호의 어느 하나에 해당하는 경우에는 법령에 따라 이와 같은 동의 없이 이용자의 개인정보를 수집∙이용할 수 있습니다.</p>
            <ul><ul>
                <li>(1) 정보통신서비스의 제공에 관한 계약을 이행하기 위하여 필요한 개인정보로서 경제적∙기술적인 사유로 통상적인 동의를 받는 것이 뚜렷하게 곤란한 경우</li>
                <li>(2) 정보통신서비스 제공에 따른 요금정산을 위하여 필요한 경우</li>
                <li>(3) 그 밖에 법률에 특별한 규정이 있는 경우</li>
            </ul></ul>
          </div>
          <div className="desc_agree">
            <strong className="title_g">2. 개인정보의 수집목적 및 이용, 제공</strong>
            <p>
                2-1. "개인정보"라 함은 생존하는 개인에 관한 정보로서 당해 정보에 포함되어 있는 성명, 주소, 전화번호 등의 사항에 의하여 당해 개인을 식별할 수 있는 정보(당해 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 용이하게 결합하여 식별할 수 있는 것을 포함)를 말합니다. 회사는 이용자의 사전 동의 없이는 이용자의 개인 정보를 함부로 공개하지 않으며, 수집된 정보는 아래와 같이 이용하고 있습니다.
            </p>
            <ul><ul>
              <li>
                  (1) 서비스 제공에 관한 계약 이행 및 요금 정산 <br/>
                  이용자의 기본정보를 바탕으로 위매치 서비스 회원사(이하 “회원사”)의 서비스 견적 비교제공 및 견적 산출관리 활용, “회원사”의 서비스진행을 위한 사전연락, 계약 이행을 위한 방문 견적 진행을 위한 용도로 쓰입니다.
              </li>
              <li>
                  (2) 이용자 사후관리 <br/>
                  계약이행 후 이용자의 회사 및 “회원사”에 대한 피드백 반영을 위한 해피콜, A/S이행, 애프터서비스 및 서비스 완료 후 평가 작성을 위한 이용자 확인 용도로 활용됩니다.
              </li>
              <li>
                  (3) 신규서비스 개발 및 마케팅, 광고에서의 활용 <br/>
                  이용자가 제공한 개인정보는 회사 내에 공유되어 더 유용한 서비스를 이용자에게 제공해 드립니다. <br/>
                  신규서비스 개발 및 고객맞춤서비스 제공, 통계학적 특성에 따른 서비스 제공, 서비스의 유효성 확인, 이벤트 정보 및 참여기회 제공, 광고성 정보 제공, 접속빈도 파악, 이용자의 서비스이용에 대한 통계 등의 용도로 활용됩니다. 또한 회사의 서비스와 관련된 뉴스, 이벤트, 업데이트 정보 등의 소식을 받아보실 수 있도록 이용자의 동의를 구하고 발송하는 회사의 이메일링, SMS수신서비스를 보다 원활하게 제공하기 위한 목적으로 사용됩니다.
                  회사는 이용자가 서비스 이용 시 마케팅 활용 동의 절차에서 「동의」를 선택함으로써 상기 이벤트 정보 및 광고성 정보 제공 등의 목적으로 활용함에 동의한 것으로 봅니다.
              </li>
            </ul></ul>
          </div>
          <div className="desc_agree">
            <strong className="title_g">3. 회사가 수집하는 개인정보 항목 및 수집방법</strong>
            <p>3-1. 회사가 제공하는 서비스를 이용하기 위해서는 각 서비스의 종류에 따라 회원가입이나 실명인증이 필요할 수 있으며 본 약관에서는 회원용 서비스를 위한 공통 수집항목을 고지하고 있습니다. 수집항목은 각 서비스에 따라 달라질 수 있으며 해당 서비스의 별도 약관 및 서비스 신청 과정에서 확인할 수 있습니다.</p>
            <p>3-1-1. 개인정보 수집항목</p>
              <ul><ul>
                  <li>
                      (1) 필수항목: 이름, 전화번호(휴대폰번호), 출발지주소, 도착지주소, 이사일자 또는 청소일자
                  </li>
                  <li>
                      (2) 선택항목1: 평수 및 통계학적 정보 (기타 서비스 이용 증진 목적)
                  </li>
                  <li>
                      (3) 선택항목2: 고객-상담원간 상담내용 녹취 (고객 상담 시)
                  </li>
                  <li>
                      (4) 선택항목3: 고객-회원사간 통화내용 녹취 (서비스를 통해 050번호로 통화 시)
                  </li>
              </ul></ul>
            <p>3-2. 회사는 이용자의 기본적 인권 침해의 우려가 있는 민감한 개인정보(인종 및 민족, 사상 및 신조, 출신지 및 본적지, 정치적 성향 및 범죄기록, 건강상태 및 성생활 등)는 가급적 수집하지 않으며 부득이하게 수집해야 할 경우 이용자의 사전동의를 반드시 구할 것입니다. 그리고, 어떤 경우에라도 입력하신 정보를 이용자에게 사전에 밝힌 목적 이외에 다른 목적으로는 사용하지 않으며 외부로 유출하지 않습니다.</p>
            <p>3-3. 회사는 개인정보의 수집 및 이용 목적에 따라 고객과 상담원 간의 통화내용을 녹취할 수 있습니다.</p>
            <p>3-4. 회사는 온라인 상의 회원가입, 회원정보수정 및 서비스 화면, 회사가 제공하는 서면양식, 전화 또는 팩스, 이메일, 회원사를 통해 개인정보를 수집할 수 있습니다. 이용자는 이상의 개인정보 수집 과정에서 「동의」를 선택할 수 있으며 이 경우 개인정보 수집에 동의한 것으로 간주됩니다.</p>
          </div>
          <div className="desc_agree">
            <strong className="title_g">4. 수집하는 개인정보의 보유 및 이용기간</strong>
            <p>
                4-1. 개인정보 보유기간 <br/>
                회사는 이용자의 서비스 이용기간 또는 고지 및 약정기간동안 이용자의 개인정보를 보유합니다. <br/>
                또한, 상법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여 개인정보를 보존할 필요가 있는 경우, 관계법령에서 정한 보존기간 동안 이용자의 정보를 보관합니다. 이 경우, 해당 개인정보는 보관의 목적으로만 관리합니다.
            </p>
            <ul>
                <ul>
                    <li>
                        (1) 계약 또는 청약철회 등에 관한 기록 <br/>
                        보존근거 : 전자상거래 등에서의 소비자보호에 관한 법률 <br/>
                        보존기간 : 5년 <br/>
                    </li>
                    <li>
                        (2) 대금결제 및 재화 등의 공급에 관한 기록 <br/>
                        보존근거 : 전자상거래 등에서의 소비자보호에 관한 법률 <br/>
                        보존기간 : 5년 <br/>
                    </li>
                    <li>
                        (3) 소비자의 불만 또는 분쟁처리에 관한 기록 <br/>
                        보존근거 : 전자상거래 등에서의 소비자보호에 관한 법률 <br/>
                        보존기간 : 3년 <br/>
                    </li>
                    <li>
                        (4) 웹사이트 방문 기록 <br/>
                        보존근거 : 통신비밀보호법 <br/>
                        보존기간 : 3개월 <br/>
                    </li>
                </ul>
            </ul>
            <br />
            <p>
                이용자는 언제든지 아래의 "7. 개인정보 수집, 이용, 제공에 대한 동의철회"에서 설명한 절차와 방법에 따라 본인이 직접 개인정보 삭제를 요청할 수 있으며, 이 경우 개인정보는 재생할 수 없는 방법에 의하여 디스크에서 완전히 삭제되어 추후 열람이나 이용이 불가능한 상태로 처리됩니다.
            </p>
            <br />
            <p>
                4-2. 수집된 개인정보의 보유기간 후 처리 <br/>
                이용기간이 만료된 개인정보에 대해서는 상기 명시된 정보보유 사유에 따라 일정기간 저장하는 자료를 제외하고는 지체없이 파기하며, 개인정보처리가 제3자에게 위탁된 경우에는 수탁자에게도 파기하도록 지시합니다.
            </p>
            <p>
                4-3. 파기방법 <br/>
                회사는 이용자의 개인정보를 안전하게 처리하며, 이용자의 개인정보는 수집 및 이용목적이 달성된 후에는 지체없이 파기합니다. 종이에 출력된 개인정보는 분쇄하거나 소각 등을 통하여 파기하고, 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 파기합니다.
            </p>
          </div>
          <div className="desc_agree">
            <strong className="title_g">5. 수집한 개인정보의 공유 및 제공</strong>
            <p>
                5-1. 수집한 개인정보의 공유 및 제공 <br/>
                회사는 이용자의 개인정보를 "2. 개인정보의 수집목적 및 이용목적"에서 고지한 범위 내에서 사용합니다. 회사는 이용자의 사전 동의 없이는 동 범위를 초과하여 이용하지 않으며, 원칙적으로 이용자의 개인정보를 외부에 공개하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.
            </p>
            <ul><ul>
                <li></li>
                <li>(1) 이용자가 사전에 개인정보 공개에 동의한 경우</li>
                <li>(2) 회사의 서비스를 이용하여 타인에게 정신적-물질적 피해를 줌으로서 그에 대한 법적인 조치를 취하기 위하여 개인정보를 공개해야 한다고 판단되는 충분한 근거가 있는 경우</li>
                <li>(3) 기타 법에 의해 요구된다고 선의로 판단되는 경우(ex. 법령의 규정에 의거하거나, 수사, 조사목적으로 법령에 정해진 절차와 방법에 따라 수사기관 및 감독당국의 요구가 있는 경우)</li>
                <li>(4) 홈페이지에 게시한 서비스 이용약관이나 기타 서비스 등의 이용약관 또는 운영원칙을 위반한 경우</li>
                <li>(5) 통계작성, 학술연구나 시장조사를 위하여 특정 개인을 식별할 수 없는 형태로 광고주, 협력업체나 연구단체 등에 제공하는 경우</li>
                <li>(6) 성별, 연령별 기타 특정 조건의 집단에 대한 광고 게재 및 발송 시에도 이용자의 개인정보는 광고를 의뢰한 개인이나 기업 등에 제공되지 않습니다.</li>
            </ul></ul>
            <p>
                5-2. 수집한 개인정보의 처리 위탁 <br/>
                회사는 서비스 제공 계약 이행과 이용자 편의 증진을 위해 아래와 같은 업무를 외부 업체에 위탁해 처리하고 있습니다. 회사에서 이용자의 개인정보를 위탁하는 현황은 하단과 같으며, 위탁받은 업체가 개인정보를 안전하게 처리하도록 필요한 사항을 규정하고 관리/감독을 하고 있고, 수탁사 및 위탁업무의 내용이 변경될 경우, 회사는 본 개인정보처리방침을 통해 제공받는 자, 제공목적, 제공정보 항목, 제공기간을 회원에게 고지하여 동의를 구합니다
            </p>
            <ul><ul>
                <br/>
                <li>
                    수탁업체: (주)다이사 회원사 <br/>
                    위탁업무 내용: 견적서비스 및 고객주문정보 <br/>
                    개인정보의 보유 및 이용기간: 이용목적 달성시 혹은 위탁계약 종료시 <br/>
                </li>
                <br/>
                <li>
                    수탁업체: (주)엠디서비스 <br/>
                    위탁업무 내용: 견적서비스 및 고객주문정보, 고객상담서비스 및 민원처리 업무, 주문 또는 취소처리 관리업무, (주)다이사 회원사의 영업/상담대행 업무 <br/>
                    개인정보의 보유 및 이용기간: 이용목적 달성시 혹은 위탁계약 종료시 <br/>
                </li>
                <br/>
                <li>
                    수탁업체: ㈜마켓디자이너스 <br/>
                    위탁업무 내용: 이사/청소 신청내역 조회, 위매치 통합 부가서비스 제공, 신규서비스 추천 <br/>
                    개인정보의 보유 및 이용기간: 이용목적 달성 시 혹은 회원계약 종료 시 <br/>
                </li>
                <br/>
                <li>
                    수탁업체: NICE평가정보㈜ <br/>
                    위탁업무 내용: 실명본인인증 <br/>
                    개인정보의 보유 및 이용기간: 이용목적 달성시 혹은 위탁계약 종료시 <br/>
                </li>
                <br/>
                <li>
                    수탁업체: KT <br/>
                    위탁업무 내용: 문자메시지전송 / 전문고객지원센터의 고객상담서비스 및 민원처리 업무, 주문 또는 취소처리 관리업무 <br/>
                    개인정보의 보유 및 이용기간: 이용목적 달성시 혹은 위탁계약 종료시 <br/>
                </li>
                <br/>
                <li>
                    수탁업체: (주)델피콤 <br/>
                    위탁업무 내용: 안심번호(050번호) 및 녹취서비스 제공 <br/>
                    개인정보의 보유 및 이용기간: 3년 <br/>
                </li>
                <br/>
                <li>
                    수탁업체: Amazon Web Services Inc., (https://aws.amazon.com/compliance/contact) <br/>
                    위탁업무 내용: 데이터 보관 및 시스템 운영 <br/>
                    이전 국가: 서울 (AWS Seoul Region) <br/>
                    이전 일시 및 방법: 서비스 이용 시점에 네트워크를 통한 전송 <br/>
                    개인정보의 보유 및 이용기간: 개인정보 보관기간 동안 개인정보가 보관된 클라우드 서버 운영 및 관리 <br/>
                </li>
            </ul></ul>
            <br/>
            <p>회사는 서비스 제공의 안정성과 최신 기술을 이용자에게 제공하기 위해 상기 업체에게 개인정보를 위탁하여 이용자로부터 취득 또는 생성한 개인정보를 AWS (Amazon Web Services Inc.)가 보유하고 있는 데이터베이스(물리적 저장 장소: 서울)에 저장합니다. AWS는 해당 서버의 물리적인 관리만을 행하고, 이용자의 개인정보에 접근할 수 없습니다.</p>
            <br />
            <p>
                5-3. 목적 외 이용 및 제3자 제공 <br/>
                회사는 이용자 개인정보를 「개인정보의 수집목적 및 이용목적」에서 고지한 범위 내에서 사용하며, 동 범위를 초과하여 이용하거나 타인 또는 타기업, 기관에 제공하지 않습니다. 단, 양질의 서비스 제공을 위해 이용자의 개인정보를 협력업체와 공유할 필요가 있는 경우에는 제공받는 자, 제공목적, 제공정보 항목, 제공기간을 회원에게 고지하여 동의를 구합니다.
            </p>
          </div>
          <div className="desc_agree">
            <strong className="title_g">6. 개인정보의 열람, 정정, 동의철회</strong>
            <p>6-1. 이용자는 언제든지 개인정보를 열람하시거나 정정 및 철회하실 수 있으며 당사의 개인정보관리책임자에게 전자우편 또는 서면으로 요청하신 경우 정정하여 드립니다.</p>
            <p>6-2. 이용자는 개인정보의 수집, 이용에 대한 동의 철회(해지) 및 제3자에게 제공한 동의의 철회를 E-mail, 전화, 팩스, 기타의 방법을 통하여 할 수 있으며 이 경우, 이용자는 동일성 증명을 위하여 반드시 성명과 전화번호를 밝히셔야 합니다.</p>
          </div>
          <div className="desc_agree">
            <strong className="title_g">7. 개인정보 수집, 이용, 제공에 대한 동의철회</strong>
            <p>이용자는 회원가입 등을 통해 개인정보의 수집, 이용, 제공에 동의한 내용을 언제든지 철회할 수 있습니다.</p>
          </div>
          <div className="desc_agree">
            <strong className="title_g">8. 개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항</strong>
            <p>회사는 이용자에게 다양하고 차별화된 서비스를 제공하기 위하여 이용자에 대한 정보를 저장하고 수시로 찾아내는 쿠키(cookie)를 사용합니다. 쿠키란 웹사이트서버가 사용자의 컴퓨터 브라우저에게 전송하는 소량의 정보입니다. 이용자가 당사 인터넷사이트에 접속을 하면 이용자의 컴퓨터는 브라우저에 저장되어 있는 쿠키의 내용을 읽고, 이용자의 추가정보를 컴퓨터에서 찾아 접속에 따른 성명 등의 추가 입력 없이 서비스를 제공할 수 있습니다. 쿠키는 이용자의 컴퓨터는 식별하지만 이용자를 개인적으로 식별하지는 않습니다.</p>
            <ul><ul>
              <li>
                (1) 쿠키에 의해 수집되는 정보 및 이용 목적
                <ul><ul>
                  <li>- 수집정보: 접속IP, 접속로그, 이용 콘텐츠 등 서비스 이용정보</li>
                  <li>
                  - 이용목적: 개인 맞춤 마케팅, 서비스 제공 <br/>
                  . 이용자의 접속빈도 또는 머문 시간 등을 분석하여 마케팅에 활용 <br/>
                  . 클릭한 정보들에 대한 세부정보를 분석하여 다음 번 접속 때 개인 맞춤 서비스를 제공 <br/>
                  . 이용자의 습관을 분석하여 서비스 개편 등의 기준으로 이용 <br/>
                  </li>
                </ul></ul>
                <p>또한 이용자는 쿠키 설정에 대한 선택권이 있습니다. 이용자는 웹 브라우저를 조정함으로써 모든 쿠키를 다 받아들이거나, 쿠키가 설치될 때 통지를 보내도록 하거나, 아니면 모든 쿠키 저장을 거부할 수 있습니다.</p>
              </li>
              <li>
                  (2) 쿠키 설정에 대한 선택 및 거부 <br/>
                  - 쿠키 정보수집 수준 설정: 이용자가 직접 웹브라우저의 [도구] 메뉴 > 인터넷 옵션 > 보안 > 사용자 정의 수준 설정 <br/>
                  단, 귀하께서 쿠키 설치를 거부하였을 경우 서비스 제공에 어려움이 있을 수 있습니다. <br/>
              </li>
            </ul></ul>
          </div>
          <div className="desc_agree">
            <strong className="title_g">9. 개인정보관련 기술적-관리적 대책</strong>
            <p>
                9-1. 이용자의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적-관리적 대책을 강구하고 있습니다. 그러나 이용자의 주민등록번호는 공공장소에서의 인터넷사용 등 여러 방법으로 타인에게 알려질 가능성이 높으므로 이의 보호를 철저히 하는 것이 무엇보다 중요합니다. 그러므로 이용자도 개인의 정보를 타인에게 유출시키거나 제공하여서는 아니 되며, 자신의 개인정보를 책임 있게 관리할 의무가 있습니다. 개인의 관리소홀로 인한 개인정보 유출에 대해 당사는 어떠한 책임도 지지 않습니다.
            </p>
            <p>9-1-1. 이용자의 개인정보는 실명확인절차에 의해 보호되고 있습니다.</p>
            <p>9-1-2. 해킹이나 컴퓨터 바이러스 등에 의해 이용자의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다.</p>
            <ul><ul>
              <li>(1) 개인정보의 훼손에 대비해서 자료를 수시로 백업하고 있습니다,</li>
              <li>(2) 최신 백신프로그램을 이용하여 이용자의 개인정보나 자료가 누출되거나 손상되지 않도록 방지합니다.</li>
              <li>(3) Comodo에서 인증하는 SSL 암호화 알고리즘을 이용하여 네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고 있습니다.</li>
              <li>(4) 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있으며, 기타 시스템적으로 안정성을 확보하기 위한 가능한 모든 기술적 장치를 갖추려 노력하고 있습니다.</li>
            </ul></ul>
            <p>
        9-1-3. 회사는 이용자의 개인정보보호의 중요성을 인식하고 있으며 이를 위해 개인정보처리자를 최소한으로 제한하고 있으며 개인정보관리책임자가 처리자를 대상으로 주기적인 교육을 실시하여 개인정보보호를 위해 최선을
        다하고 있습니다. 또한 본 정책에 명시된 이행사항 및 관련 직원의 준수여부를 정기적으로 점검하여 위반 내용이 있는 경우 이를 시정 또는 개선하고 기타 필요한 조치를 취하도록 하고 있습니다.
            </p>
          </div>
          <div className="desc_agree">
            <strong className="title_g">10. 이용자 및 법정대리인의 권리와 그 행사방법</strong>
            <p>정보통신망법에 의하여 이용자는 다음과 같은 권리를 가지며, 어떠한 제한 없이 이를 행사할 수 있습니다.</p>
            <ul><ul>
              <li>(1) 언제든지 자신의 개인정보를 조회하고 수정할 수 있습니다.</li>
              <li>(2) 언제든지 개인정보 제공에 관한 동의철회/회원가입 해지를 요청할 수 있습니다.</li>
              <li>(3) 만 14세 미만 아동의 경우, 법정대리인이 아동의 개인정보를 조회하거나 수정할 권리, 수집 및 이용 동의를 철회할 권리를 가집니다.</li>
              <li>(4) 정확한 개인정보의 이용 및 제공을 위해 수정이 완료될 때까지 이용자의 개인정보는 이용되거나 제공되지 않습니다. 또한, 이미 제3자에게 제공된 경우에는 지체 없이 제공받은 자에게 사실을 알려 수정이 이루어질 수 있도록 하겠습니다.
              </li>
            </ul></ul>
          </div>
          <div className="desc_agree">
            <strong className="title_g">11. 게시물에 포함된 개인정보</strong>
            <p>
                11-1. 회사는 이용자님의 게시물을 소중하게 생각하며 변조, 훼손, 삭제되지 않도록 최선을 다하여 보호합니다. 그러나 다음의 경우에는 명시적 또는 개별적인 경고 후 삭제 조치할 수 있습니다.
            </p>
            <ul><ul>
              <li>(1) 스팸(spam)성 게시물(예, 돈 버는 메일 등)</li>
              <li>(2) 타인을 비방할 목적으로 허위사실을 유포하여 타인의 명예를 훼손하는 글</li>
              <li>(3) 동의 없는 타인의 개인정보 공개</li>
              <li>(4) 제3자의 저작권 등 권리를 침해하는 내용</li>
            </ul></ul>
            <p>11-2. 회사는 바람직한 게시판 문화를 활성화하고 개인정보를 보호하기 위하여 동의 없이 타인의 개인정보를 게시한 경우 특정부분을 삭제하거나 기호 등으로 수정하여 게시할 수 있습니다.</p>
          </div>
          <div className="desc_agree">
            <strong className="title_g">12. 개인정보관련 의견수렴 및 불만처리에 관한 사항</strong>
            <p>12-1. 회사는 개인정보와 관련된 이용자의 의견수렴과 불만처리를 위하여 개인정보 관리자를 지정해서 해당 업무를 수행하도록 합니다.</p>
            <p>12-2. 회사는 이용자의 의견을 소중하게 생각하며, 의문사항에 대하여 언제나 성실한 답변을 받을 권리가 있습니다.</p>
            <p>12-3. 회사는 이용자의 원활한 의사소통을 위해 민원처리센터를 운영하고 있으며 연락처는 다음과 같습니다.</p>
            <p>12-3-1. 민원처리센터</p>
            <ul><ul>
              <li>(1) 전자우편 : aiden@marketdesigners.com</li>
              <li>(2) 전화번호 : 1522-2483</li>
              <li>(3) 팩스번호 : 02-6455-2484</li>
              <li>(4) 등기우편 : 서울특별시 강남구 테헤란로20길 9, 3층 (역삼동, 동궁빌딩)</li>
              <li>(5) 전화상담은 평일 09:00~18:00까지 가능합니다.</li>
            </ul></ul>
            <p>12-4. 전자우편이나 팩스 및 우편을 이용한 상담은 접수 후 24시간 이내에 성실하게 답변 드리겠습니다. 다만, 근무시간 이후 또는 주말 및 공휴일에는 익일 처리하는 것을 원칙으로 합니다.</p>
            <p>12-5. 기타 개인정보에 관한 상담이 필요한 경우에는 개인정보침해신고센터, 대검찰청 인터넷범죄수사센터, 사이버경찰청 등으로 문의하실 수 있습니다.</p>
            <ul><ul>
              <li>
                  (1) 개인정보침해신고센터<br />
                  전화번호 : 118 / URL : http://privacy.kisa.or.kr
              </li>
              <li>
                  (2) 대검찰청 사이버수사과<br />
                  전화번호 : 02-3480-2000 / URL : http://www.spo.go.kr
              </li>
              <li>
                  (3) 사이버 경찰청<br />
                  전화번호 : 182 / URL : http://cyberbureau.police.go.kr
              </li>
            </ul></ul>
          </div>
          <div className="desc_agree">
            <strong className="title_g">13. 개인정보 보호책임자에 관한 사항</strong>
            <p>
                이용자의 개인정보에 대한 보안유지책임은 해당 이용자 자신에게 있습니다. 회사에서는 성명. 주민등록번호에 대해 어떠한 방법으로도 이용자에게 직접적으로 질문하는 경우는 없으므로 타인에게 비밀번호가 유출되지 않도록 각별히
                주의하시기 바랍니다. 특히 “9. 개인정보관련 기술적-관리적대책”항에서 명시한 것과 같이 공공장소에서 온라인상에서 접속해 있을 경우에는 더욱 유의하셔야 합니다. 회사는 고객의 개인정보를 보호하고 개인정보와 관련한
                고객의 불만사항을 처리하기 위하여 개인정보 보호책임자를 두고 있습니다.<br />
            </p>
            <ul><ul>
              <li>
                  (1)개인정보 보호책임자<br />
                  성명 : 이성(대표)<br />
                  연락처 : 1588-4993<br /><br />
              </li>
              <li>
                  (2)개인정보 관리담당자<br />
                  성명 : 최준호(팀장) <br />
                  연락처 : 1588-4993<br /><br />
              </li>
            </ul></ul>
            <p>본 개인정보처리방침은 2020년 7월 20일에 작성되었습니다.</p><br />
          </div>
        </div>
      </section>
    </>
  )
}

import React from 'react'
import styled from 'styled-components'

import Layout from 'components/base/Layout'
import AccordionCollapse from 'components/common/AccordionCollapse'

export type faqCategory = '공통' | '이사' | '청소';

const S = {
    CollapsedWrap: styled.div `
      padding-top: 18px;
      border-bottom: 1px solid #d7dbe2;
    `,
    TopCollapsedWrap: styled.div`
      padding-top: 0px;
      border-bottom: 1px solid #d7dbe2;
    `
}

export default function FaqPage() {

    return(
        <Layout title="자주 묻는 질문">
            {/* Notice : TopCollaseWrap is seperated for proper padding */}
            <S.TopCollapsedWrap>
                <AccordionCollapse category='공통' title='소비자평가등급은 무엇인가요?' defaultExpand={true} >
                    이사/청소 업체의 서비스 품질을 가장 정확하게 예측할 수 있는 객관적인 지표입니다. <br/>
                    소고기, 호텔 등을 고를 때 공인된 등급을 확인하듯, 이사/청소 업체 선택 시 가장 합리적인 기준이 됩니다. <br/>
                    <br/>
                    소비자평가등급에 대해 보다 자세한 내용은 아래 링크에서 확인해주세요.<br/>
                    <br/>
                    <a href="https://wematch.com/banner/grade">바로가기 >></a>
                </AccordionCollapse>
            </S.TopCollapsedWrap>

            <S.CollapsedWrap>
                <AccordionCollapse category='공통' title='위매치다이사는 이사/청소 업체가 아닌가요?' defaultExpand={false}>
                    위매치다이사는 이사 또는 청소를 직접 진행하는 이사업체가 아닌, 소비자와 업체를 연결해주는 매칭플랫폼입니다.<br/>
                    단, 업체에 광고비를 받고 고객에게 추천해주는 기존 플랫폼의 블라인드 매칭 방식과 달리, 위매치다이사에서는 소비자평가등급을 고객에게 투명하게 보여주고 고객이 직접 업체를 합리적으로 선택할 수 있습니다.
                </AccordionCollapse>
            </S.CollapsedWrap>
            <S.CollapsedWrap>
                <AccordionCollapse category='공통' title='평가등급 조작할 수 있지 않나요?' defaultExpand={false}>
                    소비자평가등급은 이사/청소 업체를 실제로 이용한 고객만이 평가에 참여할 수 있는 "직접 피드백 시스템"을 통해 산출되므로 개별 업체가 광고성 후기를 올리거나 자사의 평가 데이터를 조작하는 일은 불가능합니다.
                </AccordionCollapse>
            </S.CollapsedWrap>
            <S.CollapsedWrap>
                <AccordionCollapse category='공통' title='업체 검색 결과에 S 업체가 없습니다.' defaultExpand={false}>
                    고객님이 거주하시는 지역의 S 업체가 해당 날짜에 수용 가능한 일 매칭(고객으로부터 받은 방문견적 신청) 건수를 초과하여 업체검색 결과창에 노출되지 않을 가능성이 있습니다. 원하시는 등급의 업체가 조회되지 않았을 경우 이사 또는 청소 날짜를 가능하신 다른 날짜로 설정하거나 다음날 오전 시간에 다시 검색해 보시길 추천드립니다.
                </AccordionCollapse>
            </S.CollapsedWrap>
            <S.CollapsedWrap>
                <AccordionCollapse category='이사' title='마감업체는 무엇인가요?' defaultExpand={false}>
                    해당 날짜에 수용 가능한 일 매칭(고객으로부터 받은 견적 신청) 건수를 초과한 업체입니다. 이 경우, 조회결과 화면 하단에 마감업체로 표시되며 마감업체에 대한 정보는 공개되지 않습니다. <br/>
                    그러나 해당 날짜에 고객접수가 취소되거나 업체가 접수 한도를 상향조정한 경우에는 예약이 가능합니다. <br/>
                    조회된 업체가 모두 마감된 경우 다음날 오전시간에 다시 검색을 해보시면 해당 업체가 예약 가능한 경우가 있으며, <br/>
                    혹은 위매치다이사에 상담을 요청하시면 추후 가능업체 발생 시 안내받으실 수 있습니다. <br/>
                </AccordionCollapse>
            </S.CollapsedWrap>
            <S.CollapsedWrap>
                <AccordionCollapse category='공통' title='상담신청시 개인정보가 공개되나요?' defaultExpand={false}>
                    고객님에 의해 제공된 개인정보는 고객님의 동의 없이 기타목적을 위한 이용이나 제3자에게 제공할 수 없으며, 단지 고객님과 매칭된 업체 상호 간의 상담을 돕기위해 관계법이 허용하는 범위 내에서 제공되어 집니다.
                </AccordionCollapse>
            </S.CollapsedWrap>
            <S.CollapsedWrap>
                <AccordionCollapse category='공통' title='이사/청소 업체에서 현금영수증 또는 세금계산서를 발급해 주나요?' defaultExpand={false}>
                    소비자평가등급은 이사/청소 업체를 실제로 이용한 고객만이 평가에 참여할 수 있는 "직접 피드백 시스템"을 통해 산출되므로 개별 업체가 광고성 후기를 올리거나 자사의 평가 데이터를 조작하는 일은 불가능합니다.
                </AccordionCollapse>
            </S.CollapsedWrap>
            <S.CollapsedWrap>
                <AccordionCollapse category='이사' title='방문견적 부담스러운데, 꼭 받아야 하나요?' defaultExpand={false}>
                    이사 견적은 짐의 양, 투입인력 수, 특수 작업(에어컨, 피아노, 장롱조립 등) 그리고 기타 여러 가지 상황에 따라 달라집니다. <br/>
                    직접 이사업체에서 나와 방문견적을 받지 않으면 정확한 금액 산정이 불가능할 뿐만 아니라, 짐의 양이 많다거나, 인력이 더 와야 한다는 등 <br/>
                    상황에 따라 분쟁이 생길 가능성이 매우 높습니다. <br/>
                    따라서 번거롭더라도 이사업체 선정 시 방문견적은 필수이며, 방문견적 시 작성한 견적서는 계약서와 같은 효력을 지니므로 정확한 서비스 내용과 금액을 확인하신 후 견적서를 받으셔야합니다. <br/>
                    <br/>
                    이사 방문견적 시 꼭 필요한 체크리스트로 꼼꼼하게 견적을 받아보시기 바랍니다. <br/>
                    <br/>
                    <a href="https://da24.wematch.com/checklist.asp">방문견적 필수 체크리스트 >></a>
                </AccordionCollapse>
            </S.CollapsedWrap>

            <S.CollapsedWrap>
                <AccordionCollapse category='이사' title='여러 이사업체에서 비교견적 받아봐야 하나요? 몇 개나 받아야 하나요?' defaultExpand={false}>
                    이사비용은 업체마다 모두 조건이 다르기 때문에, 업계 전문가들은 세 군데 정도의 이사업체를 비교해보도록 권장하고 있습니다. <br/>
                    <br/>
                    예를들어, <br/>
                    - A 익스프레스는 이사비용은 저렴한데, 방문견적 시간도 늦고 약속을 잘 지키지 않음 <br/>
                    - B 포장이 사업체는 이사비용은 중간 정도 되는데 청소 서비스를 제공하지 않음 <br/>
                    - C 이사몰은 이사비용은 너무 비싼데, 전문적이며 친절함 <br/>
                    <br/>
                    이와같이 포장이사 비용뿐만 아니라, 서비스 품질을 제대로 비교해야 합리적인 선택이 가능합니다. <br/>
                </AccordionCollapse>
            </S.CollapsedWrap>
            <S.CollapsedWrap>
                <AccordionCollapse category='이사' title='이사견적 시 추가 옵션비용은 어떤 것들이 있나요?' defaultExpand={false}>
                    주로 에어컨 분리 및 재설치, 고가사다리 이용, 조립식가구(붙박이장), 돌침대, 그랜드피아노, 위성 안테나 등이 있습니다. <br/>
                    <br/>
                    에어컨 설치는 고객님께서 직접 해당 제품 서비스센터에 의뢰하시거나, <br/>
                    선택하신 이사업체를 통해 연계된 전문 업체를 소개받아 진행하실 수도 있습니다. <br/>
                    <br/>
                    사다리차는 5톤 물량(24평)기준 5층일 경우 기본 9만원(출/도착지 모두 이용시 2배)이며 <br/>
                    층이 높아질수록 사다리 길이에 따라 비용이 상승할 수 있습니다. <br/>
                </AccordionCollapse>
            </S.CollapsedWrap>
            <S.CollapsedWrap>
                <AccordionCollapse category='공통' title='이사/청소 업체와 계약은 어떻게 하나요?' defaultExpand={false}>
                    위매치다이사를 통해 선택하신 업체들의 무료방문견적(이사) 또는 전화견적(청소)을 받아보시고, <br/>
                    고객님이 마음에 드는 업체와 직접 계약을 진행하시면 됩니다. <br/>
                    계약 시, 서비스 내용과 협의사항 등을 견적서에 반드시 명기하도록 요청하시고 확인 후 계약을 체결하시기 바랍니다. <br/>
                    단, 이사업체의 경우 통상적으로 최종 견적금액의 10~20%를 계약금으로 먼저 지불합니다. <br/>
                </AccordionCollapse>
            </S.CollapsedWrap>
            <S.CollapsedWrap>
                <AccordionCollapse category='청소' title='여러 청소업체에서 비교견적 받아봐야 하나요?' defaultExpand={false}>
                    각 청소 업체마다 견적과 제공 서비스는 모두 다르기 때문에 합리적인 선택을 위해서는 2개 이상의 업체에 견적을 받아 비교하는 것을 추천드립니다.
                </AccordionCollapse>
            </S.CollapsedWrap>
            <S.CollapsedWrap>
                <AccordionCollapse category='청소' title='이사청소와 입주청소의 차이는 무엇인가요?' defaultExpand={false}>
                    입주청소 : 신축건물로 이사갈 때 건축물 분진가루/미세먼지/실리콘 자국 제거 및 새집증후군 제거를 위해 진행하는 청소 <br/>
                    이사청소 : 이전 거주자가 장기간 생활하며 생긴 먼지, 세균, 때 등의 제거를 위해 진행하는 소독 및 대청소 <br/>
                </AccordionCollapse>
            </S.CollapsedWrap>
            <S.CollapsedWrap>
                <AccordionCollapse category='청소' title='이사 청소는 일반적으로 언제 하나요?' defaultExpand={false}>
                    이사 청소는 일반적으로 언제하나요? <br/>
                    공실 상태에서 이사청소를 진행하는 것이 가장 이상적이므로 앞에 살던 거주자가 이사를 나간 뒤(보통 나의 이사날짜 일주일 전에서 하루 전 사이)에 이사청소를 하는 것이 일반적입니다. <br/>
                    <br/>
                    *사이청소(중간청소) : 이사 당일 오전에 앞에 살던 거주자가 이사를 나가고, 오후에 내가 들어오는 경우, 그사이에 비는 시간(최대 2~3시간)동안 빠르게 진행하는 이사청소를 말합니다. <br/>
                    보통 이사청소는 24평을 기준으로 최소 6~8시간이 소요됩니다. 작업이 급하게 이루어지는 사이청소는 청소 품질에 대한 만족도가 떨어지므로 다이사는 사이청소를 권장하지 않으며, 업체 매칭도 진행하고 있지 않습니다. <br/>
                </AccordionCollapse>
            </S.CollapsedWrap>

        </Layout>
    )

}

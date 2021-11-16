import React from 'react'
import Styled from 'styled-components'
import dayjs from 'dayjs'

import { Truck } from 'components/Icon'
import { useRouter } from 'hooks/useRouter'

import * as colors from 'styles/colors'
import * as commonTypes from 'store/common/types'
import { useDispatch, useSelector } from 'react-redux'
import * as commonSelector from 'store/common/selectors'
import * as partnerActions from 'store/partner/actions'

const S = {
  TypeSet: Styled.div`
			position: fixed;
			width: 100%;
			background:${colors.grayBg};
			border-bottom:1px solid ${colors.lineDefault};
			top: 48px;
			z-index: 100;
			
			@media screen and (min-width:768px) {
            	top: 72px;
        	}	
		`,
  BoxSet: Styled.div`
			padding:19px 24px;
			.type{
				font-size:16px;
				letter-spacing:-0.5px;
			}
			@media screen and (min-width:768px) {
				width:528px;
				margin:0 auto;
			}
			@media screen and (min-width:1200px) {
				width:992px;
				padding:21px 24px 17px;
			}
		`,
  ReSelect: Styled.a`
			display:inline-block;
			float:right;
			font-size:16px;
			text-decoration:underline;
			@media screen and (min-width:1200px) {
				float:none;
				margin-left:16px;
			}
		`,
  CompareList: Styled.span`
			display:none;
			position:relative;
			float:right;
			cursor:pointer;
			svg{
				margin-left:11px;
			}
			@media screen and (min-width:1200px) {
				display:inline-block;
			}
		`,
  Count: Styled.span`
			display:inline-block;
			position:absolute;
			top:-9px;
			right:-9px;
			width:16px;
			height:16px;
			border-radius:8px;
			font-size:11px;
			color:${colors.white};
			text-align:center;
			line-height:17px;
			background:${colors.pointBlue};
		`
}

interface Props {
  count: number
  formData: commonTypes.RequestUserInfoInsert
}

const SetType: React.FC<Props> = ({ count, formData }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const getMoveIdxData = useSelector(commonSelector.getMoveIdxData)
  const { dong, moving_type, moving_date } = formData

  if (!getMoveIdxData.idx) {
    return <></>
  }

  return (
    <S.TypeSet>
      <S.BoxSet>
        <span className="type">{moving_type}이사 / </span>
        <span className="type">{dayjs(moving_date).format('MM.DD')} / </span>
        <span className="type">{dong}</span>
        <S.ReSelect
          onClick={() => {
            dispatch(partnerActions.cartReset())
            dispatch(partnerActions.partnerListReset())
            router.history.push('/')
          }}
          id="dsl_booking_list_date">
          날짜변경
        </S.ReSelect>
        <S.CompareList onClick={() => router.push(`/partner/cart?idx=${getMoveIdxData.idx}`)}>
          선택한 업체비교함
          <Truck width={22} height={15} color={colors.black} />
          {count > 0 && <S.Count>{count}</S.Count>}
        </S.CompareList>
      </S.BoxSet>
    </S.TypeSet>
  )
}

export default SetType

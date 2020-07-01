import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'

import Loading from '../../../components/Loading';
import TopGnb from '../../../components/TopGnb'
import SetType from '../List/setType'
import UserImage from './userImage'
import PartnerInfo from './partnerInfo'
import LevelData from './levelData'
import Review from './review'

import { fetchDetail, fetchReviewList } from '../../../api/partner';
import { useParams } from 'react-router-dom'
import {DownArrow, UpArrow} from "../../../components/Icon";
import * as colors from "../../../styles/colors";


const S = {
    Container: Styled.div``,
    BottomContainer: Styled.div`
		position:relative;
		margin-top:10px;
		:before{
			content:'';
			position:absolute;
			top:-10px;
			width:100%;
			height:8px;
			margin-bottom:64px;
			background-color:${colors.lineDeco};
			border:1px solid ${colors.lineDefault};
			box-sizing:border-box;
			@media screen and (min-width:1200px) {
				width:720px;
				border:0;
			}
		}
		@media screen and (min-width:1200px) {
			width:720px;
			margin:0 auto;
			padding-bottom:80px;
			padding-left:272px;
		}
	`,
    MoreList: Styled.button`
		width:100%;
		height:52px;
		margin-bottom:64px;
		font-size:15px;
		font-weight:500;
		background-color:${colors.white};
		color:${colors.gray66};
		cursor:pointer;
		svg{
			margin-left:4px;
			vertical-align:middle;
		}
		@media screen and (min-width:1200px) {
			margin-bottom:0;
		}
	`,
    BtnSelect: Styled.button`
		position:fixed;
		z-index:5;
		left:0;
		right:0;
		bottom:0;
		width:100%;
		height:64px;
		font-size:18px;
		font-weight:700;
		background-color:${colors.pointBlue};
		color:${colors.white};
		cursor:pointer;
		@media screen and (min-width:1200px) {
			position:relative;
		}
	`,
    TopBtn: Styled.span`
		position:fixed;
		right:24px;
		bottom:88px;
		width:40px;
		height:40px;
		border:1px solid ${colors.pointBlue};
		border-radius:22px;
		background-color:${colors.white};
		box-shadow:0 4px 10px 0 rgba(0, 0, 0, 0.2);
		cursor:pointer;
		svg{
			position:absolute;
			top:50%;
			left:50%;
			margin-top:-8px;
			margin-left:-8px;
		}
		@media screen and (min-width:768px) {
			bottom:120px;
		}
		@media screen and (min-width:120px) {
			z-index:5;
			right:70px;
			bottom:80px;
		}
	`,
}

const PartnerDetail = ({}) => {
    const [detailLoading, setDetailLoading] = useState(false)
    const [partnerDetail, setPartnerDetail] = useState(undefined)
    const [reviewLoading, setReviewLoading] = useState(false)
    const [reviewList, setReviewList] = useState([])
    // const [page, setPage] = useState(1)
    const params = useParams()

    const DEFAULT_SIZE = 5
    let page = 1

    const getReviewList = useCallback(async () => {
        try {
            setDetailLoading(true)
            const response = await fetchReviewList(params.username, page, DEFAULT_SIZE)
            setReviewList(response)
        } catch (e) {
        } finally {
            setDetailLoading(false)
        }
    }, [params.username])

    const getPartnerDetail = useCallback(async () => {
        try {
            setReviewLoading(true)
            const response = await fetchDetail(params.username)
            setPartnerDetail(response)
        } catch (e) {
        } finally {
            setReviewLoading(false)
        }

    }, [params.username])

    // const getMoreReviewList = useCallback(async () => {
    //     page = page + 1
    //     setReviewLoading(true)
    //     const response = await fetchReviewList(params.username, page, DEFAULT_SIZE)
    //     setReviewList(prevState => ([...prevState, ...response]))
    //     console.log(reviewList)
    //     setReviewLoading(false)
    // }, [reviewList])
    //
    const handleSelected = () => {
        alert('선택 완료')
    }

    useEffect(() => {
        getPartnerDetail()
        getReviewList()
    }, [])

    if (detailLoading || reviewLoading) {
        return <Loading />
    }

    return (
        <S.Container>
            <TopGnb title="업체 직접 선택" count={0}/>
            <SetType />
            <UserImage />
            <PartnerInfo />
            <LevelData />
            {reviewList.map((review, index) => (
                <Review key={index} />
            ))}
            <S.BottomContainer>
                <S.MoreList>후기 더보기 <DownArrow width="16" height="16" /></S.MoreList>
                <S.BtnSelect onClick={handleSelected}>이 업체 선택하기</S.BtnSelect>
                <S.TopBtn><UpArrow color={colors.pointBlue} width="16" height="16" /></S.TopBtn>
            </S.BottomContainer>
        </S.Container>
    )
}

export default PartnerDetail
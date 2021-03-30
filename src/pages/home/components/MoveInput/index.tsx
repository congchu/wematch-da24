import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import {debounce} from 'lodash'

import Input from 'components/common/Input'
import Select from 'components/common/Select'
import CalendarModal from 'components/common/Modal/CalendarModal'
import AddressModal from 'components/common/Modal/AddressModal'
import { CalendarDate } from 'components/wematch-ui/utils/date'
import * as colors from 'styles/colors'
import * as formSelector from 'store/form/selectors'
import * as formActions from 'store/form/actions'
import { isExceedDiffDay } from 'lib/dateUtil'
import { dataLayer } from 'lib/dataLayerUtil'
import { CALENDAR_MAX_DAYS } from 'constants/values'
import useHashToggle from 'hooks/useHashToggle'

type MoveInputProps = {
    departAddress: string;
    departFloor: string;
    arriveAddress: string;
    arriveFloor: string;
    userName: string;
    phone: string;
}

interface Props extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
    type: formActions.MoveTypeProp;
    onChange?(estimate: MoveInputProps): void;
}

const S = {
    Container: styled.div<{ type: formActions.MoveTypeProp }>`
        display: ${props => props.type === 'house' || props.type === 'office' ? 'block' : 'none'}
    `,
    Title: styled.h3`
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.03em;
      color: ${colors.gray66};
      margin-bottom: 16px;
    `,
    Form: styled.form`
        display: flex;
        flex-direction: column;
    `,
    Group: styled.div`
        display: flex;
        flex-direction: row;
    `,
    TextContainer: styled.div`
        overflow: hidden;
        position: relative;
        height: 80px;
        padding: 12px 16px;
        border: 1px solid ${colors.lineDefault};
        background-color: #f8f9fb;
    `,
    Textarea: styled.textarea`
        display: block;
        width: 100%;
        border: 0 none;
        resize: none;
        outline: none;
        background-color: transparent;
        letter-spacing: -1px;
        height: 110px;
        font-size: 16px;
        line-height: 28px;
        border-radius: 4px;
    `
}

const MoveInput: React.FC<Props> = (props) => {
    const {
        type,
        onChange,
        ...restProps
    } = props

    const dispatch = useDispatch()

    const getMoveType = useSelector(formSelector.getType)
    const getMoveDate = useSelector(formSelector.getDate)
    const getMoveAddress = useSelector(formSelector.getAddress)
    const getMoveFloor = useSelector(formSelector.getFloor)
    const getName = useSelector(formSelector.getName)
    const getPhone = useSelector(formSelector.getPhone)

    const floorItems = [
        { key: '1', value: '1층' },
        { key: '2', value: '2층' },
        { key: '3', value: '3층' },
        { key: '4', value: '4층' },
        { key: '5', value: '5층' },
        { key: '6', value: '6층' },
        { key: '7', value: '7층' },
        { key: '8', value: '8층' },
        { key: '9', value: '9층' },
        { key: '10', value: '10층' },
        { key: '11', value: '11층' },
        { key: '12', value: '12층' },
        { key: '13', value: '13층' },
        { key: '14', value: '14층' },
        { key: '15', value: '15층' },
        { key: '16', value: '16층' },
        { key: '17', value: '17층' },
        { key: '18', value: '18층' },
        { key: '19', value: '19층' },
        { key: '20', value: '20층' },
        { key: '21', value: '21층' },
        { key: '22', value: '22층' },
        { key: '23', value: '23층' },
        { key: '24', value: '24층' },
        { key: '25', value: '25층 이상' },
    ]

    // const [visibleCalendarModal, setVisibleCalendarModal] = useState<boolean>(false)
    // const [visibleStartAddressModal, setVisibleStartAddressModal] = useState<boolean>(false)
    // const [visibleStartFloorModal, setVisibleStartFloorModal] = useState<boolean>(false)
    // const [visibleEndAddressModal, setVisibleEndAddressModal] = useState<boolean>(false)
    // const [visibleEndFloorModal, setVisibleEndFloorModal] = useState<boolean>(false)

    const [visibleCalendarModal, setVisibleCalendarModal] = useHashToggle('#calendar')
    const [visibleStartAddressModal, setVisibleStartAddressModal] = useHashToggle('#startAddress')
    const [visibleStartFloorModal, setVisibleStartFloorModal] = useHashToggle('#startFloor')
    const [visibleEndAddressModal, setVisibleEndAddressModal] = useHashToggle('#endAddress')
    const [visibleEndFloorModal, setVisibleEndFloorModal] = useHashToggle('#endFloor')

    const getMoveTypeText = useCallback(() => {
        if (getMoveType === 'house') {
            return '가정'
        } else if (getMoveType === 'office') {
            return '사무실'
        }
    }, [getMoveType])

    const toggleCalendarCancel = () => {
        /* dispatch(formActions.setMoveDate([])) */
        setVisibleCalendarModal(!visibleCalendarModal)
    }
    const toggleCalendarConfirm = () => {
        dataLayer({
            event: 'input_info',
            category: '다이사_메인_입력창_1',
            label: getMoveDate[0],
            action: '이사날짜',
            CD6: getMoveTypeText()
        })
        setVisibleCalendarModal(!visibleCalendarModal)
    }
    const toggleStartAddress = () => setVisibleStartAddressModal(!visibleStartAddressModal)
    const toggleStartFloor = () => setVisibleStartFloorModal(!visibleStartFloorModal)
    const toggleEndAddress = () => setVisibleEndAddressModal(!visibleEndAddressModal)
    const toggleEndFloor = () => setVisibleEndFloorModal(!visibleEndFloorModal)

    const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        const originPhoneValue = event.target.value.replace(/-/gi, '')
        dispatch(formActions.setPhone(originPhoneValue))
    }

    const onSelectDate = (date: CalendarDate) => {  
        if (isExceedDiffDay(date, CALENDAR_MAX_DAYS)) {
            alert(`이사업체조회는 내일부터 최장${CALENDAR_MAX_DAYS}일까지만 비교가 가능합니다.`);
            return;
        }
        dataLayer({
            event: 'input_info',
            category: '다이사_메인_입력창_1',
            label: getMoveDate[0],
            action: '이사날짜',
            CD6: getMoveTypeText()
        })

        dispatch(formActions.setMoveDate([date.date.format('YYYY-MM-DD')]))
        debounceSelectDate(date)
    }

    const debounceSelectDate = debounce((date: CalendarDate) => {
        setVisibleCalendarModal(false)
    }, 300)

    const onSelectStartAddress = (data: string) => {
        dispatch(formActions.setAddress({
            ...getMoveAddress,
            start: data
        }))

        dataLayer({
            event: 'input_info',
            category: '다이사_메인_입력창_1',
            label: data,
            action: '출발지',
            CD6: getMoveTypeText()
        })

        toggleStartAddress();
    }

    const onSelectStartFloorAddress = (data: string) => {
        dispatch(formActions.setFloor({
            ...getMoveFloor,
            start: data
        }))

        dataLayer({
            event: 'input_info',
            category: '다이사_메인_입력창_1',
            label: data + '층',
            action: '출발지_층수',
            CD6: getMoveTypeText()
        })
    }

    const onSelectEndAddress = (data: string) => {
        dispatch(formActions.setAddress({
            ...getMoveAddress,
            end: data
        }))

        dataLayer({
            event: 'input_info',
            category: '다이사_메인_입력창_1',
            label: data,
            action: '도착지',
            CD6: getMoveTypeText()
        })

        toggleEndAddress();
    }

    const onSelectEndFloorAddress = (data: string) => {
        dispatch(formActions.setFloor({
            ...getMoveFloor,
            end: data
        }))

        dataLayer({
            event: 'input_info',
            category: '다이사_메인_입력창_1',
            label: data + '층',
            action: '도착지_층수',
            CD6: getMoveTypeText()
        })
    }

    return (
        <S.Container id="dsl_move_input_terms_1" {...restProps} type={type}>
            <S.Form>
                <S.Title>이사정보를 입력해주세요.</S.Title>
                <Input theme="default" border readOnly placeholder="이사예정일" onClick={() => setVisibleCalendarModal(true)} value={getMoveDate} style={{ backgroundColor: "transparent" }} />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <Input theme="default" border readOnly placeholder="출발지" rootStyle={{ width: "49%", marginRight: "2%" }} onClick={toggleStartAddress} value={getMoveAddress.start} style={{ backgroundColor: "transparent" }} />
                    <Input theme="default" border readOnly icon="down" placeholder="층수" rootStyle={{ width: "49%" }} onClick={toggleStartFloor} value={getMoveFloor.start ? getMoveFloor.start + '층' : getMoveFloor.start} style={{ backgroundColor: "transparent" }} />
                </div>
                {getMoveAddress?.start && (
                    <Input theme="default" border placeholder="출발지 상세주소" value={getMoveAddress.detailStart} onChange={(e) => dispatch(formActions.setAddress({
                        ...getMoveAddress,
                        detailStart: e.target.value
                    }))} style={{ backgroundColor: "transparent" }} onBlur={(e) => {
                        if (e.target.value.length >= 2) {
                            dataLayer({
                                event: 'input_info',
                                category: '다이사_메인_입력창_1',
                                label: getMoveAddress.detailStart,
                                action: '출발지_상세주소',
                                CD6: getMoveTypeText()
                            })
                        }
                    }} />
                )}
                {getMoveAddress?.start && (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <Input theme="default" border readOnly placeholder="도착지" rootStyle={{ width: "49%", marginRight: "2%" }} onClick={toggleEndAddress} value={getMoveAddress.end} style={{ backgroundColor: "transparent" }} />
                        <Input theme="default" border readOnly icon="down" placeholder="층수" rootStyle={{ width: "49%" }} onClick={toggleEndFloor} value={getMoveFloor.end ? getMoveFloor.end + '층' : getMoveFloor.end} style={{ backgroundColor: "transparent" }} />
                    </div>
                )}
                {getMoveAddress?.end && (
                    <Input theme="default" border placeholder="도착지 상세주소" value={getMoveAddress.detailEnd} onChange={(e) => dispatch(formActions.setAddress({
                        ...getMoveAddress,
                        detailEnd: e.target.value
                    }))} style={{ backgroundColor: "transparent" }} onBlur={(e) => {
                        if (e.target.value.length >= 2) {
                            dataLayer({
                                event: 'input_info',
                                category: '다이사_메인_입력창_1',
                                label: getMoveAddress.detailEnd,
                                action: '도착지_상세주소',
                                CD6: getMoveTypeText()
                            })
                        }
                    }} />
                )}
                {getMoveAddress?.end && (
                    <S.TextContainer>
                        <S.Textarea placeholder="업체 전달할 내용(선택)" onChange={(e) => {
                            dispatch(formActions.setContents(e.target.value))
                        }} />
                    </S.TextContainer>
                )}
            </S.Form>
            <CalendarModal visible={visibleCalendarModal} title="이사 예정일이 언제세요?" onClose={toggleCalendarCancel}
                onSelect={onSelectDate} selected={getMoveDate} />
            <AddressModal visible={visibleStartAddressModal} title="출발지를 검색해주세요" onClose={toggleStartAddress}
                onConfirm={toggleStartAddress} onClick={toggleStartAddress} onSelect={onSelectStartAddress} />
            <Select visible={visibleStartFloorModal} items={floorItems} onOverlayClose={toggleStartFloor} onClose={toggleStartFloor} onSelect={onSelectStartFloorAddress} headerTitle="층수 선택" />
            <AddressModal visible={visibleEndAddressModal} title="도착지를 검색해주세요" onClose={toggleEndAddress}
                onConfirm={toggleEndAddress} onClick={toggleEndAddress} onSelect={onSelectEndAddress} />
            <Select visible={visibleEndFloorModal} items={floorItems} onOverlayClose={toggleEndFloor} onClose={toggleEndFloor} onSelect={onSelectEndFloorAddress} headerTitle="층수 선택" />
        </S.Container>
    )
}

export default MoveInput

import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'lodash'

import Input from 'components/common/Input'
import Select from 'components/common/Select'
import CalendarModal from 'components/common/Modal/CalendarModal'
import AddressModal from 'components/common/Modal/AddressModal'
import { CalendarDate } from 'components/wematch-ui/utils/date'

import useHashToggle from 'hooks/useHashToggle'

import { CALENDAR_MAX_DAYS } from 'constants/values'

import { Juso, JusoType } from 'store/common/types'
import * as commonSelector from 'store/common/selectors'
import * as commonActions from 'store/common/actions'
import * as formSelector from 'store/form/selectors'
import * as formActions from 'store/form/actions'

import { isExceedDiffDay } from 'lib/dateUtil'
import { dataLayer } from 'lib/dataLayerUtil'
import * as colors from 'styles/colors'
import { Icon } from 'components/wematch-ui'
import InputBox from 'components/InputBox'
import { EFormError } from '../MoveForm'

type MoveInputProps = {
  departAddress: string
  departFloor: string
  arriveAddress: string
  arriveFloor: string
  userName: string
  phone: string
}

interface Props extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  type: formActions.MoveTypeProp
  onChange?(estimate: MoveInputProps): void
  formValidations: EFormError[]
}

const S = {
  Container: styled.div<{ type: formActions.MoveTypeProp }>`
    display: ${(props) => (props.type === 'house' || props.type === 'office' ? 'block' : 'none')};
  `,
  Title: styled.h3`
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -1px;
    color: ${colors.gray33};
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
    border-radius: 6px;
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
    &::placeholder {
      color: ${colors.gray88};
      /* letter-spacing: -1px; */
    }
  `
}

const MoveInput: React.FC<Props> = (props) => {
  const { type, onChange, formValidations, ...restProps } = props

  const dispatch = useDispatch()

  const getMoveType = useSelector(formSelector.getType)
  const getMoveDate = useSelector(formSelector.getDate)
  const getMoveAddress = useSelector(formSelector.getAddress)
  const getMoveFloor = useSelector(formSelector.getFloor)
  const getJuso = useSelector(commonSelector.getJuso)

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
    { key: '25', value: '25층 이상' }
  ]

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
    setVisibleCalendarModal(!visibleCalendarModal)
  }

  const toggleStartAddress = () => setVisibleStartAddressModal(!visibleStartAddressModal)
  const toggleStartFloor = () => setVisibleStartFloorModal(!visibleStartFloorModal)
  const toggleEndAddress = () => setVisibleEndAddressModal(!visibleEndAddressModal)
  const toggleEndFloor = () => setVisibleEndFloorModal(!visibleEndFloorModal)

  const onSelectDate = (date: CalendarDate) => {
    if (isExceedDiffDay(date, CALENDAR_MAX_DAYS)) {
      alert(`이사업체조회는 내일부터 최장${CALENDAR_MAX_DAYS}일까지만 비교가 가능합니다.`)
      return
    }

    dataLayer({
      event: 'input_info',
      category: '다이사_메인_입력창_1',
      label: getMoveDate[0],
      action: '이사날짜',
      CD6: getMoveTypeText()
    })

    dispatch(formActions.setMoveDate([date.date.format('YYYY.MM.DD')]))
    debounceSelectDate()
  }

  const debounceSelectDate = debounce(() => {
    setVisibleCalendarModal(false)
  }, 300)

  const onSelectStartAddress = (juso: Juso, type: JusoType) => {
    dispatch(
      formActions.setAddress({
        ...getMoveAddress,
        start: juso.roadAddr
      })
    )

    dispatch(
      commonActions.setJuso({
        ...getJuso,
        start: juso,
        type: {
          ...getJuso.type,
          start: type
        }
      })
    )

    dataLayer({
      event: 'input_info',
      category: '다이사_메인_입력창_1',
      label: juso.roadAddr,
      action: '출발지',
      CD6: getMoveTypeText()
    })

    toggleStartAddress()
  }

  const onSelectStartFloorAddress = (data: string) => {
    dispatch(
      formActions.setFloor({
        ...getMoveFloor,
        start: data
      })
    )

    dataLayer({
      event: 'input_info',
      category: '다이사_메인_입력창_1',
      label: data + '층',
      action: '출발지_층수',
      CD6: getMoveTypeText()
    })
  }

  const onSelectEndAddress = (juso: Juso, type: JusoType) => {
    dispatch(
      formActions.setAddress({
        ...getMoveAddress,
        end: juso.roadAddr
      })
    )

    dispatch(
      commonActions.setJuso({
        ...getJuso,
        end: juso,
        type: {
          ...getJuso.type,
          end: type
        }
      })
    )

    dataLayer({
      event: 'input_info',
      category: '다이사_메인_입력창_1',
      label: juso.roadAddr,
      action: '도착지',
      CD6: getMoveTypeText()
    })

    toggleEndAddress()
  }

  const onSelectEndFloorAddress = (data: string) => {
    dispatch(
      formActions.setFloor({
        ...getMoveFloor,
        end: data
      })
    )

    dataLayer({
      event: 'input_info',
      category: '다이사_메인_입력창_1',
      label: data + '층',
      action: '도착지_층수',
      CD6: getMoveTypeText()
    })
  }

  const renderFloor = useCallback(
    (type: 'start' | 'end') => {
      return getMoveFloor[type] ? (getMoveFloor[type] === '25' ? `${getMoveFloor[type]}층 이상` : `${getMoveFloor[type]}층`) : getMoveFloor[type]
    },
    [getMoveFloor]
  )

  const renderAddressValue = useCallback((type: 'start' | 'end') => (getJuso.type?.[type] === 'road' ? getJuso[type]?.roadAddr : getJuso[type]?.jibunAddr), [getJuso])

  return (
    <S.Container id="dsl_move_input_terms_1" {...restProps} type={type}>
      <S.Form>
        <S.Title>이사 날짜</S.Title>
        <InputBox icon={'down'} placeHolder={'날짜 선택'} value={getMoveDate.join()} onClick={() => setVisibleCalendarModal(true)} error={formValidations.includes(EFormError.DATE)} />
        {/* <Input theme="default" border readOnly placeholder="이사예정일" onClick={() => setVisibleCalendarModal(true)} value={getMoveDate} style={{ backgroundColor: 'transparent' }} icon="down" /> */}
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '24px' }}>
          <S.Title>출발지 주소</S.Title>
          <InputBox icon={'search'} placeHolder={'주소 검색'} value={renderAddressValue('start')} onClick={toggleStartAddress} style={{ marginBottom: '8px' }} error={formValidations.includes(EFormError.START_ADDRESS)} />
          {/* <Input theme="default" border readOnly placeholder="출발지" rootStyle={{ width: '100%' }} onClick={toggleStartAddress} value={getJuso.type?.start === 'road' ? getJuso.start?.roadAddr : getJuso.start?.jibunAddr} style={{ backgroundColor: 'transparent' }} icon="search" /> */}
          <InputBox icon={'down'} placeHolder={'층수 선택'} value={renderFloor('start')} onClick={toggleStartFloor} error={formValidations.includes(EFormError.START_FLOOR)} />
          {/* <Input theme="default" border readOnly icon="down" placeholder="층수 선택" rootStyle={{ width: '100%' }} onClick={toggleStartFloor} value={renderFloor('start')} style={{ backgroundColor: 'transparent' }} /> */}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '24px' }}>
          <S.Title>도착지 주소</S.Title>
          <InputBox icon={'search'} placeHolder={'주소 검색'} value={renderAddressValue('end')} onClick={toggleEndAddress} style={{ marginBottom: '8px' }} error={formValidations.includes(EFormError.END_ADDRESS)} />
          {/* <Input theme="default" border readOnly placeholder="도착지" rootStyle={{ width: '100%' }} onClick={toggleEndAddress} value={getJuso.type?.end === 'road' ? getJuso.end?.roadAddr : getJuso.end?.jibunAddr} style={{ backgroundColor: 'transparent' }} icon="search" /> */}
          <InputBox icon={'down'} placeHolder={'층수 선택'} value={renderFloor('end')} onClick={toggleEndFloor} error={formValidations.includes(EFormError.END_FLOOR)} />
          {/* <Input theme="default" border readOnly icon="down" placeholder="층수" rootStyle={{ width: '100%' }} onClick={toggleEndFloor} value={getMoveFloor.end ? getMoveFloor.end + '층' : getMoveFloor.end} style={{ backgroundColor: 'transparent' }} /> */}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '24px' }}>
          <S.Title>업체 전달 메모(선택)</S.Title>
          <S.TextContainer>
            <S.Textarea
              placeholder="업체에게 전달할 메모가 있다면 작성해 주세요."
              onChange={(e) => {
                dispatch(formActions.setContents(e.target.value))
              }}
            />
          </S.TextContainer>
        </div>
      </S.Form>
      <CalendarModal visible={visibleCalendarModal} title="이사 예정일이 언제세요?" onClose={toggleCalendarCancel} onSelect={onSelectDate} selected={getMoveDate} />
      <AddressModal visible={visibleStartAddressModal} title="출발지를 검색해주세요" onClose={toggleStartAddress} onConfirm={toggleStartAddress} onClick={toggleStartAddress} onSelect={onSelectStartAddress} />
      <Select visible={visibleStartFloorModal} items={floorItems} onOverlayClose={toggleStartFloor} onClose={toggleStartFloor} onSelect={onSelectStartFloorAddress} headerTitle="층수 선택" />
      <AddressModal visible={visibleEndAddressModal} title="도착지를 검색해주세요" onClose={toggleEndAddress} onConfirm={toggleEndAddress} onClick={toggleEndAddress} onSelect={onSelectEndAddress} />
      <Select visible={visibleEndFloorModal} items={floorItems} onOverlayClose={toggleEndFloor} onClose={toggleEndFloor} onSelect={onSelectEndFloorAddress} headerTitle="층수 선택" />
    </S.Container>
  )
}

export default MoveInput

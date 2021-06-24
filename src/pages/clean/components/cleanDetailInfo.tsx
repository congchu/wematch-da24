import Input from 'components/common/Input'
import AddressModal from 'components/common/Modal/AddressModal'
import CalendarModal from 'components/common/Modal/CalendarModal'
import Select from 'components/common/Select'
import InputBox from 'components/InputBox'
import { Textarea } from 'components/wematch-ui'
import { CalendarDate } from 'components/wematch-ui/utils/date'
import { CALENDAR_MAX_DAYS } from 'constants/values'
import useHashToggle from 'hooks/useHashToggle'
import { isExceedDiffDay } from 'lib/dateUtil'
import { debounce } from 'lodash'
import React, { useState } from 'react'
import { Juso, JusoType } from 'store/common/types'
import styled from 'styled-components'
import * as colors from 'styles/colors'

const livingTypeItem = [
  { key: 'apartment', value: '아파트' },
  { key: 'house', value: '주택/빌라' },
  { key: 'oneroom', value: '원룸/오피스텔(9평이하)' }
]

const optionItems = ['줄눈시공', '피톤치드', '마루코팅', '식기세척기', '매트리스', '냉장고(단문)', '냉장고(양문)', '전기오븐', '김치냉장고']

const CleanDetailInfo = () => {
  const [date, setDate] = useState<string[] | undefined>(undefined)
  const [visibleCalendarModal, setVisibleCalendarModal] = useHashToggle('#calendar')
  const [visibleAddressModal, setVisibleAddressModal] = useHashToggle('#address')
  const [visibleLivingSelectorModal, setVisibleLivingSelectorModal] = useHashToggle('#living-type')
  const [address, setAddress] = useState<Juso | null>(null)
  const [addressType, setAddressType] = useState<JusoType | null>(null)
  const [livingType, setLivingType] = useState('')
  const [houseSpace, setHouseSpace] = useState('')
  const [selectOptionItem, setSelectOptionItem] = useState<string[]>([])
  const [cleanMemo, setCleanMemo] = useState('')

  const onSelectDate = (date: CalendarDate) => {
    if (isExceedDiffDay(date, CALENDAR_MAX_DAYS)) {
      alert(`이사업체조회는 내일부터 최장${CALENDAR_MAX_DAYS}일까지만 비교가 가능합니다.`)
      return
    }

    setDate([date.date.format('YYYY-MM-DD')])

    debounceSelectDate()
  }

  const handleClickOptionItem = (option: string) => {
    if (selectOptionItem.includes(option)) {
      setSelectOptionItem(selectOptionItem.filter((_option) => _option !== option))
    } else {
      setSelectOptionItem([...selectOptionItem, option])
    }
  }

  const debounceSelectDate = debounce(() => {
    setVisibleCalendarModal(false)
  }, 300)

  const handleSelectAddress = (juso: Juso, jusoType: JusoType) => {
    setAddress(juso)
    setAddressType(jusoType)
    setVisibleAddressModal(!visibleAddressModal)
  }

  const renderAddressValue = () => {
    if (addressType === null) {
      return undefined
    }
    return addressType === 'road' ? address?.roadAddr : address?.jibunAddr
  }

  return (
    <Container>
      <Section>
        <Title>청소 예정일</Title>
        <InputBox icon={'down'} placeHolder={'날짜 선택'} value={date?.[0]?.split('-')?.join('-')} onClick={() => setVisibleCalendarModal(true)} />
      </Section>
      <Section>
        <Title>청소지</Title>
        <InputBox icon={'search'} placeHolder={'주소 검색'} value={renderAddressValue()} onClick={() => setVisibleAddressModal(true)} />
        <InputBox icon={'down'} placeHolder={'거주형태 선택'} value={livingTypeItem.find((item) => item.key === livingType)?.value} onClick={() => setVisibleLivingSelectorModal(true)} />
        <Input type={'number'} theme={'default'} placeholder={'평형 입력 ex)24'} border style={{ backgroundColor: 'transparent', fontSize: 16 }} onChange={(e) => setHouseSpace(e.target.value)} value={houseSpace} />
      </Section>
      <Section>
        <Title>옵션 선택</Title>
        <OptionGroups>
          <OptionItem key={'option-not-selected'} selected={selectOptionItem.length === 0} onClick={() => setSelectOptionItem([])}>
            옵션없음
          </OptionItem>
          {optionItems.map((optionItem) => (
            <OptionItem key={optionItem} selected={selectOptionItem.includes(optionItem)} onClick={() => handleClickOptionItem(optionItem)}>
              {optionItem}
            </OptionItem>
          ))}
        </OptionGroups>
      </Section>
      <Section>
        <Title>업체 전달 메모</Title>
        <Textarea placeholder={'업체 전달 메모 작성(선택)'} onChange={(e) => setCleanMemo(e.target.value)}>
          {cleanMemo}
        </Textarea>
      </Section>
      <CalendarModal visible={visibleCalendarModal} title="청소" onClose={() => setVisibleCalendarModal(false)} onSelect={onSelectDate} selected={date} />
      <AddressModal
        visible={visibleAddressModal}
        title={'청소지를 검색해주세요'}
        onClose={() => setVisibleAddressModal(!visibleAddressModal)}
        onConfirm={() => setVisibleAddressModal(!visibleAddressModal)}
        onClick={() => setVisibleAddressModal(!visibleAddressModal)}
        onSelect={handleSelectAddress}
      />
      <Select visible={visibleLivingSelectorModal} items={livingTypeItem} onOverlayClose={() => setVisibleLivingSelectorModal(false)} onClose={() => setVisibleLivingSelectorModal(false)} onSelect={(data: string) => setLivingType(data)} headerTitle="거주형태 선택" />
    </Container>
  )
}

export default CleanDetailInfo

const Container = styled.div`
  section + section {
    margin-top: 40px;
  }
  section > div {
    margin-top: 8px;
  }
`

const Section = styled.section``

const Title = styled.h3`
  font-weight: bold;
  font-size: 20px;
  line-height: 29px;
  letter-spacing: -1px;
  color: ${colors.gray33};
`

const OptionGroups = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  column-gap: 3px;
  row-gap: 3px;
`

const OptionItem = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 46px;
  color: ${({ selected }) => (selected ? '#1672F7' : colors.gray88)};
  border: 1px solid ${({ selected }) => (selected ? '#1672F7' : colors.gray88)};
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`

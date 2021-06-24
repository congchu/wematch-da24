import React, { useRef } from 'react'
import Styled, { css } from 'styled-components'
import { Next } from 'components/wematch-ui/Icon'
import { useMedia } from 'react-use-media'

import * as colors from 'styles/colors'
import { useSelector } from 'react-redux'
import * as formSelector from 'store/form/selectors'
import { onMessageHandler } from 'lib/MessageUtil'
import styled from 'styled-components'

type StyleProps = Pick<Props, 'direction'>

interface GroupProp {
  type: 'house' | 'oneroom' | 'office' | undefined
  value: string | undefined
  subValue?: string
}

interface Props {
  /** 버튼을 보여줄 방향 */
  direction?: 'row' | 'column'
  /** 클릭 이벤트 */
  onClick?: (type: 'house' | 'oneroom' | 'office' | undefined) => void
  headerRef?: React.RefObject<HTMLDivElement>
  isFixed?: boolean
  setIsFixed?: React.Dispatch<boolean>
}

interface buttonProps {
  active: boolean
}

const S = {
  Container: Styled.div<StyleProps>`
        display: flex;
        flex-direction: row;
        background-color: white;
        height: 102px;
        ${({ direction }) =>
          direction === 'column' &&
          css`
            flex-direction: column;
          `}
    `,
  Button: Styled.button<buttonProps>`
        position: relative;
        flex: 1;
        height: 100%;
        background-color: ${(props) => (props.active ? colors.pointBlue : 'transparent')};
        user-select: none;
        padding: 1rem 0;
        cursor: pointer;
        border: 1px solid #DCDFE6;
        border-radius: 6px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.06);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 2px;
        -webkit-tap-highlight-color: transparent;
        span {
            display: block;
            font-size: 18px;
            font-weight: bold;
            color: ${(props) => (props.active ? colors.white : colors.pointBlue)};
            letter-spacing: -1.5px;

            &:last-child {
                color: ${(props) => (props.active ? colors.white : colors.gray33)};
                font-size: 14px;
                font-weight: normal;
                line-height: 21px;
                margin-top: 4px;
            }
        }
        &:last-child {
            margin-right: 0;
        }
        
    `,
  Arrow: Styled.div`
    position: absolute;
    bottom: -12px;
    width: 0;
    height: 0;
    border-top: 12px solid ${colors.pointBlue};/* 화살표 */
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
  `
}

const ButtonGroup: React.FC<Props> = (props) => {
  const { direction = 'row', headerRef, isFixed, setIsFixed, onClick, ...restProps } = props

  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const getMoveType = useSelector(formSelector.getType)

  const groups: GroupProp[] = [
    { type: 'house', value: '가정이사', subValue: '아파트 · 빌라 주택 등' },
    { type: 'oneroom', value: '원룸이사', subValue: '원룸 · 투룸 오피스텔 등' },
    { type: 'office', value: '사무실이사', subValue: '빌딩 · 공장 상가 등' }
  ]

  const isDesktop = useMedia({
    minWidth: 1200
  })

  const scrollToButton = () => {
    // 페이지 가장 Top 절대값을 구한다.
    const containerTop = window.pageYOffset + (headerRef?.current?.getBoundingClientRect().top || 0)
    // 버튼 그룹의 Top 절대값을 구한다.
    const buttonGroupTop = window.pageYOffset + (buttonRef?.current?.getBoundingClientRect().top || 0)

    // 스크롤을 아래서 위로 올릴 경우 헤더의가 Fixed 로 바뀐다 그래서 헤더의 값을 더해줘야 한다. (ref로 가져왔으면 더 좋았을듯)
    const HEADER_HEIGHT = 72
    // 간격 약간 위로
    const TOP_PADDING = 20

    let scrollPosition = containerTop + buttonGroupTop - TOP_PADDING

    if (isFixed && isDesktop) {
      scrollPosition = scrollPosition + HEADER_HEIGHT
    }

    // 헤더 무조건 접는다.
    if (setIsFixed) {
      setIsFixed(false)
    }

    if (scrollPosition !== window.pageYOffset) {
      window.scroll({
        top: scrollPosition,
        behavior: 'smooth'
      })
    }
  }

  const renderSubValue = groups?.map((group) => group.subValue)?.map((value) => value?.split(' '))

  return (
    <S.Container id="dsl_move_tab_types_1" direction={direction} {...restProps}>
      {groups.map((group: GroupProp, idx: number) => (
        <S.Button
          key={idx}
          ref={buttonRef}
          active={group.type === getMoveType}
          onClick={() => {
            if (group.type !== 'oneroom') {
              scrollToButton()
            }

            if (onClick) {
              onClick(group.type)
            }
            // 상단 status 폰트 색상을 강제로 바꾼다. (App에서 버그가 해결되면 삭제해도 된다.)
            onMessageHandler({
              action: 'setBarStyle'
            })
          }}>
          <div>
            <span>{group.value}</span>
            {group.type === 'house' && (
              <span>
                아파트 &middot; 빌라
                <br />
                주택 등
              </span>
            )}
            {group.type === 'oneroom' && (
              <span>
                원룸 &middot; 투룸
                <br />
                오피스텔 등
              </span>
            )}
            {group.type === 'office' && (
              <span>
                빌딩 &middot; 공장
                <br />
                상가 등
              </span>
            )}
          </div>
          {group.type === getMoveType && <S.Arrow />}
        </S.Button>
      ))}
    </S.Container>
  )
}

export default ButtonGroup

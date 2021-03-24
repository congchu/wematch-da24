import React from 'react'
import { TouchScrollable } from 'react-scrolllock'
import styled, { css } from 'styled-components'

import { Icon } from 'components/wematch-ui'
import * as colors from 'styles/colors'
import { checkApp, checkMobile } from 'lib/checkDevice'

interface Props extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'> {
    /* 리스트 타입 정의 */
    type: TypeProp;
    /** 리스트 방향 */
    direction?: DirectionProp;
    /** 텍스트 클릭 이벤트 */
    onClick?: () => void;
    /** 아이템 정의 */
    items: ItemsProps[];
    onSelect? (data: string): void;
}

export type ItemsProps = {
    id: number;
    label: string;
    value: string;
};

type TypeProp = 'list' | 'address';
type DirectionProp = 'row' | 'column';

const S = {
    Ul: styled.ul<{direction: DirectionProp, type: TypeProp}>`
      display: flex;
      flex-direction: ${(({ direction }) => direction === 'row' ? 'row' : 'column')};
      max-height: calc(${window.innerHeight}px - 99px - 48px);
      overflow-y: auto;
      
      @media (min-width: 768px) {
        max-height: 1200px;
        overflow-y: auto;
      }
      @media (min-width: 1200px) {
        height: 350px;
        overflow-y: auto;
      }
    `,
    Li: styled.li<{type: TypeProp, isApp: boolean}>`
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        
        ${(({ type }) => type === 'list' && css`
            border-top: 1px solid ${colors.lineDeco};
                        
            &:first-child {
                border-top: 0 none;
            }
        `)};
        
        ${(({ type }) => type === 'address' && css`
            padding-left: 8px;
            min-height: 51px;
            border-bottom: 1px solid #d8d8d8; 
        `)};
        
        &:last-child {
          border: none;
          margin-bottom: 100px;
        }
    `,
    A: styled.a<{type: TypeProp}>`
        letter-spacing: -1px;

        em {
            color: ${colors.pointBlue};
        }
        
        ${(({ type }) => type === 'list' && css`
            font-size: 16px;
            color: ${colors.gray66};
            padding: 16px 0 14px;
            line-height: 16px;
        `)};
        
        ${props => props.type === 'address' && css`
            font-size: 14px;
            color: ${colors.gray33};
        `};
    `
}

const List: React.FC<Props> = (props) => {
    const {
        type = 'list',
        direction = 'row',
        onClick,
        items,
        onSelect,
        ...restProps
    } = props

    const handleOnSelect = (data: string) => {
        if (onSelect) {
            return onSelect(data)
        }
    }

    return (
        <TouchScrollable>
            <S.Ul type={type} direction={direction} {...restProps}>
                {items.map((item) => {
                    return (
                        <S.Li type={type} onClick={() => {
                            handleOnSelect(item.value)
                        }} key={item.id} isApp={checkMobile() || checkApp()}>
                            <S.A type={type} dangerouslySetInnerHTML={{__html: item.label}} />
                            <Icon.Next size={15} color={colors.gray66} style={{marginRight:'15px'}}/>
                        </S.Li>
                    )
                })}
            </S.Ul>
        </TouchScrollable>
    )
}

export default List


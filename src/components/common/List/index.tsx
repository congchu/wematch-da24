import React, {useEffect, useRef} from 'react'
import styled, { css } from 'styled-components'

import { Icon } from 'components/wematch-ui'
import { Juso } from 'store/common/types'

import * as colors from 'styles/colors'
import { checkApp, checkMobile } from 'lib/checkDevice'

interface Props extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'> {
    /** 텍스트 클릭 이벤트 */
    onClick?: () => void;
    /** 아이템 정의 */
    addresses: Juso[] | undefined;
    onSelect? (juso: Juso): void;
    onMoreAddresses?: () => void;
}

export type ItemsProps = {
    id: number;
    label: string;
    value: string;
};

const S = {
    Ul: styled.ul`
      display: flex;
      flex-direction: column;
      // max-height: calc(${window.innerHeight}px - 99px - 48px);
      max-height: calc(${window.innerHeight}px - 200px);
      overflow-y: auto;
      
      @media (min-width: 768px) {
        //max-height: 1200px;
        height: 350px;
        //overflow-y: auto;
      }
      @media (min-width: 1200px) {
        height: 350px;
        //overflow-y: auto;
      }
    `,
    Li: styled.li<{isApp: boolean}>`
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        padding-left: 8px;
        min-height: 51px;
        border-bottom: 1px solid #d8d8d8; 

        &:last-child {
          border: none;
          //margin-bottom: 100px;
        }
    `,
    A: styled.a`
        letter-spacing: -1px;
        font-size: 14px;
        color: ${colors.gray33};
        em {
            color: ${colors.pointBlue};
        }

    `
}

const List: React.FC<Props> = (props) => {
    const {
        onClick,
        addresses,
        onSelect,
        onMoreAddresses,
        ...restProps
    } = props

    const scrollRef = useRef<HTMLUListElement>(null);

    const handleOnSelect = (juso: Juso) => {
        if (onSelect) {
            return onSelect(juso)
        }
    }

    const handleScroll = () => {
        const scrollTop = scrollRef?.current?.scrollTop || 0
        const clientHeight = scrollRef?.current?.clientHeight || 0
        const scrollHeight = scrollRef?.current?.scrollHeight || 0
        if (Math.ceil(scrollTop + clientHeight) === scrollHeight) {
            if (onMoreAddresses) {
                onMoreAddresses()
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <S.Ul ref={scrollRef} onScroll={handleScroll} {...restProps}>
            {addresses?.map((juso, index) => {
                return (
                    <S.Li key={index} isApp={checkMobile() || checkApp()} onClick={() => handleOnSelect(juso)}>
                        <S.A>{juso.roadAddr}</S.A>
                        <Icon.Next size={17} color={colors.black} style={{marginRight:'15px'}}/>
                    </S.Li>
                )
            })}
        </S.Ul>
    )
}

export default List

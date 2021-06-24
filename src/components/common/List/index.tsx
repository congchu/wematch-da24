import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { isEmpty, throttle } from 'lodash'

import { Juso, JusoType } from 'store/common/types'

import * as colors from 'styles/colors'
import { checkApp, checkMobile } from 'lib/checkDevice'

interface Props extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'> {
    /** 텍스트 클릭 이벤트 */
    onClick?: () => void;
    /** 아이템 정의 */
    addresses: Juso[] | undefined;
    onSelect? (juso: Juso, type: JusoType): void;
    loading: boolean;
    onMoreAddresses?: () => void;
}

export type ItemsProps = {
    id: number;
    label: string;
    value: string;
};

const S = {
    Ul: styled.ul<{ isEmpty: boolean }>`
      display: flex;
      flex-direction: column;
      // max-height: calc(${window.innerHeight}px - 99px - 48px);
      max-height: calc(${window.innerHeight}px - 250px);
      overflow-y: auto;
      
      @media (min-width: 768px) {
        //max-height: 1200px;
        height: ${props => props.isEmpty ? '0' : '325px'};
        //overflow-y: auto;
      }
      //@media (min-width: 1200px) {
        //overflow-y: auto;
      //}
    `,
    Li: styled.li<{isApp: boolean}>`
        font-size: 12px;
        display: inline-block;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #d8d8d8; 
        word-break: keep-all;
        
        &:first-child {
          border: none;
        }
    `,
    Content: styled.div`
      margin: 24px 3px 24px 0; 
    `,
    Line: styled.div`
      height: fit-content;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
    `,
    Tag: styled.div`
      font-size: 11px;
      width: 34px;
      height: 18px;
      line-height: 19px;
      text-align: center;
      color: ${colors.pointBlue};
      border: 1px solid ${colors.pointBlue};
      border-radius: 3px;
      margin-right: 8px;
  `,
   A: styled.a`
      width: 100%;
      letter-spacing: -1px;
      font-size: 14px;
      line-height: 1.2;
      color: ${colors.gray33};
      cursor: pointer;
      em {
        color: ${colors.pointBlue};
      }
   `,
    Spinner: styled.div`
      margin-top: 8px;
      text-align: center;
    `
}

const List: React.FC<Props> = (props) => {
    const {
        onClick,
        addresses,
        onSelect,
        loading,
        onMoreAddresses,
        ...restProps
    } = props

    const scrollRef = useRef<HTMLUListElement>(null);

    const handleOnSelect = (juso: Juso, type: JusoType) => {
        if (onSelect) {
            return onSelect(juso, type)
        }
    }

    const handleScroll = throttle(() => {
        const scrollTop = scrollRef?.current?.scrollTop || 0
        const clientHeight = scrollRef?.current?.clientHeight || 0
        const scrollHeight = scrollRef?.current?.scrollHeight || 0
        if ((scrollTop + clientHeight) >= (scrollHeight - 10) && onMoreAddresses) {
            onMoreAddresses()
        }
    }, 300)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <S.Ul ref={scrollRef} onScroll={handleScroll} {...restProps} isEmpty={isEmpty(addresses)}>
                {addresses?.map((juso, index) => {
                    return (
                        <S.Li key={index} isApp={checkMobile() || checkApp()}>
                            <S.Content>
                                <S.Line onClick={() => handleOnSelect(juso, 'road')} >
                                    <S.Tag>도로명</S.Tag><S.A>{juso.roadAddr}</S.A>
                                </S.Line>
                                <S.Line onClick={() => handleOnSelect(juso, 'jibun')}>
                                    <S.Tag>지번</S.Tag><S.A>{juso.jibunAddr}</S.A>
                                </S.Line>
                            </S.Content>
                        </S.Li>
                    )
                })}
            </S.Ul>
            {<S.Spinner>{loading && !isEmpty(addresses) && <img src={require('assets/images/wematch_spinner.svg')} alt="로딩중"/>}</S.Spinner>}
        </>
    )
}

export default List

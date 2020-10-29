import React from 'react'
import Button from 'components/common/Button'
import styled from 'styled-components/macro'

import * as colors from 'styles/colors'
import { Previous } from 'components/wematch-ui/Icon'

import { useRouter } from 'hooks/useRouter'

const S = {
    Container: styled.div``,
    Header: styled.header`
      height: 56px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .icon {
        position: absolute;
        left: 24px;
        top: 19px;  
      }
      
      h1 {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.03em;
        ${colors.gray33}
      }
    `,
    Bottom: styled.footer`
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    `
}

interface Props {
    title: string;
    onBack: () => void;
    children: React.ReactNode;
}

export default function BannerLayout({ title, onBack, children, ...restProps }: Props) {
    const router = useRouter()

    return (
        <S.Container {...restProps}>
            <S.Header>
                <div className="icon" onClick={onBack}>
                    <Previous size={16} color={colors.black} />
                </div>
                <h1>{title}</h1>
            </S.Header>
            {children}
            <S.Bottom>
                <Button theme="primary" bold onClick={() => router.history.push('/')}>위매치 이용하러 가기</Button>
            </S.Bottom>
        </S.Container>
    )
}

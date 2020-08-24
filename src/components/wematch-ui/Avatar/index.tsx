import * as React from 'react'
import styled, { css } from 'styled-components'
import { lineDefault, white } from 'styles/colors'
import ProfileIcon from '../Icon/generated/Profile'

interface Props extends React.HTMLAttributes<HTMLElement> {
  size?: 'medium' | 'large';
  button?: React.ReactNode;
  img?: string;
}

const S = {
  Container: styled.div<{size: 'medium' | 'large'}>`
  position: relative;
  background-color: ${lineDefault};
  border-radius: 50%;
  box-sizing: border-box;
  display: inline-block;
  ${({ size }) =>
    size === 'medium' && css`
      width: 56px;
      height: 56px;
      .defaultIcon {
        padding: 16px;
      }
    ` ||
    size === 'large' && css`
      width: 80px;
      height: 80px;
      .defaultIcon {
        padding: 24px;
      }
    `
}
`,
  DefaultIcon: styled.div``,
  AvatarImage: styled.div<{img: string}>`
  overflow: hidden;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid ${lineDefault};
  background-color: ${white};
  background-image: url(${({ img }) => img});
  background-size: cover;
  background-position: center center;
`,
  ButtonWrap: styled.div`
  position: absolute;
  bottom: 17.5%;
  right: -5%;
  z-index: 1;
`
}


export function Avatar(props: Props) {
  const {
    size = 'medium',
    button,
    img,
    ...restProps
  } = props

  return (
    <S.Container size={size} {...restProps}>
      { img ? (<S.AvatarImage img={img} />) :
        (<S.DefaultIcon className="defaultIcon"><ProfileIcon size={size === 'medium' ? 24 : 32} color={white} /></S.DefaultIcon>) }
      { button && (<S.ButtonWrap>{button}</S.ButtonWrap>) }
    </S.Container>
  )
}

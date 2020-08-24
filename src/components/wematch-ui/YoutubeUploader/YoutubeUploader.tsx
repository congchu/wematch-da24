import * as React from 'react'
import styled from 'styled-components'
import { lineEnd } from 'styles/colors'
import { Plus } from '../Icon'
import { resetButton } from 'styles/mixins'

interface Props extends React.HTMLAttributes<HTMLElement> {
  onClick?: () => void;
  children?: React.ReactNode;
}

const S = {
  Container: styled.div`
    margin-left: 1px;
    margin-right: -1px;
    overflow: hidden;
`,
  Wrap: styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 -3px;
    & > div {
      margin: 0 3px;
      flex-grow: 0;
      flex-shrink: 0;
      margin-bottom: 8px;
      position: relative;
      display: inline-block;
      width: 100px;
      height: 72px;
      box-sizing: border-box;
    }
`,
  Preview: styled.div<{img: string}>`
    background-image: url(${({ img }) => img});
    background-size: cover;
    background-position: center center;
    button {
      ${resetButton}
      position: absolute;
      top: 0;
      right: 0;
    }
`,
  UploadButton: styled.div`
    border: 1px dashed ${lineEnd};
    .plus {
      position: absolute;
      top: 28px;
      left: 42px;
    }
  `
}

export function YoutubeUploader(props: Props) {

  const {
    onClick,
    children,
    ...restProps
  } = props

  return (
    <S.Container {...restProps}>
      <S.Wrap>
        <S.UploadButton onClick={onClick}>
          <Plus className="plus" />
        </S.UploadButton>
        {children}
        {/* {previews.map(i => {
          return (
            <S.Preview key={i.thumbnail} img={i.thumbnail}>
              <button onClick={() => handleRemove(i.url)}><img src={require('../assets/images/16-sq-default.svg')} /></button>
            </S.Preview>
          )
        })} */}
      </S.Wrap>
    </S.Container>
  )
}
